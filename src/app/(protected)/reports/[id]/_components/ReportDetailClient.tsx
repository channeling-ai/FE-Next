'use client'

import { useEffect, useState } from 'react'
import PageContent from '@/components/layout/PageContent'
import ReportTabs from '@/app/(protected)/reports/_components/ReportTabs'
import Scroll from '@/components/Scroll'
import Header from '@/components/layout/Header'
import { useVideoStore } from '@/stores/videoStore'
import { getVideoInfo } from '@/api/video'
import { VideoInfoResponse } from '@/types/videos'
import { formatKoreanDate, formatRelativeTime } from '@/utils/format'

interface ReportDetailClientProps {
    reportId: number
}

export default function ReportDetailClient({ reportId }: ReportDetailClientProps) {
    const selectedVideoId = useVideoStore((state) => state.selectedVideoId)
    const [videoInfo, setVideoInfo] = useState<VideoInfoResponse | null>(null)

    useEffect(() => {
        if (selectedVideoId == null) return

        const videoId = selectedVideoId

        async function fetchVideoInfo() {
            const video = await getVideoInfo(videoId)
            setVideoInfo(video)
        }

        void fetchVideoInfo()
    }, [selectedVideoId])

    if (selectedVideoId == null) {
        return null
    }

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="상세 분석 리포트" showMenu={true} />

                <PageContent as="main" className="flex flex-col gap-4 pt-4 pb-16">
                    {videoInfo && (
                        <div className="flex flex-col gap-4 tablet:flex-row">
                            <img
                                className="aspect-328/184 w-full rounded-[20px] object-cover tablet:aspect-auto tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79"
                                src={videoInfo.videoThumbnailUrl}
                                alt={videoInfo.videoTitle ?? '영상 썸네일'}
                            />

                            <div className="flex flex-col items-start justify-start gap-1">
                                <div className="rounded-[20px] bg-bg-2 px-2 py-1 font-caption-12m text-text-primary desktop:font-caption-14m">
                                    {videoInfo.videoType === 'LONG' ? 'Long-form' : 'Short-form'}
                                </div>

                                <div className="font-title-18sb text-text-primary">{videoInfo.videoTitle}</div>

                                <div className="flex gap-1">
                                    <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                        업데이트 :
                                    </div>
                                    <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                        {formatKoreanDate(videoInfo.videoCreatedDate)}
                                    </div>
                                </div>

                                <div className="flex gap-1">
                                    <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                        {videoInfo.ChannelName}
                                    </div>
                                    <div className="font-body-14r text-text-secondary desktop:font-body-16r">·</div>
                                    <div className="font-body-14r text-text-secondary desktop:font-body-16r">
                                        {formatRelativeTime(videoInfo.videoCreatedDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <ReportTabs reportId={reportId} />
                </PageContent>
            </Scroll>
        </div>
    )
}
