import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type IdeaSort = 'latest' | 'oldest'
export type IdeaVideoType = 'ALL' | 'LONG' | 'SHORTS'
export type TrendKeywordType = 'REAL_TIME' | 'CHANNEL'
export type TrendScoreStatus = 'UP' | 'DOWN' | 'SAME' | 'NONE'

export interface IdeaListItem {
    ideaId: number
    title: string
    contentPreview: string
    tags: string[]
    isBookmarked: boolean
    createdAt: string
}

export interface IdeaList {
    total: number
    page: number
    size: number
    hasNextPage: boolean
    ideas: IdeaListItem[]
}

export interface IdeaListParams {
    page?: number
    size?: number
    sort?: IdeaSort
    keyword?: string
}

export interface IdeaDetail {
    ideaId: number
    title: string
    content: string
    tags: string[]
    isBookmarked: boolean
    createdAt: string
}

export interface IdeaBookmarkResult {
    ideaId: number
    isBookmarked: boolean
}

export interface CreateIdeaRequest {
    keyword: string
    videoType: IdeaVideoType
    detail: string
}

export interface CreatedIdea {
    id: number
    title: string
    content: string
    channel_id: number
    hash_tag: string
    is_book_marked: string
    created_at: string
    updated_at: string
}

export interface TrendKeyword {
    trendKeywordId: number
    keywordType: TrendKeywordType
    keyword: string
    score: number
    startedAt: string | null
    createdAt: string
    scoreStatus: TrendScoreStatus
}

export interface TrendKeywordList {
    realTimeTrendKeywordList: TrendKeyword[]
    channelTrendKeywordInfoList: TrendKeyword[]
}

export async function getIdeas({
    page = 1,
    size = 10,
    sort = 'latest',
    keyword,
}: IdeaListParams = {}): Promise<IdeaList> {
    const { data } = await api.get<ApiResponse<IdeaList>>('/ideas', {
        params: {
            page,
            size,
            sort,
            keyword: keyword || undefined,
        },
    })
    return data.result
}

export async function getIdeaDetail(ideaId: number): Promise<IdeaDetail> {
    const { data } = await api.get<ApiResponse<IdeaDetail>>(`/ideas/${ideaId}`)
    return data.result
}

export async function changeIdeaBookmark(ideaId: number): Promise<IdeaBookmarkResult> {
    const { data } = await api.patch<ApiResponse<IdeaBookmarkResult>>(`/ideas/${ideaId}/bookmarks`)
    return data.result
}

export async function createIdeas(request: CreateIdeaRequest): Promise<CreatedIdea[]> {
    const { data } = await api.post<ApiResponse<CreatedIdea[]>>('/ideas', request)
    return data.result
}

export async function getTrendKeywords(): Promise<TrendKeywordList> {
    const { data } = await api.get<ApiResponse<TrendKeywordList>>('/trendKeywords/channel')
    return data.result
}
