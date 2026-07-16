export type VideoListRequest = {
    channelId: number
    type: 'LONG' | 'SHORT'
    page: number
    size: number
}

export type VideoListResponse = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    videoList: Video[]
}

type Video = {
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: 'LONG' | 'SHORT'
    viewCount: number
    uploadDate: Date
}
