import api from '@/lib/axios'
import { ApiResponse } from '@/types'
import { VideoListRequest, VideoListResponse } from '@/types/channels'

export async function getChannelVideoList({
    channelId,
    type,
    page = 1,
    size = 8,
}: VideoListRequest): Promise<VideoListResponse> {
    const { data } = await api.get<ApiResponse<VideoListResponse>>(`/channels/${channelId}/videos`, {
        params: { type, page, size },
    })
    return { ...data.result, channelId }
}
