import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

interface UpdateChannelTargetResult {
    channelId: number
    updatedTarget: string
}

interface UpdateChannelConceptResult {
    channelId: number
    updatedConcept: string
}

export async function updateChannelTarget(
    channelId: number,
    target: string
): Promise<string> {
    const { data } = await api.patch<ApiResponse<UpdateChannelTargetResult>>(
        `/channels/${channelId}/targets`,
        { target }
    )
    return data.result.updatedTarget
}

export async function updateChannelConcept(
    channelId: number,
    concept: string
): Promise<string> {
    const { data } = await api.patch<ApiResponse<UpdateChannelConceptResult>>(
        `/channels/${channelId}/concepts`,
        { concept }
    )
    return data.result.updatedConcept
}
