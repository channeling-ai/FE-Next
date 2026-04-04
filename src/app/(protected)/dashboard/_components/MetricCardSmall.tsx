"use client";

import { useAuthStore } from "@/stores/authStore";
import StatusBadge from "../../../../components/StatusBadge";

export default function MetricCardSmall() {
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="relative w-40">
      {!isLoggedIn && (
        <div className="absolute inset-0 z-10 rounded-[20px] bg-white/1 px-[23.5px] py-8.25 backdrop-blur-[10px] ">
          <div className="z-10 text-white w-full h-full font-caption-14m">
            로그인 시,
            <br /> 본인 영상의 분석에서
            <br />
            확인할 수 있어요
          </div>
        </div>
      )}
      <div className="flex flex-col w-full p-4 rounded-[20px] bg-bg-1 items-start gap-2">
        <div className="flex justify-between self-stretch">
          <span className="text-text-secondary font-body-14m">누적 조회수</span>
          <StatusBadge status="최상" />
        </div>
        <div className="relative flex items-start self-stretch">
          <div className="text-text-primary font-title-30r">8.5</div>
          <span className="text-text-secondary font-title-30r">점</span>
        </div>
        <div className="flex gap-[6.431px] font-caption-12m">
          <div className="text-text-brand">+ 42</div>
          <span className="text-text-secondary">지난 달보다</span>
        </div>
      </div>
    </div>
  );
}
