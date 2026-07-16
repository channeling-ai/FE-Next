'use client'

import Header from '@/components/layout/Header'
import MenuIcon from '@/assets/icons/menu.svg'
import { useLayoutStore } from '@/stores/layoutStore'

export default function ReportDetailPageHeader() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)
    return (
        <Header
            title="상세 분석 리포트"
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
    )
}
