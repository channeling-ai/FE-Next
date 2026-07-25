import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import { SkeletonBase } from '@/components/skeletonbase'
import ReportProgressBar from './ReportProgressBar'

interface ReportDetailSkeletonProps {
    currentStep?: number
    statusMessage: string
    title: string
}

export default function ReportDetailSkeleton({ currentStep, statusMessage, title }: ReportDetailSkeletonProps) {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3" aria-busy="true" aria-live="polite">
            <Header title={title} className="tablet:min-h-16 desktop:min-h-18" />
            {currentStep !== undefined && <ReportProgressBar currentStep={currentStep} />}
            <PageContent as="main" className="flex flex-1 flex-col gap-4 pb-16 pt-4">
                <span className="sr-only">{statusMessage}</span>
                <div className="flex flex-col gap-4 tablet:flex-row">
                    <SkeletonBase sizeConfig="aspect-[328/184] h-auto w-full tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79" />
                    <div className="flex flex-1 flex-col gap-3">
                        <SkeletonBase sizeConfig="h-6 w-20" />
                        <SkeletonBase sizeConfig="h-7 w-3/4" />
                        <SkeletonBase sizeConfig="h-5 w-1/2" />
                        <SkeletonBase sizeConfig="h-5 w-1/3" />
                    </div>
                </div>
                <SkeletonBase sizeConfig="h-14 w-full" />
                <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                    <SkeletonBase sizeConfig="h-48 w-full" />
                    <SkeletonBase sizeConfig="h-48 w-full" />
                </div>
                <SkeletonBase sizeConfig="h-64 w-full" />
            </PageContent>
        </div>
    )
}
