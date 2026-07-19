export type ReportsListRequest = {
    channelId: number
    type: 'ALL' | 'LONG' | 'SHORTS'
    page: number
    size: number
}

export type ReportListResponse = {
    channelId: number
    page: number
    size: number
    hasNextPage: boolean
    totalElements: number
    totalPages: number
    reportList: Report[]
}

type Report = {
    reportId: number
    channelName: string
    videoId: number
    videoTitle: string
    videoThumbnailUrl: string
    videoCategory: string
    viewCount: number
    uploadDate: string
    updatedAt: string
}
