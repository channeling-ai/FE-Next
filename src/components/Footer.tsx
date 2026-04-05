'use client';

import Link from 'next/link';

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full desktop:left-18 desktop:w-[calc(100%-72px)] desktop:border-8 desktop:border-t-0 desktop:border-surface desktop:rounded-lg">
            <footer
                className="flex justify-center items-center py-8 desktop:rounded-lg font-footer-fixed"
                style={{
                    background: 'linear-gradient(180deg, rgba(45, 7, 9, 0.20) 0%, var(--primary-50, #2D0709) 50%)',
                }}
            >
                <div className="grid grid-cols-2 tablet:grid-cols-4 gap-y-4 gap-x-[56px] tablet:gap-x-[69px] text-center">
                    <Link href="/terms">회사 소개</Link>
                    <Link href="/privacy">서비스 이용약관</Link>

                    <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer">
                        개인정보처리방침
                    </a>
                    <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer">
                        문의하기
                    </a>
                </div>
            </footer>
        </div>
    );
};
