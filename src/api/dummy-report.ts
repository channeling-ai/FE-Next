import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type DummyReportSection = 'VIDEO' | 'OVERVIEW' | 'ANALYSIS' | 'COMMENTS'
export type DummyReportCommentType = 'NEUTRAL' | 'POSITIVE' | 'NEGATIVE' | 'ADVICE_OPINION'

interface GenerateDummyReportParams {
    section: DummyReportSection
    url: string
    commentType?: DummyReportCommentType
}

export async function generateDummyReport<T = unknown>({
    section,
    url,
    commentType,
}: GenerateDummyReportParams): Promise<T> {
    const { data } = await api.post<ApiResponse<T>>(
        `/dummy-reports/${section}`,
        { url },
        {
            params: commentType ? { type: commentType } : undefined,
        }
    )

    if (!data.isSuccess) {
        throw new Error(data.message || '체험 리포트를 생성하지 못했습니다.')
    }

    return data.result
}
