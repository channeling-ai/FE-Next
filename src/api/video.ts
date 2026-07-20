import api from '@/lib/axios'
import { ApiResponse } from '@/types'
import { VideoInfoResponse, VideoReportListRequest, VideoReportListResponse } from '@/types/videos'

export async function getVideoInfo(videoId: number): Promise<VideoInfoResponse> {
    const { data } = await api.get<ApiResponse<VideoInfoResponse>>(`/videos/${videoId}`)
    return data.result
}

export async function getVideoReportList({
    videoId,
    page,
    size,
}: VideoReportListRequest): Promise<VideoReportListResponse> {
    const { data } = await api.get<ApiResponse<VideoReportListResponse>>(`videos/${videoId}/reports`)
    return data.result
}
