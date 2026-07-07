'use client'

import PageContent from '@/components/layout/PageContent'

/**
 * 영상 리포트 목록 페이지 (/reports)
 * - 리포트 생성 섹션: 분석할 영상 URL 입력 및 리포트 생성 버튼
 * - 생성된 리포트 목록
 */
export default function ReportsPage() {
    return (
        <PageContent as="main" className="py-6">
            <h1 className="text-2xl font-bold">영상 리포트</h1>

            {/* 리포트 생성 섹션 */}
            <section className="mt-6">
                <h2 className="text-lg font-semibold">새 리포트 생성</h2>
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        placeholder="YouTube 영상 URL을 입력하세요"
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">리포트 생성</button>
                </div>
            </section>

            {/* TODO: 리포트 목록 섹션 */}
        </PageContent>
    )
}
