'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import Header from '@/components/layout/Header'
import { useLayoutStore } from '@/stores/layoutStore'

export default function DashboardHeader() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <div className="desktop:hidden">
            <Header
                title="대시보드"
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
        </div>
    )
}
