// 공통 API 응답 래퍼
// 백엔드 응답 포맷이 확정되면 이 구조에 맞게 수정
export interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
}

// 사용자
// 백엔드 API 명세 확정 시 필드 수정
export interface User {
    id: string
    email: string
    name: string
    profileImage?: string
    isOnboardingCompleted: boolean
}

// 도메인 타입은 백엔드 API 명세 확정 후 추가할 것
// (Report, Idea 등)
