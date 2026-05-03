interface MetricCardwithImageProps {
  channelname?: string;
  subscriber?: string;
  range?: string;
  imageUrl?: string;
}

export default function MetricCardwithImage({
  channelname,
  subscriber,
  range,
  imageUrl,
}: MetricCardwithImageProps) {
  return (
    <div
      className="flex flex-col justify-between items-start w-82 h-82 p-5 rounded-[20px] bg-video-card"
      style={{ "--video-thumb": `url('${imageUrl}')` } as React.CSSProperties}
    >
      <span className="text-text-primary font-title-18sb">
        안녕하세요
        <br /> {channelname}
      </span>
      <div className="flex flex-col items-start self-stretch">
        <span className="text-text-primary font-body-14m">구독자</span>
        <div className="text-text-primary font-title-40r">{subscriber}</div>
        <div className="flex gap-[6.431px] font-caption-12m">
          <div className="text-text-brand">{range}</div>
          <span className="text-text-secondary">지난 달보다</span>
        </div>
      </div>
    </div>
  );
}
