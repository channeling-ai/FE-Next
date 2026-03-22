'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from '@/constants/key'
import { useAuthStore } from '@/stores/authStore'

/**
 * Google OAuth 콜백 페이지 (/auth/callback)
 *
 * 백엔드가 로그인 완료 후 이 페이지로 리다이렉트하며
 * 쿼리스트링으로 다음 값을 전달합니다:
 *   ?message=Success&token=JWT토큰&channelId=채널ID&isNew=true/false
 */
export default function AuthCallbackPage() {
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)
    const hasRun = useRef(false)

    useEffect(() => {
        // React StrictMode 이중 실행 방지
        if (hasRun.current) return
        hasRun.current = true

        const urlParams = new URLSearchParams(window.location.search)
        const message = urlParams.get('message')
        const accessToken = urlParams.get('token')
        const channelId = urlParams.get('channelId')
        const isNew = urlParams.get('isNew') === 'true'

        if (message === 'Success' && accessToken && channelId) {
            // localStorage에 토큰 및 채널 정보 저장
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(accessToken))
            localStorage.setItem(LOCAL_STORAGE_KEY.channelId, JSON.stringify(channelId))
            localStorage.setItem(LOCAL_STORAGE_KEY.isNew, JSON.stringify(isNew))

            // TODO: 필요 시 setUser(userInfo) 호출 (백엔드에서 유저 정보도 함께 주는 경우)

            router.replace('/dashboard')
        } else {
            alert('로그인 실패! 다시 시도해주세요.')
            router.replace('/')
        }
    }, [router, setUser])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>로그인 처리 중...</p>
        </div>
    )
}
