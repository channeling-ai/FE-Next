import type { VideoInfoResponse } from '@/types/videos'
import { formatKoreanDate, formatRelativeTime } from '@/utils/format'

const VIDEO_TYPE_LABEL: Record<VideoInfoResponse['videoType'], string> = {
    ALL: 'All',
    LONG: 'Long-Form',
    SHORTS: 'Short-Form',
}

type ReportVideoInfoData = Pick<
    VideoInfoResponse,
    'videoTitle' | 'videoThumbnailUrl' | 'videoType' | 'lastUpdatedDate' | 'ChannelName' | 'videoCreatedDate'
>

export default function ReportVideoInfo({ video }: { video: ReportVideoInfoData }) {
    return (
        <section className="flex flex-col gap-4 tablet:flex-row" aria-labelledby="report-video-title">
            <div
                role="img"
                aria-label={`${video.videoTitle} 썸네일`}
                className="aspect-[328/184] w-full rounded-[20px] bg-bg-3 bg-cover bg-center tablet:aspect-auto tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79"
                style={{ backgroundImage: `url(${video.videoThumbnailUrl})` }}
            />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-start gap-1">
                <div className="rounded-[20px] bg-bg-2 px-2 py-1 font-caption-12m text-text-primary desktop:font-caption-14m">
                    {VIDEO_TYPE_LABEL[video.videoType]}
                </div>
                <h1 id="report-video-title" className="line-clamp-2 font-title-18sb text-text-primary">
                    {video.videoTitle}
                </h1>
                <p className="font-body-14r text-text-secondary desktop:font-body-16r">
                    업데이트: {formatKoreanDate(video.lastUpdatedDate)}
                </p>
                <div className="flex min-w-0 gap-1 font-body-14r text-text-secondary desktop:font-body-16r">
                    <span className="truncate">{video.ChannelName}</span>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{formatRelativeTime(video.videoCreatedDate)}</span>
                </div>
            </div>
        </section>
    )
}
