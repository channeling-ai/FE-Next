import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type SubscriptionPlan = 'FREE' | 'BASIC' | 'ENTERPRISE'
export type SubscriptionStatus = 'ACTIVE' | 'CANCEL_SCHEDULED' | 'PAST_DUE' | 'NONE'
export type SubscriptionBillingCycle = 'MONTHLY' | 'YEARLY'

export interface SubscriptionUsage {
    reportUsed: number
    reportLimit: number
    ideaUsed: number
    ideaLimit: number
}

export interface BillingHistoryItem {
    date: string
    amount: number
    receiptUrl: string | null
}

export interface SubscriptionPageData {
    plan: SubscriptionPlan
    status: SubscriptionStatus
    billingCycle: SubscriptionBillingCycle | null
    nextBillingDate: string | null
    canCancel: boolean
    usage: SubscriptionUsage
    billingHistory: BillingHistoryItem[]
}

export interface CancelSubscriptionResult {
    accessUntil: string
}

export async function getSubscriptionPage(): Promise<SubscriptionPageData> {
    const { data } = await api.get<ApiResponse<SubscriptionPageData>>('/subscriptions/me')
    return {
        ...data.result,
        usage: data.result.usage ?? {
            reportUsed: 0,
            reportLimit: 0,
            ideaUsed: 0,
            ideaLimit: 0,
        },
        billingHistory: data.result.billingHistory ?? [],
    }
}

export async function cancelSubscription(): Promise<CancelSubscriptionResult> {
    const { data } = await api.delete<ApiResponse<CancelSubscriptionResult>>('/subscriptions')
    return data.result
}
