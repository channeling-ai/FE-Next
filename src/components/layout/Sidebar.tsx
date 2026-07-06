'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import IdeaIcon from '@/assets/icons/idea.svg'
import LogoIcon from '@/assets/icons/logo.svg'
import ReportIcon from '@/assets/icons/report.svg'
import CloseIcon from '@/assets/icons/sidebar-close.svg'
import ProfileImage from '@/components/ProfileImage'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

interface SidebarItemProps {
    href: string
    icon: ReactNode
    isActive?: boolean
    isDesktopCollapsed: boolean
    label: string
    onNavigate?: () => void
}

function SidebarItem({
    href,
    icon,
    isActive = false,
    isDesktopCollapsed,
    label,
    onNavigate,
}: SidebarItemProps) {
    return (
        <Link
            href={href}
            onClick={onNavigate}
            aria-label={label}
            className={`group relative flex h-10 w-full items-center gap-2 rounded-lg p-2 transition-all duration-300 desktop:shrink-0 ${isDesktopCollapsed ? 'desktop:w-10' : 'desktop:w-full'} ${isActive ? 'bg-bg-2' : 'bg-transparent hover:bg-bg-2'}`}
        >
            <span className="flex size-6 shrink-0 items-center justify-center text-icon-primary">
                {icon}
            </span>
            <span
                className={`min-w-0 truncate font-body-14m text-text-primary desktop:text-[16px] ${isDesktopCollapsed ? 'desktop:hidden' : ''}`}
            >
                {label}
            </span>
            {isDesktopCollapsed && (
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-12 top-1/2 z-50 hidden h-10 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-bg-2 px-2 font-body-16m text-text-primary opacity-0 shadow-[2px_0_2px_rgba(20,20,21,0.5)] transition-opacity desktop:flex group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                    {label}
                </span>
            )}
        </Link>
    )
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

    const mainMenus = [
        { name: '대시보드', path: '/dashboard', icon: <DashboardIcon /> },
        { name: '영상 리포트', path: '/reports', icon: <ReportIcon /> },
        { name: '트렌드 · 아이디어', path: '/ideas', icon: <IdeaIcon /> },
    ]

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity desktop:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-[200px] flex-col bg-bg-1 px-4 py-8 shadow-[2px_0_2px_0_rgba(20,20,21,0.5)] transition-[width,transform] duration-300 tablet:py-3 desktop:static desktop:z-20 desktop:h-screen desktop:translate-x-0 desktop:py-8 ${isDesktopCollapsed ? 'desktop:w-[72px]' : 'desktop:w-[192px]'} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    height: '100dvh',
                    maxHeight: 'min(100dvh, -webkit-fill-available)',
                }}
            >
                <div className={`custom-scrollbar flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto ${isDesktopCollapsed ? 'desktop:overflow-visible' : ''}`}>
                    <div className={`flex h-8 w-full shrink-0 items-center justify-between ${isDesktopCollapsed ? 'desktop:justify-center' : ''}`}>
                        <div className={`items-center font-bold ${isDesktopCollapsed ? 'flex desktop:hidden' : 'flex'}`}>
                            <LogoIcon className="size-8 shrink-0" />
                            <span className="-ml-[1.33px] text-[17.616px] tracking-tight text-primary-50">Chaneling</span>
                        </div>

                        {isDesktopCollapsed && (
                            <div className="group/logo relative hidden size-8 shrink-0 desktop:block">
                                <LogoIcon className="absolute inset-0 size-8 transition-opacity group-hover/logo:opacity-0 group-focus-within/logo:opacity-0" />
                                <button
                                    type="button"
                                    onClick={() => setIsDesktopCollapsed(false)}
                                    className="absolute inset-0 flex size-8 items-center justify-center text-icon-primary opacity-0 transition-opacity group-hover/logo:opacity-100 group-focus-within/logo:opacity-100"
                                    aria-label="사이드바 펼치기"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex size-8 items-center justify-center text-icon-primary desktop:hidden"
                            aria-label="사이드바 닫기"
                        >
                            <CloseIcon />
                        </button>

                        {!isDesktopCollapsed && (
                            <button
                                type="button"
                                onClick={() => setIsDesktopCollapsed(true)}
                                className="hidden size-6 items-center justify-center text-icon-primary desktop:flex"
                                aria-label="사이드바 접기"
                            >
                                <CloseIcon />
                            </button>
                        )}
                    </div>

                    <nav className="flex w-full shrink-0 flex-col gap-2" aria-label="주요 메뉴">
                        {mainMenus.map((menu) => (
                            <SidebarItem
                                key={menu.name}
                                href={menu.path}
                                icon={menu.icon}
                                isActive={pathname === menu.path || pathname?.startsWith(`${menu.path}/`)}
                                isDesktopCollapsed={isDesktopCollapsed}
                                label={menu.name}
                                onNavigate={onClose}
                            />
                        ))}
                    </nav>
                </div>

                <div className="mt-auto flex w-full shrink-0 flex-col gap-2">
                    <SidebarItem
                        href="/feedback"
                        icon={<FeedbackIcon className="size-[18px]" />}
                        isActive={pathname === '/feedback'}
                        isDesktopCollapsed={isDesktopCollapsed}
                        label="피드백 보내기"
                        onNavigate={onClose}
                    />
                    <div
                        className={`group/profile relative flex w-full flex-col gap-2 rounded-lg p-2 transition-colors hover:bg-bg-2 ${pathname === '/settings' ? 'bg-bg-2' : 'bg-transparent'} ${isDesktopCollapsed ? 'desktop:w-10' : ''}`}
                    >
                        <Link
                            href="/settings"
                            onClick={onClose}
                            aria-label="채널 설정"
                            className="flex w-full items-center gap-2"
                        >
                            <ProfileImage size={24} />
                            <span
                                className={`min-w-0 flex-1 ${isDesktopCollapsed ? 'desktop:hidden' : ''}`}
                            >
                                <span className="block truncate font-caption-12r text-text-secondary desktop:text-[14px]">
                                    Free
                                </span>
                                <span className="block truncate font-body-14m text-text-primary desktop:text-[16px]">
                                    채널이름
                                </span>
                            </span>
                        </Link>

                        <button
                            type="button"
                            className={`flex w-36 items-center justify-center rounded-sm bg-gray-30 px-0.5 py-2 font-body-14m text-text-primary transition-colors hover:bg-gray-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active desktop:text-[16px] ${isDesktopCollapsed ? 'desktop:hidden' : ''}`}
                        >
                            플랜 업그레이드
                        </button>

                        {isDesktopCollapsed && (
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-12 top-1/2 z-50 hidden h-10 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-bg-2 px-2 font-body-16m text-text-primary opacity-0 shadow-[2px_0_2px_rgba(20,20,21,0.5)] transition-opacity desktop:flex group-hover/profile:opacity-100 group-focus-within/profile:opacity-100"
                            >
                                채널이름
                            </span>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}
