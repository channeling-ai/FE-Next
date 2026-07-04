interface ReportDetailPageProps {
    params: Promise<{ id: string }>
}

/**
 * 상세 분석 리포트 페이지 (/reports/[id])
 * - 이탈률 그래프
 * - AI 구간 분석
 * - 개선 제안
 */
export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
    const { id } = await params

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">상세 분석 리포트</h1>
            <p className="text-gray-400 text-sm mt-1">리포트 ID: {id}</p>

            {/* TODO: 이탈률 그래프 섹션 */}
            {/* TODO: AI 구간 분석 섹션 */}
            {/* TODO: 개선 제안 섹션 */}
        </main>
    )
}
