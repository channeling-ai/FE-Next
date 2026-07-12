'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { clearAuthSession, requestLogout } from '@/api/auth'
import { useAuthStore } from '@/stores/authStore'

export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const clearUser = useAuthStore((state) => state.clearUser)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logout = useCallback(async () => {
        if (isLoggingOut) return
        setIsLoggingOut(true)

        try {
            await requestLogout()
        } finally {
            clearAuthSession()
            clearUser()
            queryClient.clear()
            router.replace('/')
            router.refresh()
            setIsLoggingOut(false)
        }
    }, [clearUser, isLoggingOut, queryClient, router])

    return { isLoggingOut, logout }
}
