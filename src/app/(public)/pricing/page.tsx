'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

type BillingCycle = 'monthly' | 'yearly'

interface PricingFeature {
    label: string
    value: string
}

interface PricingPlan {
    name: string
    description: string
    price: string
    unit?: string
    buttonLabel: string
    features: PricingFeature[]
    isCurrent?: boolean
    isRecommended?: boolean
}

const plans: PricingPlan[] = [
    {
        name: 'Free',
        description: '개인 사용자',
        price: '무료',
        buttonLabel: '현재 플랜',
        isCurrent: true,
        features: [
            { label: '영상 리포트', value: '월 2개' },
            { label: '아이디어 생성', value: '월 5회' },
            { label: '분석 수준', value: '기본 모델' },
            { label: '데이터 보관', value: '최근 30일' },
        ],
    },
    {
        name: 'Creator',
        description: '성장하는 크리에이터',
        price: '9,900원',
        unit: '/월',
        buttonLabel: 'Creator 선택',
        isRecommended: true,
        features: [
            { label: '영상 리포트', value: '월 10개' },
            { label: '아이디어 생성', value: '월 30회' },
            { label: '분석 수준', value: '심층 분석' },
            { label: '데이터 보관', value: '12개월' },
        ],
    },
    {
        name: 'Pro',
        description: '전문가',
        price: '29,900원',
        unit: '/월',
        buttonLabel: 'Pro 선택',
        features: [
            { label: '영상 리포트', value: '월 50개' },
            { label: '아이디어 생성', value: '월 150회' },
            { label: '분석 수준', value: '최고 모델' },
            { label: '데이터 보관', value: '무제한' },
            { label: '추가 기능', value: '이메일 리포트 & 실험 기능 얼리 엑세스' },
        ],
    },
]

function PricingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
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

function BillingTabs({
    selected,
    onSelect,
}: {
    selected: BillingCycle
    onSelect: (cycle: BillingCycle) => void
}) {
    return (
        <div className="flex w-full max-w-[328px] items-center rounded-[20px] bg-bg-1 p-1">
            <button
                type="button"
                aria-pressed={selected === 'monthly'}
                onClick={() => onSelect('monthly')}
                className={`flex h-10 min-w-0 flex-1 items-center justify-center rounded-2xl p-2 font-body-16sb transition-colors ${
                    selected === 'monthly' ? 'bg-bg-2 text-text-primary' : 'bg-bg-1 text-text-tertiary'
                }`}
            >
                월간
            </button>
            <button
                type="button"
                aria-pressed={selected === 'yearly'}
                onClick={() => onSelect('yearly')}
                className={`flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl p-2 font-body-16sb transition-colors ${
                    selected === 'yearly' ? 'bg-bg-2 text-text-primary' : 'bg-bg-1 text-text-tertiary'
                }`}
            >
                <span>연간</span>
                <span className="rounded-lg bg-primary-60/8 px-2 py-1 font-caption-14m text-text-brand">
                    20% 할인
                </span>
            </button>
        </div>
    )
}

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
    return (
        <article
            className={`relative flex min-h-[184px] w-full flex-col items-start gap-4 rounded-[20px] p-6 tablet:min-h-[343px] desktop:min-h-[326px] ${
                plan.isRecommended
                    ? 'border border-primary-60 bg-[linear-gradient(144deg,rgba(233,73,90,0.32)_6%,rgba(233,73,90,0.08)_94%)]'
                    : 'bg-bg-1'
            }`}
        >
            {plan.isRecommended && (
                <span className="absolute right-[19px] top-[19px] rounded-lg bg-primary-60 px-2 py-1 font-caption-14m text-text-primary">
                    추천
                </span>
            )}

            <div className="flex w-[128px] flex-col items-start gap-1">
                <h2 className="font-body-14m text-text-primary desktop:font-body-16m">{plan.name}</h2>
                <p className="font-caption-12r text-text-secondary desktop:font-caption-14r">
                    {plan.description}
                </p>
            </div>

            <div className="flex items-end">
                <p className="font-title-30r text-text-primary desktop:font-title-30r">{plan.price}</p>
                {plan.unit && <p className="pb-1 font-caption-12r text-text-secondary desktop:font-caption-14r">{plan.unit}</p>}
            </div>

            <button
                type="button"
                disabled={plan.isCurrent}
                className={`flex w-full items-center justify-center rounded-[10px] p-2 font-body-16sb transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active ${
                    plan.isCurrent
                        ? 'cursor-default border border-gray-40 bg-gray-30 text-text-tertiary'
                        : 'bg-primary-60 text-text-primary hover:bg-primary-50'
                }`}
            >
                {plan.buttonLabel}
            </button>

            <dl className="flex w-full flex-col gap-2 font-caption-12r desktop:font-caption-14r">
                {plan.features.map((feature) => (
                    <div key={`${plan.name}-${feature.label}`} className="flex w-full items-start justify-between gap-4">
                        <dt className="shrink-0 whitespace-nowrap text-text-secondary">{feature.label}</dt>
                        <dd className="min-w-0 text-right text-text-primary">{feature.value}</dd>
                    </div>
                ))}
            </dl>
        </article>
    )
}

function EnterpriseCard() {
    return (
        <article className="flex w-full items-center justify-between gap-4 rounded-[20px] bg-bg-1 p-6">
            <div className="flex min-w-0 flex-col gap-1">
                <h2 className="font-body-14m text-text-primary desktop:font-body-16m">Enterprise</h2>
                <p className="font-caption-12r text-text-secondary desktop:font-caption-14r">
                    규모에 맞는 엔터프라이즈급 지원
                </p>
            </div>
            <a
                href="https://open.kakao.com/o/sTPlNEvh"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-caption-12r text-text-brand underline underline-offset-2 desktop:font-caption-14r"
            >
                영업팀 문의하기
            </a>
        </article>
    )
}

export default function PricingPage() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

    return (
        <main
            className="flex min-h-screen flex-col bg-bg-0 text-text-primary"
            data-auth-state={isLoggedIn ? 'logged-in' : 'guest'}
        >
            <PricingHeader isLoggedIn={isLoggedIn} />

            <section className="flex w-full flex-1 flex-col items-center gap-8 px-4 pb-10 pt-4 tablet:px-4 desktop:px-16">
                <div className="flex w-full flex-col items-center gap-4">
                    <h2 className="font-title-20sb text-text-primary">플랜 업그레이드</h2>
                    <BillingTabs selected={billingCycle} onSelect={setBillingCycle} />
                </div>

                <div className="flex w-full max-w-[1312px] flex-col items-center gap-2">
                    <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-3">
                        {plans.map((plan) => (
                            <PricingPlanCard key={plan.name} plan={plan} />
                        ))}
                    </div>
                    <EnterpriseCard />
                    <p className="mt-2 font-caption-12r text-text-tertiary desktop:font-caption-14r">
                        플랜 변경 가능 · 첫 30일 환불 보장 · 부가세 별도
                    </p>
                </div>
            </section>
        </main>
    )
}
