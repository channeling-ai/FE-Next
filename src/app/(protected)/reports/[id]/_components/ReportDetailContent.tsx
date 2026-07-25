'use client'

import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { useReportProgress } from '@/hooks/useReportProgress'
import ReportTabs from '../../_components/ReportTabs'
import ReportDetailSkeleton from '../../_components/ReportDetailSkeleton'
import ReportDetailHeader from './ReportDetailHeader'

interface ReportDetailContentProps {
    reportId: number
}

export default function ReportDetailContent({ reportId }: ReportDetailContentProps) {
    const { currentStep, isCompleted, isFailed, isProcessing, refetch } = useReportProgress(reportId)

    if (isProcessing) {
        return (
            <ReportDetailSkeleton
                currentStep={currentStep}
                title="상세 분석 리포트"
                statusMessage="리포트를 생성하고 있습니다."
            />
        )
    }

    if (isFailed || !isCompleted) {
        return (
            <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
                <ReportDetailHeader />
                <PageContent as="main" className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                    <p className="font-body-16sb text-text-primary">리포트를 생성하지 못했습니다.</p>
                    <p className="font-body-14r text-text-secondary">잠시 후 다시 확인해 주세요.</p>
                    <button
                        type="button"
                        className="rounded-xl bg-bg-2 px-4 py-2 font-body-14m text-text-primary"
                        onClick={() => void refetch()}
                    >
                        다시 확인
                    </button>
                </PageContent>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <ReportDetailHeader />
                <PageContent as="main" className="flex flex-col gap-4 pb-16 pt-4">
                    <div className="flex flex-col gap-4 tablet:flex-row">
                        <div className="aspect-[328/184] w-full rounded-[20px] bg-bg-3 tablet:aspect-auto tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79"></div>
                        <div className="flex flex-col items-start justify-start gap-1">
                            <div className="rounded-[20px] bg-bg-2 px-2 py-1 font-caption-12m text-text-primary desktop:font-caption-14m">
                                Long-Form
                            </div>
                            <div className="font-title-18sb text-text-primary">
                                주말 아침 루틴 | 느긋한 브런치 만들기
                            </div>
                            <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                업데이트: 2025년 6월 21일 (오전 03:39)
                            </div>
                            <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                지혜로운 생활 · 5일 전
                            </div>
                        </div>
                    </div>

                    <ReportTabs reportId={reportId} />
                </PageContent>
            </Scroll>
        </div>
    )
}
