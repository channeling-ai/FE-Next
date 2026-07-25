'use client'

import { getReportStatus, type ReportGenerationStatus } from '@/api/report'
import { authStorage } from '@/lib/auth-storage'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

const REPORT_STATUS_POLL_INTERVAL = 3_000
const REPORT_STATUS_ERROR_RETRY_INTERVAL = 10_000

function isReportCompleted(status?: ReportGenerationStatus) {
    if (!status) return false

    return (
        status.overviewStatus === 'COMPLETED' &&
        status.analysisStatus === 'COMPLETED' &&
        (status.ideaStatus === undefined || status.ideaStatus === 'COMPLETED')
    )
}

function isReportFailed(status?: ReportGenerationStatus) {
    if (!status) return false

    return [status.overviewStatus, status.analysisStatus, status.ideaStatus].some((step) => step === 'FAILED')
}

function getCurrentStep(status?: ReportGenerationStatus) {
    if (!status) return 1
    if (isReportCompleted(status)) return 4
    if (status.overviewStatus === 'COMPLETED' || status.analysisStatus === 'COMPLETED') return 3
    return 2
}

export function useReportProgress(reportId: number) {
    const queryClient = useQueryClient()
    const isValidReportId = Number.isInteger(reportId) && reportId > 0
    const statusQuery = useQuery({
        queryKey: ['reports', reportId, 'status'],
        queryFn: () => getReportStatus(reportId),
        enabled: isValidReportId,
        staleTime: 0,
        retry: false,
        refetchInterval: (query) => {
            if (query.state.status === 'error') return REPORT_STATUS_ERROR_RETRY_INTERVAL

            const status = query.state.data
            return isReportCompleted(status) || isReportFailed(status) ? false : REPORT_STATUS_POLL_INTERVAL
        },
        refetchIntervalInBackground: true,
    })

    const isCompleted = isReportCompleted(statusQuery.data)
    const hasGenerationFailed = isReportFailed(statusQuery.data)
    const isStatusError = statusQuery.isError
    const isGenerationFailed = !isValidReportId || hasGenerationFailed
    const isFailed = isStatusError || isGenerationFailed
    const isProcessing = isValidReportId && !isFailed && !isCompleted
    const currentStep = useMemo(() => getCurrentStep(statusQuery.data), [statusQuery.data])

    useEffect(() => {
        if (!isProcessing) return

        const accessToken = authStorage.getAccessToken()
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '')
        if (!accessToken || !apiBaseUrl) return

        const controller = new AbortController()

        void fetchEventSource(`${apiBaseUrl}/sse/connect`, {
            method: 'GET',
            headers: {
                Accept: 'text/event-stream',
                Authorization: `Bearer ${accessToken}`,
            },
            openWhenHidden: true,
            signal: controller.signal,
            onmessage: () => {
                void queryClient.invalidateQueries({ queryKey: ['reports', reportId, 'status'] })
            },
            onerror: (error) => {
                controller.abort()
                throw error
            },
        }).catch(() => {
            // SSE 연결이 끊겨도 상태 폴링이 진행률 동기화를 계속 담당합니다.
        })

        return () => controller.abort()
    }, [isProcessing, queryClient, reportId])

    return {
        currentStep,
        isCompleted,
        isFailed,
        isGenerationFailed,
        isProcessing,
        isStatusError,
        refetch: statusQuery.refetch,
    }
}
