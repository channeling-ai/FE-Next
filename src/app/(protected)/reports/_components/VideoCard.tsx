interface VideoCardProps {
  title?: string;
  leftside?: string;
  rightside?: string;
  period?: string;
}

export default function VideoCard({
  title,
  leftside,
  rightside,
  period,
}: VideoCardProps) {
  return (
    <div className="flex flex-col w-82 border border-transparent hover:border-border-active rounded-[20px]">
      <div className="flex w-full h-46 bg-transparentrounded-t-[20px]"></div>
      <div className="flex flex-col p-4 w-full  items-start self-stretch bg-bg-1 rounded-b-[20px]">
        {period && (
          <div className="text-text-tertiary font-caption-14r">
            26년 2월 15일 (19:35)~26년 2월 15일 (19:35){period}
          </div>
        )}
        <div className="h-[52.898px] self-stretch text-text-primary font-body-16sb line-clamp-2">
          영상 제목 자리 영상 제목 자리영상 제목 자리영상 제목 자리영상 제목
          자리영상 제목 자리영상 제목 자리{title}
        </div>
        <div className="flex items-start gap-[8.816px] self-stretch">
          <div className="text-text-secondary font-body-14r">
            조회수 17만회{leftside}
          </div>
          <div className="text-gray-600 font-body-14r">·</div>
          <div className="text-text-secondary font-body-14r">
            3년 전{rightside}
          </div>
        </div>
      </div>
    </div>
  );
}
