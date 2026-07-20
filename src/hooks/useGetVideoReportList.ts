'use client'

import { useEffect, useState } from 'react'

import { VideoReportListRequest, VideoReportListResponse } from '@/types/videos'

import { getVideoReportList } from '@/api/video'

export function useGetVideoReportList({ videoId, page, size }: VideoReportListRequest) {
    const [data, setData] = useState<VideoReportListResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        async function fetchVideos() {
            try {
                setIsLoading(true)
                setError(null)

                const result = await getVideoReportList({ videoId, page, size })

                setData(result)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        void fetchVideos()
    }, [videoId, page, size])

    return {
        data,
        isLoading,
        error,
    }
}
