import api from '@/lib/axios'
import { ApiResponse } from '@/types'
import { VideoInfoResponse } from '@/types/videos'

export async function getVideoInfo(videoId: number): Promise<VideoInfoResponse> {
    const { data } = await api.get<ApiResponse<VideoInfoResponse>>(`/videos/${videoId}`)
    return data.result
}
