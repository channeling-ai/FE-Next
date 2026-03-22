import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    setUser: (user: User) => void
    clearUser: () => void
    completeOnboarding: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            setUser: (user) => set({ user, isLoggedIn: true }),
            clearUser: () => set({ user: null, isLoggedIn: false }),
            completeOnboarding: () =>
                set((state) => ({
                    user: state.user ? { ...state.user, isOnboardingCompleted: true } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
)
