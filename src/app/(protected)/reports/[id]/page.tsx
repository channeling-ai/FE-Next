import Header from '@/components/layout/Header'
import VideoCard from '../_components/VideoCard'
import ReportTabs from '../_components/ReportTabs'

interface ReportDetailPageProps {
    params: Promise<{ id: string }>
}

/**
 * 상세 분석 리포트 페이지 (/reports/[id])
 * - 이탈률 그래프
 * - AI 구간 분석
 * - 개선 제안
 */
export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
    const { id } = await params

    return (
        <main className="px-4 tablet:px-5 desktop:px-16 flex flex-col">
            <Header title="상세 분석 리포트" />
            <div className="pt-4 flex flex-col gap-4">
                {/* 영상 정보 */}
                <div className="flex gap-4 flex-col tablet:flex-row">
                    <div className="w-82 h-46 tablet:w-59.25 tablet:h-33.25 desktop:w-79 desktop:h-44.5 rounded-[20px] bg-bg-3"></div>
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <div className="px-2 py-1 rounded-[20px] bg-bg-2 font-caption-12m desktop:font-caption-14m text-text-primary">
                            Long-Form
                        </div>
                        <div className="font-title-14sb desktop:font-title-20sb text-text-primary">
                            주말 아침 루틴 | 느긋한 브런치 만들기
                        </div>
                        <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                            업데이트: 2025년 6월 21일 (오전 03:39)
                        </div>
                        <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                            지혜로운 생활 · 5일 전
                        </div>
                    </div>
                </div>

                <ReportTabs />
            </div>
        </main>
    )
}
