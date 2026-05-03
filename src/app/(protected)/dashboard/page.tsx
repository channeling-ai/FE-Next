'use client'

import Header from '@/components/layout/Header'
import MenuIcon from '@/assets/icons/menu.svg'
import { useLayoutStore } from '@/stores/layoutStore'

// TODO: 온보딩 모달 컴포넌트 import 예정
// import OnboardingModal from '@/components/OnboardingModal'

/**
 * 대시보드 페이지 (/dashboard)
 * - 전체 영상 요약 지표
 * - 최근 분석 리포트 현황
 * - 최초 로그인 시 온보딩 모달 표시
 */
export default function DashboardPage() {
    const { openSidebar } = useLayoutStore()

    return (
        <div className="flex flex-col h-full w-full">
            <Header 
                title="대시보드" 
                leading={
                    <button 
                        onClick={openSidebar} 
                        className="desktop:hidden p-2 -ml-2 text-icon-primary hover:text-text-primary transition-colors"
                        aria-label="메뉴 열기"
                    >
                        <MenuIcon />
                    </button>
                }
            />
            <main className="flex-1 overflow-y-auto p-4 desktop:p-6 custom-scrollbar">
                {/* 임시 컨텐츠 내용 보존 */}
                <p className="text-text-secondary mt-2">전체 영상 요약 지표 및 최근 리포트 현황</p>
                {/* 온보딩 모달: 최초 로그인 사용자에게만 표시 */}
                {/* <OnboardingModal /> */}

                {/* TODO: 지표 카드 섹션 */}
                {/* TODO: 최근 리포트 목록 섹션 */}
            </main>
        </div>
    )
}
