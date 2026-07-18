'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getMember } from '@/api/member'
import { clearAuthSession } from '@/lib/auth-session'
import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

export default function AuthInitializer() {
    const pathname = usePathname()
    const hasHydrated = useAuthStore((state) => state.hasHydrated)
    const isAuth = useAuthStore((state) => state.isAuth)
    const channelId = useAuthStore((state) => state.user?.channelId)
    const setUser = useAuthStore((state) => state.setUser)
    const lastValidatedToken = useRef<string | null>(null)

    useEffect(() => {
        void useAuthStore.persist.rehydrate()
    }, [])

    useEffect(() => {
        if (!hasHydrated || pathname === '/auth/callback') return

        const accessToken = authStorage.getAccessToken()
        if (!accessToken || !isAuth || !channelId) {
            clearAuthSession()
            return
        }

        let isCancelled = false

        const validateSession = async () => {
            try {
                const member = await getMember(channelId)
                if (!isCancelled) {
                    setUser(member)
                }
            } catch {
                if (!isCancelled) {
                    clearAuthSession()
                }
            }
        }

        void validateSession()

        return () => {
            isCancelled = true
        }
    }, [channelId, hasHydrated, isAuth, pathname, setUser])

    return null
}
