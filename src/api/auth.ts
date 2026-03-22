import { LOCAL_STORAGE_KEY } from '@/constants/key'

/**
 * Google 로그인 시작
 * 백엔드의 Google OAuth 엔드포인트로 직접 리다이렉트
 * 로그인 완료 후 백엔드가 /auth/callback?token=...&message=Success&channelId=...&isNew=... 로 넘겨줌
 */
export const redirectToGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_BASE_URL + '/members/login/google'
}

/**
 * 로그아웃
 * localStorage에서 토큰 및 관련 데이터 삭제
 */
export const logoutCore = () => {
    try {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
        localStorage.removeItem(LOCAL_STORAGE_KEY.channelId)
        localStorage.removeItem(LOCAL_STORAGE_KEY.isNew)
    } catch (e) {
        console.error('로그아웃 실패:', e)
    }
}

/**
 * localStorage에서 accessToken 조회
 */
export const getAccessToken = (): string | null => {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}
