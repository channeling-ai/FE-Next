'use client'

import { ReactNode } from 'react'

interface HeaderProps {
    className?: string
    leading?: ReactNode
    leadingClassName?: string
    title: string
    trailing?: ReactNode
}

/**
 * 공통 Header 컴포넌트
 *
 * - 화면 상단 공통 header로 사용
 * - 구조: [leading] [title] ——————— [trailing]
 * - spacing은 Figma header design system 기준을 따른다.
 *
 * @example 1
 * // 기본 (타이틀만)
 * <Header title="대시보드" />
 *
 * @example 2
 * // 뒤로가기 + 오른쪽 버튼
 * <Header
 *   title="상세 리포트"
 *   leading={<BackButton />}
 *   trailing={<ShareButton />}
 * />
 */

export default function Header({
    className = '',
    leading,
    leadingClassName = '',
    title,
    trailing,
}: HeaderProps) {
    return (
        <header
            className={`flex min-h-14 w-full min-w-[360px] items-center justify-between bg-bg-0 px-4 py-3 tablet:min-h-16 tablet:min-w-[768px] tablet:px-5 tablet:py-4 desktop:mx-auto desktop:min-h-0 desktop:w-[1240px] desktop:px-16 desktop:py-5 ${className}`}
        >
            <div className="flex items-center gap-2">
                {leading && <div className={`flex shrink-0 items-center ${leadingClassName}`}>{leading}</div>}
                <span className="font-title-18sb text-text-primary whitespace-nowrap">{title}</span>
            </div>
            {trailing && <div className="flex items-center gap-2 shrink-0">{trailing}</div>}
        </header>
    )
}
