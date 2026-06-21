import Scroll from '@/components/Scroll'
import DashboardFooter from './_components/DashboardFooter'
import DashboardHeader from './_components/DashboardHeader'
import InsightCard from './_components/InsightCard'
import MetricCardSmall from './_components/MetricCardSmall'
import MetricCardWithImage from './_components/MetricCardwithImage'
import UploadCycleChart from './_components/UploadCycleChart'

const metrics = [
    { label: '채널 성장', score: 99, status: '최상' as const },
    { label: '알고리즘', score: 99, status: '위험' as const },
    { label: '시청 몰입', score: 85, status: '우수' as const },
    { label: '반응 밀도', score: 99, status: '보통' as const },
    { label: '유입 활력', score: 85, status: '주의' as const },
    { label: '업로드 주기', score: 85, status: '최상' as const },
]

const insights = [
    {
        title: '역주행 영상 활용',
        description: "15일 전 업로드한 'Node.js 미들웨어' 영상의 조회수가 최근 24시간 동안 평소 대비 280% 급증",
        tags: ['조회수: +42% 예상', '구독자 전환율: +2.5% 예상'],
    },
    {
        title: '트렌드 키워드 공략',
        description: '서버리스 키워드 검색량이 40% 급상승 중이며, 채널 시청자 관심사와 85% 일치하는 것으로 분석되었습니다.',
        tags: ['노출 클릭률(CTR): +15% 예상', '신규 시청자 유입: +28% 예상'],
    },
    {
        title: '댓글 여론 분석',
        description: '강의 만족도는 92%로 매우 높으나 마이크 소음 개선과 Docker 리뷰에 대한 시청자 요구가 확인되었습니다.',
        tags: ['시청 지속 시간: +12%', '팬덤 충성도: +8% 예상'],
    },
]

export default function DashboardPage() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <DashboardHeader />

            <Scroll as="main" className="flex-1">
                <div className="mx-auto flex w-full flex-col gap-8 px-4 pb-8 pt-4 tablet:px-5 desktop:px-16 desktop:pb-16 desktop:pt-8">
                    <section className="flex w-full flex-col gap-2">
                        <p className="font-body-14r text-text-tertiary desktop:font-body-16r">
                            26년 2월 19일 (05:15) 기준
                        </p>

                        <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-[274px_minmax(0,1fr)] desktop:grid-cols-[298px_minmax(0,1fr)]">
                            <MetricCardWithImage
                                channelName="LeoJ Makeup"
                                subscribers="8.5M"
                                delta={42}
                                imageUrl="/images/dashboard/subscriber-card.png"
                            />
                            <div className="grid min-w-0 grid-cols-2 gap-2 tablet:grid-cols-3">
                                {metrics.map((metric) => (
                                    <MetricCardSmall key={metric.label} {...metric} delta={42} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <UploadCycleChart />

                    <section className="flex w-full flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-body-16sb text-text-primary desktop:font-title-20sb">채널링의 제안</h2>
                            <p className="font-body-14r text-text-secondary desktop:font-body-16r">
                                최근 24시간 내 특정 영상 조회수가 평소 대비 280% 급증하며 추천 피드 유입이 80%를 점유했고, 노출 가속도가 평소 대비 3.5배 상승한 폭발적 성장 단계입니다.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {insights.map((insight) => (
                                <InsightCard key={insight.title} {...insight} />
                            ))}
                        </div>
                    </section>

                    <DashboardFooter />
                </div>
            </Scroll>
        </div>
    )
}
