'use client'

// TODO: 온보딩 모달 컴포넌트 import 예정
// import OnboardingModal from '@/components/OnboardingModal'

/**
 * 대시보드 페이지 (/dashboard)
 * - 전체 영상 요약 지표
 * - 최근 분석 리포트 현황
 * - 최초 로그인 시 온보딩 모달 표시
 */
export default function DashboardPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">대시보드</h1>
            <p className="text-gray-500 mt-2">전체 영상 요약 지표 및 최근 리포트 현황</p>
            {/* 온보딩 모달: 최초 로그인 사용자에게만 표시 */}
            {/* <OnboardingModal /> */}

            {/* TODO: 지표 카드 섹션 */}
            {/* TODO: 최근 리포트 목록 섹션 */}
        </main>
    )
}
