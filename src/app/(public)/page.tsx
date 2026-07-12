'use client'

import { redirectToGoogleLogin } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'

export default function LandingPage() {
    const status = useAuthStore((state) => state.status)

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-bg-0 p-8">
            <div className="flex max-w-md flex-col items-center gap-3 text-center">
                <h1 className="font-title-30r text-text-primary">Chaneling</h1>
                <p className="font-body-16r text-text-secondary">
                    구글 계정으로 로그인하고 채널 분석을 시작하세요.
                </p>
            </div>
            <button
                type="button"
                onClick={redirectToGoogleLogin}
                disabled={status === 'checking'}
                className="rounded-[20px] bg-primary-60 px-5 py-2.5 font-body-16m text-text-primary transition-colors hover:bg-primary-70 disabled:cursor-not-allowed disabled:bg-bg-2 disabled:text-text-disabled"
            >
                {status === 'checking' ? '로그인 상태 확인 중...' : 'Google로 로그인'}
            </button>
        </main>
    )
}
