interface PricingHeaderProps {
    isLoggedIn: boolean
}

export default function PricingHeader({ isLoggedIn }: PricingHeaderProps) {
    return (
        <header
            className="flex w-full items-center justify-between bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5"
            data-auth-state={isLoggedIn ? 'logged-in' : 'guest'}
        >
            <h1 className="font-title-18sb text-text-primary desktop:font-title-20sb">구독 관리</h1>
            <button
                type="button"
                className="font-body-16m text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-active"
            >
                건너뛰기
            </button>
        </header>
    )
}
