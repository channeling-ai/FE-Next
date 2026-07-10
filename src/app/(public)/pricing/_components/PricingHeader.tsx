'use client'

import { useRouter } from 'next/navigation'
import BackIcon from '@/assets/icons/back.svg'

interface PricingHeaderProps {
    isLoggedIn: boolean
}

export default function PricingHeader({ isLoggedIn }: PricingHeaderProps) {
    const router = useRouter()

    return (
        <header
            className="flex w-full items-center gap-2 bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5"
            data-auth-state={isLoggedIn ? 'logged-in' : 'guest'}
        >
            <button
                type="button"
                onClick={() => router.back()}
                aria-label="뒤로 가기"
                className="flex size-6 shrink-0 items-center justify-center text-icon-primary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-active"
            >
                <BackIcon />
            </button>
            <h1 className="font-title-18sb text-text-primary desktop:font-title-20sb">구독 관리</h1>
        </header>
    )
}
