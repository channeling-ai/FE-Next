interface MetricCardWithImageProps {
    channelName: string
    delta: number
    imageUrl: string
    subscribers: string
}

export default function MetricCardWithImage({
    channelName,
    delta,
    imageUrl,
    subscribers,
}: MetricCardWithImageProps) {
    return (
        <article
            className="bg-video-card flex aspect-square w-full flex-col items-start justify-between overflow-hidden rounded-[20px] p-5"
            style={{ '--video-thumb': `url('${imageUrl}')` } as React.CSSProperties}
        >
            <h2 className="font-body-16sb text-text-primary desktop:font-title-20sb">
                안녕하세요
                <br />
                <span className="block max-w-full truncate">{channelName}</span>
            </h2>

            <div className="flex w-full flex-col items-start">
                <span className="font-body-14m text-text-primary desktop:font-body-16m">구독자</span>
                <strong className="whitespace-nowrap text-[40px] font-normal leading-[1.4] text-text-primary desktop:text-[48px]">
                    {subscribers}
                </strong>
                <p className="flex items-center gap-2 whitespace-nowrap font-caption-12r text-text-secondary desktop:font-body-14r">
                    <span className="font-caption-12m text-text-brand desktop:font-body-14m">+ {delta}</span>
                    지난 달 보다
                </p>
            </div>
        </article>
    )
}
