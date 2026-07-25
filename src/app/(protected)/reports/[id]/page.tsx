import ReportDetailContent from './_components/ReportDetailContent'

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
    const reportId = Number(id)

    return <ReportDetailContent reportId={reportId} />
}
