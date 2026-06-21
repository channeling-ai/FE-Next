'use client'

import Image from 'next/image'
import { useState } from 'react'

const metrics = ['채널 성장', '알고리즘', '시청 몰입', '반응 밀도', '유입 활력', '업로드 주기'] as const
const periods = ['1주', '1달'] as const

export default function UploadCycleChart() {
    const [activeMetric, setActiveMetric] = useState<(typeof metrics)[number]>('채널 성장')
    const [period, setPeriod] = useState<(typeof periods)[number]>('1주')

    return (
        <section className="flex w-full flex-col gap-[22px] rounded-[20px] bg-bg-1 p-5">
            <div className="flex w-full items-start justify-between gap-2 overflow-hidden">
                <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max items-center">
                        {metrics.map((metric) => (
                            <button
                                key={metric}
                                type="button"
                                onClick={() => setActiveMetric(metric)}
                                className={`shrink-0 border-b-2 px-2 py-2 font-body-14m transition-colors desktop:font-body-16m ${activeMetric === metric ? 'border-border-active text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
                            >
                                {metric}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex shrink-0 gap-1 rounded-[20px] bg-bg-2 p-1">
                    {periods.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setPeriod(item)}
                            className={`rounded-[20px] px-2 py-1 font-body-14m transition-colors desktop:font-body-16m ${period === item ? 'bg-bg-3 text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-[290px] w-full overflow-hidden">
                <div className="absolute bottom-0 left-0 h-[196px] w-full -scale-x-100">
                    <Image
                        src="/images/dashboard/upload-cycle-chart.svg"
                        alt=""
                        fill
                        loading="eager"
                        sizes="(min-width: 1440px) 75vw, (min-width: 768px) 90vw, 288px"
                        className="object-fill"
                    />
                </div>

                <div className="absolute left-0 top-0 flex h-[290px] -translate-x-1/2 flex-col items-center gap-2 tablet:left-[46%] desktop:left-[29%]">
                    <div className="flex flex-col items-center whitespace-nowrap text-center">
                        <span className="font-caption-12r text-text-secondary desktop:font-body-14r">
                            <span className="tablet:hidden">2026.02.19</span>
                            <span className="hidden tablet:inline">2026.02.23</span>
                        </span>
                        <strong className="font-body-16m text-text-primary desktop:text-[18px] desktop:font-medium desktop:leading-[1.5]">
                            <span className="tablet:hidden">39</span>
                            <span className="hidden tablet:inline">50</span>점
                        </strong>
                    </div>
                    <span className="h-60 w-px bg-gray-40" />
                </div>
            </div>
        </section>
    )
}
