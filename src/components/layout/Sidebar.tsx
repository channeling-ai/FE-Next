'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import ReportIcon from '@/assets/icons/report.svg'
import IdeaIcon from '@/assets/icons/idea.svg'
import CloseIcon from '@/assets/icons/placeholder.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import LogoIcon from '@/assets/icons/logo.svg'
/**
 * 사이드바 (모바일 네비게이션 서랍)
 * 피그마: 610:7258 (SideBar/360)
 * 
 * 아직 버튼과 연결되지 않은 단독 컴포넌트입니다.
 */
interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()

    // 메뉴 데이터
    const mainMenus = [
        { name: '대시보드', path: '/dashboard', icon: <DashboardIcon /> },
        { name: '영상 리포트', path: '/reports', icon: <ReportIcon /> },
        { name: '트렌드 · 아이디어', path: '/ideas', icon: <IdeaIcon /> },
    ]

    return (
        <>
            {/* 오버레이 (배경 어둡게) - 추후 열고 닫기 구현 시 사용 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* 사이드바 패널 */}
            <aside
                className={`fixed top-0 left-0 w-[200px] h-screen bg-bg-1 shadow-[2px_0px_2px_0px_rgba(20,20,21,0.5)] z-50 flex flex-col px-4 pt-8 pb-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{
                    height: '100dvh',
                    maxHeight: 'min(100dvh, -webkit-fill-available)'
                }}
            >
                {/* 상단 섹션 (로고 + 메인 메뉴) - 메뉴가 많아져도 스크롤되도록 처리 */}
                <div className="flex flex-col gap-2 w-full flex-1 overflow-y-auto pb-4 custom-scrollbar min-h-0">
                    {/* 로고 & 닫기 버튼 */}
                    <div className="flex items-center justify-between w-full mb-2 shrink-0">
                        <div className="flex items-center font-bold">
                            {/* 로고 아이콘 원본 사이즈 32x32 반영 */}
                            <LogoIcon className="w-8 h-8 shrink-0" />
                            {/* 간격 정밀 조정 (text 레이어 x좌표 보정) */}
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

                {/* 하단 섹션 (피드백 + 유저 프로필) - 화면 하단에 항상 고정됨 */}
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

                    {/* 유저 프로필 (채널 이름) */}
                    <Link
                        href="/settings"
                        className="flex items-center gap-2 p-2 rounded-lg bg-transparent hover:bg-bg-2 transition-colors w-full"
                    >
                        {/* 임시 프로필 이미지 */}
                        <div className="w-6 h-6 rounded-full bg-gray-60 shrink-0" />
                        <span className="flex-1 font-body-14m tracking-[-0.025em] text-text-primary truncate">
                            채널이름
                        </span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

