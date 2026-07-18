import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export interface CreateFeedbackParams {
    content: string
    contactInfo?: string
    images: File[]
}

export interface CreateFeedbackResult {
    feedbackId: number
}

export async function createFeedback({
    content,
    contactInfo,
    images,
}: CreateFeedbackParams): Promise<CreateFeedbackResult> {
    const formData = new FormData()
    formData.append('content', content)

    if (contactInfo) {
        formData.append('contactInfo', contactInfo)
    }

    images.forEach((image) => {
        formData.append('images', image)
    })

    const { data } = await api.post<ApiResponse<CreateFeedbackResult>>(
        '/feedbacks',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    )

    return data.result
}
