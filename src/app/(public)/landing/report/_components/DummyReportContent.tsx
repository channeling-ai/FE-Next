'use client'

import type { DummyReportData } from '@/api/dummy-report'
import PageContent from '@/components/layout/PageContent'
import ProfileImage from '@/components/ProfileImage'
import AnalysisTab from '@/app/(protected)/reports/_components/AnalysisTab'
import CommentDonutChart from '@/app/(protected)/reports/_components/CommentDoughnutChart'
import EvaluationCard from '@/app/(protected)/reports/_components/EvaluationCard'
import ReportTabBar, { type ReportTabType } from '@/app/(protected)/reports/_components/ReportTabBar'
import SummaryCard from '@/app/(protected)/reports/_components/SummaryCard'
import SummaryComment from '@/app/(protected)/reports/_components/SummaryComment'
import ReportDetailHeader from '@/app/(protected)/reports/[id]/_components/ReportDetailHeader'
import { formatKoreanDate, formatKoreanNumber, formatRelativeTime } from '@/utils/format'
import { useState, type ReactNode } from 'react'

const VIDEO_TYPE_LABEL: Record<DummyReportData['video']['videoType'], string> = {
    ALL: 'All',
    LONG: 'Long-Form',
    SHORTS: 'Short-Form',
}

interface VideoSummaryItem {
    timestamp: string
    title: string
    description: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function parseJson(value: string): unknown {
    try {
        return JSON.parse(value)
    } catch {
        return null
    }
}

function getText(record: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
        if (typeof record[key] === 'string' && record[key].trim()) {
            return record[key].trim()
        }
    }
    return ''
}

function parseVideoSummary(value: string): VideoSummaryItem[] {
    const parsed = parseJson(value)
    const items = Array.isArray(parsed)
        ? parsed
        : isRecord(parsed) && Array.isArray(parsed.summary)
          ? parsed.summary
          : []

    return items
        .filter(isRecord)
        .map((item) => ({
            timestamp: getText(item, ['timestamp', 'time', 'startTime']) || '00:00',
            title: getText(item, ['title', 'subtitle', 'heading']),
            description: getText(item, ['description', 'detail', 'content', 'summary']),
        }))
        .filter((item) => item.title || item.description)
        .slice(0, 3)
}

function toPercent(value: number) {
    const percent = Math.abs(value) <= 1 ? value * 100 : value
    return Math.min(100, Math.max(0, Math.round(percent)))
}

function LockedContent({ children, message }: { children: ReactNode; message: string }) {
    return (
        <div className="relative overflow-hidden rounded-[20px]">
            {children}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/1 p-4 text-center backdrop-blur-[10px]">
                <p className="font-body-16m text-text-primary">{message}</p>
            </div>
        </div>
    )
}

function DummyVideoInfo({ data }: { data: DummyReportData }) {
    const { video } = data

    return (
        <section className="flex flex-col gap-4 tablet:flex-row" aria-labelledby="dummy-report-video-title">
            <div
                role="img"
                aria-label={`${video.videoTitle} 썸네일`}
                className="aspect-[328/184] w-full rounded-[20px] bg-bg-3 bg-cover bg-center tablet:aspect-auto tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79"
                style={{ backgroundImage: `url(${video.videoThumbnailUrl})` }}
            />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                <span className="rounded-[20px] bg-bg-2 px-2 py-1 font-caption-12m text-text-primary desktop:font-caption-14m">
                    {VIDEO_TYPE_LABEL[video.videoType]}
                </span>
                <h1 id="dummy-report-video-title" className="line-clamp-2 font-title-18sb text-text-primary">
                    {video.videoTitle}
                </h1>
                <p className="font-body-14r text-text-secondary desktop:font-body-16r">
                    업데이트: {formatKoreanDate(video.lastUpdatedDate)}
                </p>
                <p className="flex min-w-0 gap-1 font-body-14r text-text-secondary desktop:font-body-16r">
                    <span className="truncate">{video.ChannelName}</span>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{formatRelativeTime(video.videoCreatedDate)}</span>
                </p>
            </div>
        </section>
    )
}

