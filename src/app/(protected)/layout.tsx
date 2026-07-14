'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useLayoutStore } from '@/stores/layoutStore'
import Sidebar from '@/components/layout/Sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    const { isMobileSidebarOpen, closeSidebar } = useLayoutStore()

    /* 
    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        }
    }, [isLoggedIn, router])

    if (!isLoggedIn) return null
    */

    return (
        <div className="flex h-screen w-full bg-bg-0">
            <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />

            <div className="relative flex-1 flex flex-col min-w-0 ">{children}</div>
        </div>
    )
}
