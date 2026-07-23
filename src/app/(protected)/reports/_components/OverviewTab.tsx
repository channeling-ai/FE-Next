import CommentDonutChart from './CommentDoughnutChart'
import CommentTab from './CommentTab'
import EvaluationCard from './EvaluationCard'
import SummaryComment from './SummaryComment'
import SummaryCard from './SummaryCard'
import Comment from './Comment'
import { ReportOverviewresponse } from '@/types/reports'
import { formatKoreanNumber } from '@/utils/format'

const commentData = [
    { name: '긍정', value: 30, color: '#4ADE80' },
    { name: '부정', value: 20, color: '#E0001B' },
    { name: '중립', value: 25, color: '#36363B' },
    { name: '조언', value: 25, color: '#60A5FA' },
]

interface OverviewProps {
    overview?: ReportOverviewresponse
    isPending: boolean
}

export default function OverviewTab({ overview, isPending }: OverviewProps) {
    return (
        <div className="flex flex-col pt-8 gap-8">
            <section id="report-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">리포트 요약</p>
                {/* {overview?.overviewSummary.map((reportSummary) => (
                    <SummaryCard
                        status={reportSummary.tag}
                        summaryTitle={reportSummary.title}
                        details={reportSummary.content}
                    />
                ))} */}
                {overview?.overviewSummary && (
                    <SummaryCard
                        status={overview.overviewSummary.tag}
                        summaryTitle={overview.overviewSummary.title}
                        details={overview.overviewSummary.content}
                    />
                )}
            </section>
            <section id="video-evaluation" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 평가</p>
                <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2">
                    <EvaluationCard type="view" score={overview?.view} average={overview?.viewChannelAvg} />
                    <EvaluationCard type="likes" score={overview?.likeCount} average={overview?.likeChannelAvg} />
                    <EvaluationCard type="comments" score={overview?.comment} average={overview?.commentChannelAvg} />
                    <EvaluationCard type="concept-consistency" score={overview?.concept} average={900} />
                    <EvaluationCard type="SEO" score={overview?.seo} average={900} />
                    <EvaluationCard type="revisit-rate" score={overview?.revisit} average={900} />
                </div>
            </section>
            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 p-5 rounded-[20px] bg-bg-1">
                    {overview?.summary.map((summary) => (
                        <SummaryComment timestamp={summary.time} comment={summary.title} detail={summary.content} />
                    ))}
                </div>
            </section>
            <section id="comments" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">댓글 반응</p>
                {overview && (
                    <div className="flex flex-col gap-8 p-5 rounded-[20px] bg-bg-1">
                        <div className="flex gap-6 flex-col tablet:flex-row">
                            <CommentDonutChart
                                totalComment={formatKoreanNumber(overview?.totalCommentCount, '')}
                                data={commentData}
                            />
                            <div className="flex flex-col gap-4 min-w-0 flex-1">
                                <CommentTab
                                    comment={overview.commentSummary}
                                    positiveCount={overview.positiveComment}
                                    positivePercent={overview.positiveCommentPercent}
                                    negativeCount={overview.negativeComment}
                                    negativePercent={overview.negativeCommentPercent}
                                    neutralCount={overview.neutralComment}
                                    neutralPercent={overview.neutralCommentPercent}
                                    adviceCount={overview.adviceComment}
                                    advicePercent={overview.adviceCommentPercent}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-body-14m text-text-secondary">주요 댓글</p>

                            <div className="flex flex-col gap-2">
                                <Comment
                                    comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                    profileImageUrl="12222"
                                    nickname="닉네임"
                                    time="n"
                                    like={999}
                                />
                                <div className="w-full bg-border-default h-px"></div>
                                <Comment
                                    comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                    profileImageUrl="21222"
                                    nickname="닉네임"
                                    time="n"
                                    like={11}
                                />
                                <div className="w-full bg-border-default h-px"></div>
                                <Comment
                                    comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                    profileImageUrl="1222"
                                    nickname="닉네임"
                                    time="n"
                                    like={297}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
