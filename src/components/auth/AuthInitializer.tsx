'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getMember } from '@/api/member'
import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

export default function AuthInitializer() {
    const pathname = usePathname()
    const initialized = useRef(false)
    const clearUser = useAuthStore((state) => state.clearUser)
    const setChecking = useAuthStore((state) => state.setChecking)
    const setUser = useAuthStore((state) => state.setUser)

    useEffect(() => {
        if (initialized.current || pathname === '/auth/callback') return
        initialized.current = true

        const initialize = async () => {
            const accessToken = authStorage.getAccessToken()
            const channelId = Number(authStorage.getChannelId())

            if (!accessToken || !Number.isFinite(channelId) || channelId <= 0) {
                authStorage.clear()
                clearUser()
                return
            }

            setChecking()

            try {
                const member = await getMember(channelId)
                setUser(member)
            } catch {
                authStorage.clear()
                clearUser()
            }
        }

        void initialize()
    }, [clearUser, pathname, setChecking, setUser])

    return null
}
