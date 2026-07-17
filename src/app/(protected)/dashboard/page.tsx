'use client'

import { useQuery } from '@tanstack/react-query'
import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import StatusBadge from '@/components/StatusBadge'
import {
    getDashboardMetadata,
    getDashboardSuggestions,
    type DashboardScoreType,
    type DashboardSuggestionType,
} from '@/api/dashboard'
import DashboardHeader from './_components/DashboardHeader'
import InsightCard from './_components/InsightCard'
import MetricCardSmall from './_components/MetricCardSmall'
import MetricCardWithImage from './_components/MetricCardwithImage'
import UploadCycleChart from './_components/UploadCycleChart'
import { dashboardInsights } from './_data/insights'
import { Footer } from '@/components/Footer'

type MetricStatus = Parameters<typeof StatusBadge>[0]['status']

const metrics = [
    { label: '채널 성장', score: 99, status: '최상' as const },
    { label: '알고리즘', score: 99, status: '위험' as const },
    { label: '시청 몰입', score: 85, status: '우수' as const },
    { label: '반응 밀도', score: 99, status: '보통' as const },
    { label: '유입 활력', score: 85, status: '주의' as const },
    { label: '업로드 주기', score: 85, status: '최상' as const },
]

const scoreTypeDetails: Record<DashboardScoreType, { label: string; fallbackStatus: MetricStatus }> = {
    CHANNEL_GROWTH: { label: '채널 성장', fallbackStatus: '최상' },
    ALGORITHM: { label: '알고리즘', fallbackStatus: '위험' },
    VIEW_ENGAGEMENT: { label: '시청 몰입', fallbackStatus: '우수' },
    REACTION_DENSITY: { label: '반응 밀도', fallbackStatus: '보통' },
    INFLOW_ACTIVITY: { label: '유입 활력', fallbackStatus: '주의' },
    UPLOAD_CYCLE: { label: '업로드 주기', fallbackStatus: '최상' },
}

const scoreTypeOrder = Object.keys(scoreTypeDetails) as DashboardScoreType[]

const suggestionDetails: Record<DashboardSuggestionType, { insightId: string; tags: string[] }> = {
    VIDEO_REUSE: {
        insightId: 'revival-video',
        tags: dashboardInsights[0].tags,
    },
    TREND_KEYWORD: {
        insightId: 'trend-keyword',
        tags: dashboardInsights[1].tags,
    },
    COMMENT_ANALYSIS: {
        insightId: 'comment-sentiment',
        tags: dashboardInsights[2].tags,
    },
}

const metricStatuses = new Set<MetricStatus>([
    '최상',
    '조언',
    '우수',
    '긍정',
    '최적화 원활',
    '보통',
    '중립',
    '양호',
    '주의',
    '개선 필요',
    '최적화 필요',
    '위험',
    '부정',
])

function isMetricStatus(status: string): status is MetricStatus {
    return metricStatuses.has(status as MetricStatus)
}

function formatBaseDate(baseDate?: string) {
    if (!baseDate) return '26년 2월 19일 (05:15) 기준'

    const parts = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(new Date(baseDate))
    const getPart = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value

    return `${getPart('year')}년 ${getPart('month')}월 ${getPart('day')}일 (${getPart('hour')}:${getPart('minute')}) 기준`
}

function formatSubscribers(subscriberCount?: number) {
    if (subscriberCount === undefined) return '8.5M'

    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(subscriberCount)
}

export default function DashboardPage() {
    const { data: metadata } = useQuery({
        queryKey: ['dashboard', 'metadata'],
        queryFn: getDashboardMetadata,
    })
    const { data: suggestions } = useQuery({
        queryKey: ['dashboard', 'suggestions'],
        queryFn: getDashboardSuggestions,
    })

    const renderedMetrics = metadata
        ? scoreTypeOrder.map((scoreType) => {
            const score = metadata.channelScoreList.find((item) => item.scoreType === scoreType)
            const detail = scoreTypeDetails[scoreType]
            const fallback = metrics.find((metric) => metric.label === detail.label) ?? metrics[0]

            return {
                label: detail.label,
                score: score?.score ?? fallback.score,
                status: score && isMetricStatus(score.grade) ? score.grade : detail.fallbackStatus,
                delta: score?.scoreChange ?? 42,
            }
        })
        : metrics.map((metric) => ({ ...metric, delta: 42 }))

    const renderedInsights = suggestions?.suggestionList.length
        ? suggestions.suggestionList.map((suggestion) => ({
            ...suggestion,
            ...suggestionDetails[suggestion.suggestionType],
        }))
        : undefined

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <DashboardHeader />

            <Scroll as="main" className="flex-1">
                <PageContent className="mx-auto flex flex-col gap-8 pb-8 pt-4 desktop:pb-16 desktop:pt-8">
                    <section className="flex w-full flex-col gap-2">
                        <p className="font-body-14r text-text-tertiary">
                            {formatBaseDate(metadata?.baseDate)}
                        </p>

                        <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-[274px_minmax(0,1fr)] desktop:grid-cols-[298px_minmax(0,1fr)]">
                            <MetricCardWithImage
                                channelName={metadata?.channelInfo.channelName ?? 'LeoJ Makeup'}
                                subscribers={formatSubscribers(metadata?.channelInfo.subscriberCount)}
                                delta={metadata?.channelInfo.subscriberChange ?? 42}
                                imageUrl={metadata?.channelInfo.profileImageUrl || '/images/dashboard/subscriber-card.png'}
                            />
                            <div className="grid min-w-0 grid-cols-2 gap-2 tablet:grid-cols-3">
                                {renderedMetrics.map((metric) => (
                                    <MetricCardSmall key={metric.label} {...metric} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <UploadCycleChart />

                    <section className="flex w-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-title-18sb text-text-primary">채널링의 제안</h2>
                            <p className="font-body-14r text-text-secondary">
                                {suggestions?.summaryMessage ?? '최근 24시간 내 특정 영상 조회수가 평소 대비 280% 급증하며 추천 피드 유입이 80%를 점유했고, 노출 가속도가 평소 대비 3.5배 상승한 폭발적 성장 단계입니다.'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {(renderedInsights ?? dashboardInsights).map((insight) => (
                                <InsightCard
                                    key={'suggestionId' in insight ? insight.suggestionId : insight.id}
                                    title={insight.title}
                                    description={insight.description}
                                    tags={insight.tags}
                                    href={`/dashboard/insights/${'insightId' in insight ? insight.insightId : insight.id}`}
                                />
                            ))}
                        </div>
                    </section>

                </PageContent>
                <Footer />
            </Scroll>
        </div>
    )
}
