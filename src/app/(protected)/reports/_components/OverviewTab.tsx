import EvaluationCard from './EvaluationCard'
import SummaryComment from './SummaryComment'
import SummaryCard from './SummaryCard'
import { ReportOverviewresponse } from '@/types/reports'
import { formatKoreanNumber } from '@/utils/format'
import CommentSummarySection from './CommentSummarySection'

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
            {overview && (
                <section id="video-evaluation" className="flex flex-col gap-2">
                    <p className="font-body-16sb text-text-primary">영상 평가</p>
                    <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2">
                        <EvaluationCard
                            type="view"
                            score={formatKoreanNumber(overview?.view, '')}
                            average={overview?.viewChannelAvg}
                        />
                        <EvaluationCard
                            type="likes"
                            score={formatKoreanNumber(overview?.likeCount, '')}
                            average={overview?.likeChannelAvg}
                        />
                        <EvaluationCard
                            type="comments"
                            score={formatKoreanNumber(overview?.comment, '')}
                            average={overview?.commentChannelAvg}
                        />
                        <EvaluationCard type="concept-consistency" score={formatKoreanNumber(overview?.concept, '')} />
                        <EvaluationCard type="SEO" score={formatKoreanNumber(overview?.seo, '')} />
                        <EvaluationCard type="revisit-rate" score={formatKoreanNumber(overview?.revisit, '')} />
                    </div>
                </section>
            )}
            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 p-5 rounded-[20px] bg-bg-1">
                    {overview?.summary.map((summary) => (
                        <SummaryComment
                            key={summary.time}
                            timestamp={summary.time}
                            comment={summary.title}
                            detail={summary.content}
                        />
                    ))}
                </div>
            </section>
            <section id="comments" className="flex flex-col gap-2">
                {overview && <CommentSummarySection overview={overview} />}
            </section>
        </div>
    )
}
