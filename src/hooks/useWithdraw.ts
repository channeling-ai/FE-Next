'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { clearAuthSession, requestWithdrawal } from '@/api/auth'

export function useWithdraw() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isWithdrawing, setIsWithdrawing] = useState(false)

    const withdraw = useCallback(async () => {
        if (isWithdrawing) return

        const shouldWithdraw = window.confirm(
            '계정을 삭제하시겠어요? 탈퇴 후 30일 이내에 복구할 수 있습니다.'
        )
        if (!shouldWithdraw) return

        setIsWithdrawing(true)

        try {
            await requestWithdrawal()
            clearAuthSession()
            queryClient.clear()
            router.replace('/')
            router.refresh()
        } catch (error) {
            console.error('회원 탈퇴 API 호출 실패:', error)
            window.alert('계정을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setIsWithdrawing(false)
        }
    }, [isWithdrawing, queryClient, router])

    return { isWithdrawing, withdraw }
}
