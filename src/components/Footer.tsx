import Link from 'next/link';

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full desktop:left-[72px] desktop:w-[calc(100%-72px)]">
            <footer className="flex flex-col justify-center items-center py-8 desktop:rounded-lg font-caption-12r text-text-tertiary">
                <div className="flex flex-wrap text-center">
                    <Link href="/docs/terms" className="px-4 border-r border-border-subtle last:border-none">
                        회사 소개
                    </Link>
                    <Link href="/docs/terms" className="px-4 border-r border-border-subtle last:border-none">
                        서비스 이용약관
                    </Link>
                    <Link href="/docs/privacy" className="px-4 border-r border-border-subtle last:border-none">
                        개인정보 처리방침
                    </Link>
                    <a
                        href="https://open.kakao.com/o/sTPlNEvh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 border-r border-border-subtle last:border-none"
                    >
                        문의하기
                    </a>
                </div>
                <div className="mt-6 font-caption-12r">© 2025 Chaneling. All rights reserved.</div>
            </footer>
        </div>
    );
};
