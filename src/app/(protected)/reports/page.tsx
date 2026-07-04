'use client'

import Header from '@/components/layout/Header'
import MyVideoList from './_components/MyVideoList'
import Line from '@/components/Line'
import ReportList from './_components/ReportList'

/**
 * 영상 리포트 목록 페이지 (/reports)
 * - 리포트 생성 섹션: 분석할 영상 URL 입력 및 리포트 생성 버튼
 * - 생성된 리포트 목록
 */
export default function ReportsPage() {
    return (
        <main className="flex flex-col gap-2 pb-16">
            <Header title="영상 리포트" />
            <div className="flex flex-col gap-4">
                <MyVideoList />
                <Line variant="thick" />
                <ReportList />
            </div>
        </main>
    )
}
