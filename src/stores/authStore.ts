import { create } from 'zustand'
import type { User } from '@/types'

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    status: AuthStatus
    setUser: (user: User) => void
    setChecking: () => void
    clearUser: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isLoggedIn: false,
    status: 'checking',
    setUser: (user) => set({ user, isLoggedIn: true, status: 'authenticated' }),
    setChecking: () => set({ status: 'checking' }),
    clearUser: () => set({ user: null, isLoggedIn: false, status: 'unauthenticated' }),
}))
