'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

/**
 * Protected Layout
 * 로그인이 필요한 모든 페이지에 적용됩니다.
 * 미로그인 시 랜딩 페이지(/)로 리다이렉트합니다.
 */
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        }
    }, [isLoggedIn, router])

    if (!isLoggedIn) return null

    return <>{children}</>
}
