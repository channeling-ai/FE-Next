'use client'

import { useState } from 'react'

type TabType = 'overview' | 'analysis'

export default function ReportTabs() {
    const [activeTab, setActiveTab] = useState<TabType>('overview')

    const tabBaseClass =
        'flex flex-1 p-2 justify-center items-center rounded-2xl font-body-18sb cursor-pointer transition-colors'

    return (
        <div className="flex flex-col gap-4">
            <div className="flex p-1 items-center rounded-[20px] bg-bg-1">
                <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`${tabBaseClass} ${
                        activeTab === 'overview' ? 'bg-bg-2 text-text-primary' : 'bg-transparent text-text-tertiary'
                    }`}
                >
                    개요
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('analysis')}
                    className={`${tabBaseClass} ${
                        activeTab === 'analysis' ? 'bg-bg-2 text-text-primary' : 'bg-transparent text-text-tertiary'
                    }`}
                >
                    분석
                </button>
            </div>

            {activeTab === 'overview' && (
                <section className="flex flex-col gap-4">
                    <div className="rounded-[20px] bg-bg-1 p-4 text-text-primary font-body-16r">개요 내용 영역</div>

                    {/* TODO: 이탈률 그래프 섹션 */}
                    {/* TODO: 주요 지표 요약 섹션 */}
                </section>
            )}

            {activeTab === 'analysis' && (
                <section className="flex flex-col gap-4">
                    <div className="rounded-[20px] bg-bg-1 p-4 text-text-primary font-body-16r">분석 내용 영역</div>

                    {/* TODO: AI 구간 분석 섹션 */}
                    {/* TODO: 개선 제안 섹션 */}
                </section>
            )}
        </div>
    )
}
