'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import { useLayoutStore } from '@/stores/layoutStore'

export default function SettingHeader() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <header className="shrink-0 bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5">
            <div className="flex h-8 items-center gap-2">
                <button
                    type="button"
                    onClick={openSidebar}
                    className="-ml-1 flex size-8 items-center justify-center text-icon-primary transition-colors hover:text-text-primary desktop:hidden"
                    aria-label="메뉴 열기"
                >
                    <MenuIcon />
                </button>
                <h1 className="font-title-18sb text-text-primary">
                    설정
                </h1>
            </div>
        </header>
    )
}
