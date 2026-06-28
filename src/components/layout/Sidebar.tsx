'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import ReportIcon from '@/assets/icons/report.svg'
import IdeaIcon from '@/assets/icons/idea.svg'
import CloseIcon from '@/assets/icons/sidebar-close.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import LogoIcon from '@/assets/icons/logo.svg'
import ProfileImage from '@/components/ProfileImage'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()

    if (pathname === '/onboarding') return null

    const mainMenus = [
        { name: '대시보드', path: '/dashboard', icon: <DashboardIcon /> },
        { name: '영상 리포트', path: '/reports', icon: <ReportIcon /> },
        { name: '트렌드 · 아이디어', path: '/ideas', icon: <IdeaIcon /> },
    ]

    return (
        <>
            {/* 오버레이 (모바일에서만 작동) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 desktop:hidden transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* 사이드바 패널 */}
            <aside
                className={`fixed top-0 left-0 w-[200px] h-screen bg-bg-1 shadow-[2px_0px_2px_0px_rgba(20,20,21,0.5)] z-50 flex flex-col px-4 pt-8 pb-6 transition-transform duration-300 
                    desktop:static desktop:translate-x-0 desktop:z-0 desktop:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    height: '100dvh',
                    maxHeight: 'min(100dvh, -webkit-fill-available)'
                }}
            >
                <div className="flex flex-col gap-2 w-full flex-1 overflow-y-auto pb-4 custom-scrollbar min-h-0">
                    <div className="flex items-center justify-between w-full mb-2 shrink-0">
                        <div className="flex items-center font-bold">
                            <LogoIcon className="w-8 h-8 shrink-0" />
                            <span className="-ml-[1.33px] text-[17.616px] tracking-tight text-primary-50">Chaneling</span>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 text-icon-primary hover:text-text-primary transition-colors"
                            aria-label="사이드바 닫기"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* 메인 메뉴 리스트 */}
                    <nav className="flex flex-col gap-2 w-full shrink-0">
                        {mainMenus.map((menu) => {
                            const isActive = pathname === menu.path || pathname?.startsWith(menu.path + '/')
                            return (
                                <Link
                                    key={menu.name}
                                    href={menu.path}
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors w-full ${isActive
                                        ? 'bg-bg-2 text-text-primary'
                                        : 'bg-transparent text-text-secondary hover:bg-bg-2'
                                        }`}
                                >
                                    <div className="shrink-0 text-icon-primary w-6 h-6 flex items-center justify-center">
                                        {menu.icon}
                                    </div>
                                    <span className={`font-body-14m tracking-[-0.025em] ${isActive ? 'text-text-primary' : 'text-text-primary'}`}>
                                        {menu.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* 하단 섹션 (피드백 + 유저 프로필)*/}
                <div className="flex flex-col gap-2 w-full shrink-0 pt-4 border-t border-white/5 mt-auto">
                    {/* 피드백 */}
                    <Link
                        href="/feedback"
                        className="flex items-center gap-2 p-2 rounded-lg bg-transparent hover:bg-bg-2 transition-colors w-full"
                    >
                        <div className="shrink-0 text-icon-primary w-6 h-6 flex items-center justify-center">
                            <FeedbackIcon />
                        </div>
                        <span className="font-body-14m tracking-[-0.025em] text-text-primary">
                            피드백 보내기
                        </span>
                    </Link>

                    {/* 유저 프로필 */}
                    <Link
                        href="/settings"
                        className="flex items-center gap-2 p-2 rounded-lg bg-transparent hover:bg-bg-2 transition-colors w-full"
                    >
                        <ProfileImage size={24} />
                        <span className="flex-1 font-body-14m tracking-[-0.025em] text-text-primary truncate">
                            채널이름
                        </span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

