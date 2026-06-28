import { Footer } from '@/components/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-bg-0">
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
        </div>
    )
}
