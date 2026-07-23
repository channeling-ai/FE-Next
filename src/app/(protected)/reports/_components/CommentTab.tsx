'use client'

import { CommentSummary, ReportOverviewresponse } from '@/types/reports'
import { useState } from 'react'

type CommentType = 'positive' | 'negative' | 'neutral' | 'advice'

interface CommentTabData {
    id: CommentType
    label: string
    percentage: number
    count: number
    title: string
    description: string
    dotClassName: string
    textClassName: string
    activeClassName: string
}

interface OverviewCommentTabProps {
    comment: CommentSummary
    positiveCount: number
    positiveSummary?: string
    positivePercent: number
    negativeCount: number
    negativeSummary?: string
    negativePercent: number
    neutralCount: number
    neutralSummary?: string
    neutralPercent: number
    adviceCount: number
    adviceSummary?: string
    advicePercent: number
}

export default function CommentTab({
    comment,
    positiveCount,
    positiveSummary,
    positivePercent,
    negativeCount,
    negativeSummary,
    negativePercent,
    neutralCount,
    neutralSummary,
    neutralPercent,
    adviceCount,
    adviceSummary,
    advicePercent,
}: OverviewCommentTabProps) {
    const commentTabs: CommentTabData[] = [
        {
            id: 'positive',
            label: '긍정',
            percentage: positivePercent,
            count: positiveCount,
            title: '긍정적 댓글 분석',
            description: 'positiveSummary',
            dotClassName: 'bg-green',
            textClassName: 'text-green',
            activeClassName: 'border-green bg-green-op8',
        },
        {
            id: 'negative',
            label: '부정',
            percentage: negativePercent,
            count: negativeCount,
            title: '부정적 댓글 분석',
            description: 'negativeSummary',
            dotClassName: 'bg-red-error',
            textClassName: 'text-red-error',
            activeClassName: 'border-red-error bg-red-error-op8',
        },
        {
            id: 'neutral',
            label: '중립',
            percentage: negativePercent,
            count: neutralCount,
            title: '중립적 댓글 분석',
            description: 'neutralSummary',
            dotClassName: 'bg-gray-500',
            textClassName: 'text-gray-500',
            activeClassName: 'border-gray-500 bg-gray-500/10',
        },
        {
            id: 'advice',
            label: '조언',
            percentage: advicePercent,
            count: adviceCount,
            title: '조언 댓글 분석',
            description: 'adviceSummary',
            dotClassName: 'bg-blue-400',
            textClassName: 'text-blue-400',
            activeClassName: 'border-blue-400 bg-blue-op8',
        },
    ]
    const [activeTab, setActiveTab] = useState<CommentType>('positive')

    const selectedTab = commentTabs.find((tab) => tab.id === activeTab) ?? commentTabs[0]

    return (
        <div className="w-full flex flex-col gap-8">
            {/* 탭 버튼 */}
            <div className="flex flex-row tablet:flex-col gap-1">
                {commentTabs.map((tab) => {
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full rounded-xl border px-6 py-4 text-left transition-colors ${
                                isActive ? tab.activeClassName : 'border-transparent bg-transparent hover:bg-white/5'
                            }`}
                        >
                            <div className="flex flex-col tablet:flex-row items-center gap-2 tablet:gap-2.5">
                                <div className={`size-2 rounded-full ${tab.dotClassName}`} />
                                <div className="flex flex-col tablet:flex-row items-center gap-2">
                                    <span
                                        className={
                                            isActive
                                                ? `font-body-14m ${tab.textClassName}`
                                                : 'font-body-14m text-text-secondary'
                                        }
                                    >
                                        {tab.label}
                                    </span>

                                    <span className="font-body-14m text-text-secondary">{tab.percentage}%</span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* 선택된 탭 내용 */}
            <div className="w-full flex flex-col gap-1">
                <div className="flex items-center">
                    <p className={`font-body-14m text-text-secondary`}>{selectedTab.title}</p>

                    <p className="font-body-14r text-text-secondary">({selectedTab.count}개)</p>
                </div>

                <p className="font-body-14r text-text-primary">{selectedTab.description}</p>
            </div>
        </div>
    )
}
