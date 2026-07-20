'use client'

import { deleteReport } from '@/api/video'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteReport(videoId: number | null) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (reportId: number) => deleteReport(reportId),

        onSuccess: () => {
            if (videoId == null) return

            queryClient.invalidateQueries({
                queryKey: ['video-report-list', videoId],
            })
        },
    })
}
