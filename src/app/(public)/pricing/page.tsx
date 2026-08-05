'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { subscribe, type SubscribeRequest } from '@/api/subscription'
import { useAuthStore } from '@/stores/authStore'
import BillingTabs from './_components/BillingTabs'
import EnterpriseCard from './_components/EnterpriseCard'
import PricingCardPaymentModal from './_components/PricingCardPaymentModal'
import PricingHeader from './_components/PricingHeader'
import PricingPlanChangeModal from './_components/PricingPlanChangeModal'
import PricingPlanCard from './_components/PricingPlanCard'
import PricingPaymentFailureModal from './_components/PricingPaymentFailureModal'
import { getCurrentPlan, getRecommendedPlan } from './pricingPlan'
import { plans } from './pricingPlans'
import type { BillingCycle, PlanName } from './types'

type PlanChangeModalVariant = 'downgrade' | 'upgrade'
type PaidPlanName = Exclude<PlanName, 'Free'>

const planPriority: Record<PlanName, number> = {
    Free: 0,
    Creator: 1,
    Pro: 2,
}

const subscriptionPlanId: Record<PaidPlanName, SubscribeRequest['planId']> = {
    Creator: 'BASIC',
    Pro: 'ENTERPRISE',
}

export default function PricingPage() {
    const queryClient = useQueryClient()
    const isLoggedIn = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
    const [planChangeModalVariant, setPlanChangeModalVariant] = useState<PlanChangeModalVariant | null>(null)
    const [pendingPlanChange, setPendingPlanChange] = useState<PlanName | null>(null)
    const [paymentPlan, setPaymentPlan] = useState<PaidPlanName | null>(null)
    const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
    const [isPaymentFailureOpen, setIsPaymentFailureOpen] = useState(false)
    const [locallyActivatedPlan, setLocallyActivatedPlan] = useState<PlanName | null>(null)
    const currentPlan = locallyActivatedPlan ?? getCurrentPlan(user, isLoggedIn)
    const recommendedPlan = getRecommendedPlan(currentPlan)

    const handleSelectPlan = (planName: PlanName) => {
        if (!isLoggedIn) return

        if (planName !== 'Free' && currentPlan === 'Free') {
            setPaymentPlan(planName)
            return
        }

        setPendingPlanChange(planName)
        setPlanChangeModalVariant(planPriority[planName] > planPriority[currentPlan] ? 'upgrade' : 'downgrade')
    }

    const closePlanChangeModal = () => {
        setPlanChangeModalVariant(null)
        setPendingPlanChange(null)
    }

    const handleConfirmPlanChange = () => {
        if (pendingPlanChange && pendingPlanChange !== 'Free') setPaymentPlan(pendingPlanChange)
        closePlanChangeModal()
    }

    const handlePaymentSubmit = async (request: SubscribeRequest) => {
        setIsPaymentSubmitting(true)

        try {
            const result = await subscribe(request)

            if (result.status === 'PAYMENT_FAILED' || result.status === 'SAVE_FAILED') {
                setIsPaymentFailureOpen(true)
                return false
            }

            if (result.status !== 'RESERVED' && paymentPlan) setLocallyActivatedPlan(paymentPlan)

            setPaymentPlan(null)
            void queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
            return true
        } catch {
            setIsPaymentFailureOpen(true)
            return false
        } finally {
            setIsPaymentSubmitting(false)
        }
    }

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
                            <PricingPlanCard
                                key={plan.name}
                                billingCycle={billingCycle}
                                currentPlan={currentPlan}
                                isLoggedIn={isLoggedIn}
                                isRecommended={recommendedPlan === plan.name}
                                onSelectPlan={handleSelectPlan}
                                plan={plan}
                            />
                        ))}
                    </div>
                    <EnterpriseCard />
                    <p className="mt-2 font-caption-12r text-text-tertiary desktop:font-caption-14r">
                        플랜 변경 가능 · 첫 30일 환불 보장 · 부가세 별도
                    </p>
                </div>
            </section>

            {planChangeModalVariant && (
                <PricingPlanChangeModal
                    isOpen
                    onClose={closePlanChangeModal}
                    onConfirm={handleConfirmPlanChange}
                    variant={planChangeModalVariant}
                />
            )}

            {paymentPlan && (
                <PricingCardPaymentModal
                    billingCycle={billingCycle}
                    isOpen
                    isSubmitting={isPaymentSubmitting}
                    onClose={() => {
                        if (!isPaymentSubmitting) setPaymentPlan(null)
                    }}
                    onSubmit={handlePaymentSubmit}
                    planName={paymentPlan}
                    planId={subscriptionPlanId[paymentPlan]}
                />
            )}

            <PricingPaymentFailureModal
                isOpen={isPaymentFailureOpen}
                onClose={() => setIsPaymentFailureOpen(false)}
            />
        </main>
    )
}
