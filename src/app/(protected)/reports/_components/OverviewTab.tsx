'use client'

import type { ReportOverview } from '@/api/report'
import { formatKoreanNumber, formatRelativeTime } from '@/utils/format'
import { useState, type ReactNode } from 'react'
import CommentDonutChart from './CommentDoughnutChart'
import CommentTab, { type CommentTabValue, type CommentType } from './CommentTab'
import EvaluationCard from './EvaluationCard'
import SummaryComment from './SummaryComment'
import SummaryCard, { type SummaryStatus } from './SummaryCard'
import Comment from './comment'

interface OverviewTabProps {
    data?: ReportOverview
    lockRestrictedSections?: boolean
}

interface VideoSummaryItem {
    timestamp: string
    title: string
    description: string
}

interface ReportSummaryItem {
    status: SummaryStatus
    title: string
    details: string
}

const SUMMARY_STATUSES = new Set<SummaryStatus>([
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

const FALLBACK_VIDEO_SUMMARY: VideoSummaryItem[] = [
    {
        timestamp: '00:00',
        title: '소제목소제목소제목소제목소제목소제목소제목소제목소제목소제목',
        description: '캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.',
    },
    { timestamp: '00:00', title: '소제목', description: '캡션입니다' },
    { timestamp: '00:00', title: '소제목', description: '캡션입니다' },
]

const FALLBACK_COMMENTS = [
    {
        content:
            '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
        authorProfileImageUrl: null,
        author: '닉네임',
        publishedAt: 'n',
        likeCount: 999,
    },
    {
        content:
            '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
        authorProfileImageUrl: null,
        author: '닉네임',
        publishedAt: 'n',
        likeCount: 11,
    },
    {
        content:
            '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
        authorProfileImageUrl: null,
        author: '닉네임',
        publishedAt: 'n',
        likeCount: 297,
    },
]

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function parseJson(value: unknown): unknown {
    if (typeof value !== 'string') return value

    let candidate: unknown = value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')

    for (let index = 0; index < 3 && typeof candidate === 'string'; index += 1) {
        const text = candidate.trim()
        if (!text) return null

        try {
            candidate = JSON.parse(text)
        } catch {
            const arrayStart = text.indexOf('[')
            const arrayEnd = text.lastIndexOf(']')
            const objectStart = text.indexOf('{')
            const objectEnd = text.lastIndexOf('}')
            const jsonSlice =
                arrayStart >= 0 && arrayEnd > arrayStart
                    ? text.slice(arrayStart, arrayEnd + 1)
                    : objectStart >= 0 && objectEnd > objectStart
                      ? text.slice(objectStart, objectEnd + 1)
                      : ''

            if (!jsonSlice || jsonSlice === text) return text

            try {
                candidate = JSON.parse(jsonSlice)
            } catch {
                return text
            }
        }
    }

    return candidate
}

function getText(record: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
        const value = record[key]

        if (typeof value === 'string' && value.trim()) {
            return value.trim()
        }
    }

    return ''
}

function toPercent(value: number) {
    const percent = Math.abs(value) <= 1 ? value * 100 : value
    return Math.min(100, Math.max(0, Math.round(percent)))
}

function findSummaryItems(value: unknown): unknown[] {
    if (Array.isArray(value)) return value
    if (!isRecord(value)) return []

    const itemContentKeys = [
        'title',
        'subtitle',
        'heading',
        'headline',
        'description',
        'content',
        'caption',
        'summary',
        'summaryText',
        'summary_text',
        '요약',
        '내용',
    ]

    if (itemContentKeys.some((key) => typeof value[key] === 'string')) return [value]

    const containerKeys = [
        'summary',
        'videoSummary',
        'video_summary',
        'summaries',
        'sections',
        'segments',
        'chapters',
        'timestamps',
        'items',
        'result',
    ]

    for (const key of containerKeys) {
        const nested = value[key]
        if (Array.isArray(nested)) return nested

        if (isRecord(nested)) {
            const items: unknown[] = findSummaryItems(nested)
            if (items.length > 0) return items
        }
    }

    const nestedArray = Object.values(value).find(Array.isArray)
    if (nestedArray) return nestedArray

    const keyedItems = Object.entries(value).flatMap(([timestamp, item]) => {
        if (typeof item === 'string') return [{ timestamp, content: item }]
        if (isRecord(item)) return [{ timestamp, ...item }]
        return []
    })

    if (keyedItems.length > 0) return keyedItems

    return []
}

function parseVideoSummary(value: unknown): VideoSummaryItem[] {
    const parsed = parseJson(value)
    const items = findSummaryItems(parsed)

    if (items.length === 0) {
        const content =
            typeof parsed === 'string'
                ? parsed.trim()
                : isRecord(parsed)
                  ? getText(parsed, ['summary', 'description', 'content', 'caption', 'text', '요약', '내용'])
                  : ''

        return content ? [{ timestamp: '00:00', title: content, description: '' }] : []
    }

    return items
        .map((item) => {
            if (typeof item === 'string') {
                return { timestamp: '00:00', title: item.trim(), description: '' }
            }

            if (!isRecord(item)) return null

            const startTime = getText(item, [
                'timestamp',
                'timeStamp',
                'time',
                'timeRange',
                'time_range',
                'startTime',
                'start_time',
                'start',
                '구간',
                '시간',
            ])
            const endTime = getText(item, ['endTime', 'end_time', 'end'])
            const title = getText(item, [
                'title',
                'subtitle',
                'heading',
                'headline',
                'topic',
                'sectionTitle',
                'section_title',
                'subject',
                '소제목',
                '제목',
            ])
            const description = getText(item, [
                'description',
                'detail',
                'content',
                'summary',
                'caption',
                'text',
                'summaryText',
                'summary_text',
                '요약',
                '내용',
            ])

            return {
                timestamp: startTime ? `${startTime}${endTime ? `~${endTime}` : ''}` : '00:00',
                title: title || description,
                description: title ? description : '',
            }
        })
        .filter((item): item is VideoSummaryItem => item !== null)
        .filter((item) => item.title || item.description)
}

function parseReportSummary(value: string): ReportSummaryItem[] {
    const parsed = parseJson(value)
    const items = Array.isArray(parsed)
        ? parsed
        : isRecord(parsed) && Array.isArray(parsed.summary)
          ? parsed.summary
          : isRecord(parsed) && Array.isArray(parsed.items)
            ? parsed.items
            : []

    return items
        .filter(isRecord)
        .map((item) => {
            const status = getText(item, ['status', 'grade', 'label'])

            return {
                status: SUMMARY_STATUSES.has(status as SummaryStatus) ? (status as SummaryStatus) : '보통',
                title: getText(item, ['summaryTitle', 'title', 'heading']),
                details: getText(item, ['details', 'description', 'content', 'summary']),
            }
        })
        .filter((item) => item.title || item.details)
        .slice(0, 3)
}

function parseCommentDescriptions(value: string) {
    const parsed = parseJson(value)
    if (!isRecord(parsed)) return {}

    const aliases: Record<CommentType, string[]> = {
        positive: ['positive', 'POSITIVE'],
        negative: ['negative', 'NEGATIVE'],
        neutral: ['neutral', 'NEUTRAL'],
        advice: ['advice', 'ADVICE', 'adviceOpinion', 'ADVICE_OPINION'],
    }

    return Object.fromEntries(
        Object.entries(aliases).flatMap(([type, keys]) => {
            for (const key of keys) {
                const item = parsed[key]
                const description =
                    typeof item === 'string'
                        ? item
                        : isRecord(item)
                          ? getText(item, ['description', 'summary', 'content'])
                          : ''

                if (description) return [[type, description]]
            }

            return []
        })
    ) as Partial<Record<CommentType, string>>
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

export default function OverviewTab({ data, lockRestrictedSections = false }: OverviewTabProps) {
    const [isVideoSummaryExpanded, setIsVideoSummaryExpanded] = useState(false)
    const positivePercent = toPercent(data?.positiveCommentPercent ?? 30)
    const reportSummaryFallback: ReportSummaryItem[] = [
        {
            status: '긍정',
            title: data ? '시청자의 긍정적인 반응' : '진정성 있는 콘텐츠',
            details: data
                ? `전체 댓글 중 긍정 반응이 ${positivePercent}%로 분석됐어요.`
                : '시청자들의 높은 공감을 이끌어냈으며, 특히 긍정 댓글 비율 60%를 기록했어요.',
        },
        {
            status: '양호',
            title: data ? '시청자 이탈 구간 분석' : '2분대 이탈 발생',
            details: data
                ? '시청 흐름이 감소하는 구간과 개선 방법을 확인해보세요.'
                : '2분 6초~2분 55초 구간에서 이탈이 집중되고 있어요. 편집 템포 조절이 필요해요.',
        },
        {
            status: data && data.seo < 70 ? '최적화 필요' : '최적화 원활',
            title: data ? `SEO 구성 ${data.seo}점` : 'SEO 점수 65점',
            details: data
                ? '제목과 설명, 해시태그 구성을 분석한 결과예요.'
                : '제목과 해시태그 개선을 통해 검색 유입률을 더 높일 수 있어요.',
        },
    ]
    const parsedSummary = data ? parseReportSummary(data.overviewSummary) : []
    const reportSummary = reportSummaryFallback.map((fallback, index) => parsedSummary[index] ?? fallback)
    const parsedVideoSummary = data ? parseVideoSummary(data.summary) : []
    const videoSummary = data ? parsedVideoSummary : FALLBACK_VIDEO_SUMMARY
    const visibleVideoSummary = isVideoSummaryExpanded ? videoSummary : videoSummary.slice(0, 3)
    const showAllVideoSummaryButton = !isVideoSummaryExpanded && videoSummary.length >= 3
    const commentDescriptions = data ? parseCommentDescriptions(data.commentSummary) : {}
    const commentTabValues: Partial<Record<CommentType, CommentTabValue>> | undefined = data
        ? {
              positive: {
                  percentage: toPercent(data.positiveCommentPercent),
                  count: data.positiveComment,
                  description: commentDescriptions.positive,
              },
              negative: {
                  percentage: toPercent(data.negativeCommentPercent),
                  count: data.negativeComment,
                  description: commentDescriptions.negative,
              },
              neutral: {
                  percentage: toPercent(data.neutralCommentPercent),
                  count: data.neutralComment,
                  description: commentDescriptions.neutral,
              },
              advice: {
                  percentage: toPercent(data.adviceCommentPercent),
                  count: data.adviceComment,
                  description: commentDescriptions.advice,
              },
          }
        : undefined
    const commentData = [
        { name: '긍정', value: toPercent(data?.positiveCommentPercent ?? 30), color: '#4ADE80' },
        { name: '부정', value: toPercent(data?.negativeCommentPercent ?? 20), color: '#E0001B' },
        { name: '중립', value: toPercent(data?.neutralCommentPercent ?? 25), color: '#36363B' },
        { name: '조언', value: toPercent(data?.adviceCommentPercent ?? 25), color: '#60A5FA' },
    ]
    const comments = data ? data.comments.slice(0, 3) : FALLBACK_COMMENTS

    return (
        <div className="flex flex-col gap-8 pt-8">
            <section id="report-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">리포트 요약</p>
                {reportSummary.map((item, index) => {
                    const card = (
                        <SummaryCard
                            status={item.status}
                            summaryTitle={item.title}
                            details={item.details}
                        />
                    )

                    return lockRestrictedSections && index > 0 ? (
                        <LockedContent key={`${item.title}-${index}`} message="로그인 시, 본인 영상의 분석에서 확인할 수 있어요">
                            {card}
                        </LockedContent>
                    ) : (
                        <div key={`${item.title}-${index}`}>{card}</div>
                    )
                })}
            </section>

            <section id="video-evaluation" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 평가</p>
                <div className="grid grid-cols-2 gap-2 tablet:grid-cols-3">
                    <EvaluationCard type="view" score={data?.view ?? 120} average={data?.viewChannelAvg ?? 900} />
                    <EvaluationCard type="likes" score={data?.likeCount ?? 120} average={data?.likeChannelAvg ?? 900} />
                    <EvaluationCard type="comments" score={data?.comment ?? 120} average={data?.commentChannelAvg ?? 900} />
                    <EvaluationCard type="concept-consistency" score={data?.concept ?? 120} average={data ? 0 : 900} />
                    <EvaluationCard type="SEO" score={data?.seo ?? 120} average={data ? 0 : 900} />
                    {lockRestrictedSections ? (
                        <LockedContent message="로그인 후 확인할 수 있어요">
                            <EvaluationCard type="revisit-rate" score={data?.revisit ?? 0} average={data ? 0 : 900} />
                        </LockedContent>
                    ) : (
                        <EvaluationCard type="revisit-rate" score={data?.revisit ?? 120} average={data ? 0 : 900} />
                    )}
                </div>
            </section>

            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5">
                    {videoSummary.length > 0 ? (
                        <div id="video-summary-items" className="flex flex-col gap-4">
                            {visibleVideoSummary.map((item, index) => (
                                <SummaryComment
                                    key={`${item.timestamp}-${index}`}
                                    timestamp={item.timestamp}
                                    comment={item.title}
                                    detail={item.description}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="font-body-14r text-text-secondary">영상 요약 정보가 없습니다.</p>
                    )}
                    {showAllVideoSummaryButton && (
                        <button
                            type="button"
                            aria-controls="video-summary-items"
                            aria-expanded={isVideoSummaryExpanded}
                            onClick={() => setIsVideoSummaryExpanded(true)}
                            className="flex w-full items-center justify-center border-t-[1.5px] border-border-default px-4 py-2 text-[16px] leading-[1.5] font-normal tracking-[-0.025em] text-text-secondary"
                        >
                            전체 보기
                        </button>
                    )}
                </div>
            </section>

            <section id="comments" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">댓글 반응</p>
                <div className="flex flex-col gap-8 rounded-[20px] bg-bg-1 p-5">
                    <div className="flex flex-col gap-6 tablet:flex-row">
                        <CommentDonutChart
                            totalComment={formatKoreanNumber(data?.totalCommentCount ?? 8000)}
                            data={commentData}
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-4">
                            <CommentTab values={commentTabValues} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-body-14m text-text-secondary">주요 댓글</p>
                        <div className="flex flex-col gap-2">
                            {comments.map((comment, index) => (
                                <div key={`${comment.content}-${index}`}>
                                    <Comment
                                        comment={comment.content}
                                        profileImageUrl={comment.authorProfileImageUrl}
                                        nickname={comment.author}
                                        time={data ? formatRelativeTime(comment.publishedAt) : comment.publishedAt}
                                        like={comment.likeCount}
                                        appendHourSuffix={!data}
                                    />
                                    {index < comments.length - 1 && <div className="h-px w-full bg-border-default" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
