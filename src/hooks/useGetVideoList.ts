'use client'

import { useCallback, useEffect, useState } from 'react'
import { getChannelVideoList } from '@/api/channels'
import { VideoListRequest, VideoListResponse } from '@/types/channels'

export function useChannelVideoList({ channelId, type, page = 1, size = 8 }: VideoListRequest) {
    const [data, setData] = useState<VideoListResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    const fetchVideoList = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const result = await getChannelVideoList({
                channelId,
                type,
                page,
                size,
            })

            setData(result)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [channelId, type, page, size])

    useEffect(() => {
        fetchVideoList()
    }, [fetchVideoList])

    return {
        data,
        isLoading,
        error,
        refetch: fetchVideoList,
    }
}