function DummyOverview({ data }: { data: DummyReportData }) {
    const { overview } = data
    const positivePercent = toPercent(overview.positiveCommentPercent)
    const summaryItems = parseVideoSummary(overview.summary)
    const commentData = [
        { name: '긍정', value: toPercent(overview.positiveCommentPercent), color: '#4ADE80' },
        { name: '부정', value: toPercent(overview.negativeCommentPercent), color: '#F50019' },
        { name: '중립', value: toPercent(overview.neutralCommentPercent), color: '#37363A' },
        { name: '조언', value: toPercent(overview.adviceCommentPercent), color: '#60A5FA' },
    ]

    return (
        <div className="flex flex-col gap-8 pt-4">
            <section className="flex flex-col gap-2">
                <h2 className="font-body-16sb text-text-primary">리포트 요약</h2>
                <SummaryCard
                    status="긍정"
                    summaryTitle="시청자의 긍정적인 반응"
                    details={`전체 댓글 중 긍정 반응이 ${positivePercent}%로 분석됐어요.`}
                />
                <LockedContent message="로그인 시, 본인 영상의 분석에서 확인할 수 있어요">
                    <SummaryCard
                        status="양호"
                        summaryTitle="시청자 이탈 구간 분석"
                        details="시청 흐름이 감소하는 구간과 개선 방법을 확인해보세요."
                    />
                </LockedContent>
                <SummaryCard
                    status={overview.seo >= 70 ? '최적화 원활' : '최적화 필요'}
                    summaryTitle={`SEO 구성 ${overview.seo}점`}
                    details="제목과 설명, 해시태그 구성을 분석한 결과예요."
                />
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="font-body-16sb text-text-primary">영상 평가</h2>
                <div className="grid grid-cols-2 gap-2 tablet:grid-cols-3">
                    <EvaluationCard type="view" score={overview.view} average={overview.viewChannelAvg} />
                    <EvaluationCard type="likes" score={overview.likeCount} average={overview.likeChannelAvg} />
                    <EvaluationCard type="comments" score={overview.comment} average={overview.commentChannelAvg} />
                    <EvaluationCard type="concept-consistency" score={overview.concept} average={0} />
                    <EvaluationCard type="SEO" score={overview.seo} average={0} />
                    <LockedContent message="로그인 후 확인할 수 있어요">
                        <EvaluationCard type="revisit-rate" score={overview.revisit} average={0} />
                    </LockedContent>
                </div>
            </section>

            {summaryItems.length > 0 && (
                <section className="flex flex-col gap-2">
                    <h2 className="font-body-16sb text-text-primary">영상 요약</h2>
                    <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5">
                        {summaryItems.map((item, index) => (
                            <SummaryComment
                                key={`${item.timestamp}-${index}`}
                                timestamp={item.timestamp}
                                comment={item.title}
                                detail={item.description}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section className="flex flex-col gap-2">
                <h2 className="font-body-16sb text-text-primary">댓글 반응</h2>
                <div className="flex flex-col gap-8 rounded-[20px] bg-bg-1 p-5">
                    <CommentDonutChart totalComment={formatKoreanNumber(overview.totalCommentCount)} data={commentData} />
                    {overview.comments.length > 0 && (
                        <div className="flex flex-col">
                            <p className="font-body-14m text-text-secondary">주요 댓글</p>
                            {overview.comments.slice(0, 3).map((comment, index) => (
                                <article
                                    key={`${comment.content}-${index}`}
                                    className="flex flex-col gap-3 border-b border-border-default py-4 last:border-b-0"
                                >
                                    <p className="font-body-14r text-text-primary">{comment.content}</p>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-1">
                                            <ProfileImage src={comment.authorProfileImageUrl} size={24} />
                                            <span className="truncate font-caption-12r text-text-secondary">
                                                {comment.author}
                                            </span>
                                            <span className="shrink-0 font-caption-12r text-text-secondary">
                                                {formatRelativeTime(comment.publishedAt)}
                                            </span>
                                        </div>
                                        <span className="shrink-0 font-caption-12r text-text-primary">
                                            좋아요 {comment.likeCount}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default function DummyReportContent({ data }: { data: DummyReportData }) {
    const [activeTab, setActiveTab] = useState<ReportTabType>('overview')

    return (
        <div className="flex min-h-screen w-full flex-col bg-bg-0 desktop:pt-3">
            <ReportDetailHeader />
            <PageContent as="main" className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 pb-16 pt-4">
                <DummyVideoInfo data={data} />
                <div className="flex flex-col gap-4">
                    <ReportTabBar activeTab={activeTab} onChange={setActiveTab} />
                    {activeTab === 'overview' ? (
                        <DummyOverview data={data} />
                    ) : (
                        <AnalysisTab
                            analysis={data.analysis}
                            isPending={false}
                            isError={false}
                            lockViewerRetentionDetails
                        />
                    )}
                </div>
            </PageContent>
        </div>
    )
}
