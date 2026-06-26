'use client'

import TrendKeyword from './_components/trend-keyword'
import ContentIdeaGeneration from './_components/content-idea-generation'
import Line from '@/components/Line'
import SavedIdea from './_components/saved-idea'
import Header from '@/components/layout/Header'

/**
 * 아이디어 페이지 (/ideas)
 * - 콘텐츠 기획 아이디어 리스트
 * - 아이디어 생성 도구
 */
export default function IdeasPage() {
    return (
        <main className="mt-2">
            <Header title="트렌드 · 아이디어" />
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3.5 items-center w-full px-4 desktop:px-8">
                    <TrendKeyword />
                    {/* <div className="w-82 h-px bg-border-subtitle mt-4" /> */}
                    <Line variant="thin" />
                    <ContentIdeaGeneration />
                </div>
                <div className="w-full h-4 bg-black" />
                <SavedIdea />
            </div>
        </main>
    )
}
