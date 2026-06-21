import Link from 'next/link'

export default function DashboardFooter() {
    return (
        <footer className="flex w-full flex-col items-center gap-6 px-4 py-8 font-caption-12r text-text-tertiary tablet:hidden">
            <nav className="flex w-full items-center justify-center whitespace-nowrap">
                <Link href="/docs/terms" className="border-r border-border-default px-2">회사 소개</Link>
                <Link href="/docs/terms" className="border-r border-border-default px-2">서비스 이용약관</Link>
                <Link href="/docs/privacy" className="border-r border-border-default px-2">개인정보처리방침</Link>
                <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer" className="px-2">문의하기</a>
            </nav>
            <p>© 2025 Channeling. All rights reserved.</p>
        </footer>
    )
}
