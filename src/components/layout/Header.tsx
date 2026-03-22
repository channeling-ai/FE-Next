'use client'

import { ReactNode } from 'react'

interface HeaderProps {
    leading?: ReactNode
    title: string
    trailing?: ReactNode
}

/**
 * 공통 Header 컴포넌트
 *
 * - 모든 보호된 페이지(protected)에서 공통으로 사용
 * - 구조: [leading] [title] ——————— [trailing]
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

export default function Header({ leading, title, trailing }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-bg-0 w-full min-h-[56px] border-b border-border-divider">
            <div className="flex items-center gap-2 desktop:gap-8">
                {leading && (
                    <div className="flex items-center shrink-0">
                        {leading}
                    </div>
                )}
                <span className="font-title-18sb text-text-primary whitespace-nowrap">
                    {title}
                </span>
            </div>
            {trailing && (
                <div className="flex items-center gap-2 shrink-0">
                    {trailing}
                </div>
            )}
        </header>
    )
}
