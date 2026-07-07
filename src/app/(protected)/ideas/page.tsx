'use client'

import TrendKeyword from './_components/trend-keyword'
import ContentIdeaGeneration from './_components/content-idea-generation'
import Line from '@/components/Line'
import SavedIdea from './_components/saved-idea'
import Header from '@/components/layout/Header'
import Scroll from '@/components/Scroll'

/**
 * 아이디어 페이지 (/ideas)
 * - 콘텐츠 기획 아이디어 리스트
 * - 아이디어 생성 도구
 */
export default function IdeasPage() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Header title="트렌드 · 아이디어" />

            <Scroll as="main" className="flex-1">
                <div className="flex flex-col gap-8 pb-16">
                    <div className="flex w-full flex-col items-center gap-3.5 px-4 desktop:px-8">
                        <TrendKeyword />
                        <Line variant="thin" />
                        <ContentIdeaGeneration />
                    </div>
                    <Line variant="thick" />
                    <SavedIdea />
                </div>
            </Scroll>
        </div>
    )
}
