'use client';

import { Modal } from '@/components/Modal';
import { useState } from 'react';
// Modal 컴포넌트 경로를 프로젝트 구조에 맞게 수정하세요.
// 예: import { Modal } from '@/components/common/Modal'

export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(true);

    // 모달을 열고 닫는 함수
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <main className="min-h-screen bg-bg-0 flex flex-col items-center justify-center p-8 gap-8">
            {/* 테스트용 실행 버튼 */}
            <button
                onClick={handleOpen}
                className="h-[48px] px-6 rounded-[12px] bg-color-primary-50 text-text-inverse font-body-16sb"
            >
                모달 열기 테스트
            </button>

            {/* 실제 모달 컴포넌트 적용 */}
            <Modal isOpen={isOpen} onClose={handleClose}>
                {/* 1. 헤더 영역 */}
                <Modal.Header
                    title="이탈 구간과 알고리즘 최적화 분석 중..."
                    caption="[해당 영상 제목] 리포트를 생성 중입니다."
                    showClose={true}
                    onClose={handleClose}
                />

                {/* 2. 프로그레스 바 (이미지 기준 약 40%) */}
                <Modal.ProgressBar progress={40} />

                {/* 3. 푸터 버튼 영역 */}
                <Modal.Footer>
                    {/* 이미지가 1개 버튼일 때와 2개 버튼일 때를 모두 테스트해보세요 */}

                    <Modal.Button onClick={() => console.log('리포트 이동')}>리포트 이동</Modal.Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
}
