'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import Line from '@/components/Line'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { useLayoutStore } from '@/stores/layoutStore'
import ContentIdeaGeneration from './_components/content-idea-generation'
import SavedIdea from './_components/saved-idea'
import TrendKeyword from './_components/trend-keyword'

/**
 * 아이디어 페이지 (/ideas)
 * - 콘텐츠 기획 아이디어 리스트
 * - 아이디어 생성 도구
 */
export default function IdeasPage() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <Header
                    title="트렌드 · 아이디어"
                    leadingClassName="desktop:hidden"
                    leading={
                        <button
                            type="button"
                            onClick={openSidebar}
                            className="-ml-1 flex size-8 items-center justify-center text-icon-primary transition-colors hover:text-text-primary"
                            aria-label="메뉴 열기"
                        >
                            <MenuIcon />
                        </button>
                    }
                />
                <div className="flex flex-col gap-8 pb-16">
                    <PageContent className="flex flex-col items-center gap-3.5">
                        <TrendKeyword />
                        <Line variant="thin" />
                        <ContentIdeaGeneration />
                    </PageContent>
                    <Line variant="thick" />
                    <SavedIdea />
                </div>
            </Scroll>
        </div>
    )
}
