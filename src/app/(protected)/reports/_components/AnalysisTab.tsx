import type { ReactNode } from 'react'

const TIME_LABELS = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30']

interface AnalysisItemProps {
    label: ReactNode
    children: ReactNode
}

interface ScoreBadgeProps {
    score: number
    status: string
    tone: 'danger' | 'neutral' | 'positive'
}

function RetentionGraph() {
    const linePath =
        'M 0 18 C 105 22 165 26 230 34 C 275 42 300 55 340 62 C 485 76 625 88 770 99 C 855 105 925 107 1000 109'
    const areaPath = `${linePath} L 1000 160 L 0 160 Z`

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden pt-4">
            <div className="min-w-[292px]">
                <svg
                    aria-label="영상 구간별 시청자 유지율 그래프"
                    className="h-40 w-full"
                    preserveAspectRatio="none"
                    role="img"
                    viewBox="0 0 1000 160"
                >
                    <defs>
                        <linearGradient id="retention-area-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#E9495A" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#DA1B2E" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <path d={areaPath} fill="url(#retention-area-gradient)" />
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#E9495A"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />

                    <line
                        stroke="#E9495A"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        x1="188"
                        x2="188"
                        y1="0"
                        y2="160"
                    />
                    <line
                        stroke="#E9495A"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        x1="288"
                        x2="288"
                        y1="0"
                        y2="160"
                    />
                </svg>

                <div className="flex items-start justify-between text-text-tertiary font-caption-12r">
                    {TIME_LABELS.map((label) => (
                        <span key={label} className="flex w-8 shrink-0 flex-col items-center">
                            <span aria-hidden className="h-2 w-px bg-border-default" />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function AnalysisItem({ label, children }: AnalysisItemProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-body-14m text-text-secondary">{label}</p>
            <div className="flex flex-col gap-2 font-body-14r text-text-primary">{children}</div>
        </div>
    )
}

function Bullet({ label, children, secondary = false }: { label?: string; children: ReactNode; secondary?: boolean }) {
    return (
        <p className={`flex gap-2 ${secondary ? 'pl-5 text-text-secondary' : ''}`}>
            <span aria-hidden className="shrink-0">
                •
            </span>
            <span>
                {label && <strong className="font-semibold">{label}: </strong>}
                {children}
            </span>
        </p>
    )
}

function Divider() {
    return <div className="h-px w-full bg-border-default" />
}

function ScoreBadge({ score, status, tone }: ScoreBadgeProps) {
    const toneClassName = {
        danger: 'bg-red-error-op8 text-red-error',
        neutral: 'bg-bg-2 text-text-secondary',
        positive: 'bg-green-op8 text-green',
    }[tone]

    return (
        <span className={`shrink-0 rounded-lg px-1 py-0.5 font-body-14r ${toneClassName}`}>
            <strong className="font-medium">{score}점</strong> / 10점 | {status}
        </span>
    )
}

export default function AnalysisTab() {
    return (
        <div className="-ml-0.5 flex w-[calc(100%+8px)] flex-col gap-8 pt-4 tablet:ml-0 tablet:w-full">
            <section className="flex flex-col gap-2" aria-labelledby="viewer-dropoff-title">
                <h2 id="viewer-dropoff-title" className="font-body-16sb text-text-primary">
                    시청자 이탈 분석
                </h2>

                <div className="flex flex-col gap-4 overflow-hidden rounded-[20px] bg-bg-1 p-5">
                    <div className="flex flex-col gap-1">
                        <p className="font-body-14m text-text-brand">0분 00초(00:00~00:00) 구간 이탈 요약</p>
                        <p className="font-body-14r text-text-secondary">
                            채널링이 분석한 가장 개선이 시급한 구간입니다.
                        </p>
                    </div>

                    <RetentionGraph />

                    <AnalysisItem label="1. 이탈 원인">
                        <Bullet label="예상 뷰어 수치">
                            해당 구간에서 시청자가 지루함을 느낄 수 있는 반복적인 내용이 30초 이상 지속됨
                        </Bullet>
                        <Bullet label="중복된 내용">
                            앞서 1분 15초에 언급했던 내용과 유사한 주장이 반복되어 정보값이 낮아짐
                        </Bullet>
                    </AnalysisItem>

                    <Divider />

                    <AnalysisItem label="2. 개선 방안">
                        <Bullet label="진행 속도 조절">
                            2분 6초부터 2분 30초까지의 부연 설명 구간을 컷편집하여 10초 이내로 단축
                        </Bullet>
                        <Bullet label="그래픽 활용">
                            설명이 길어지는 부분에 핵심 키워드 자막이나 자료 화면을 삽입하여 시각적 변화 주기
                        </Bullet>
                    </AnalysisItem>

                    <Divider />

                    <AnalysisItem label="3. 기대 효과">
                        <Bullet>
                            위 개선사항 적용 시, 해당 구간 이탈율을 약 40% 감소시킬 수 있으며, 전체 영상 평균 시청
                            시간을 1분 30초 이상 증가시킬 수 있을 것으로 예상됩니다.
                        </Bullet>
                    </AnalysisItem>
                </div>
            </section>

            <section className="flex flex-col gap-2" aria-labelledby="algorithm-optimization-title">
                <h2 id="algorithm-optimization-title" className="font-body-16sb text-text-primary">
                    알고리즘 최적화
                </h2>

                <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5">
                    <AnalysisItem
                        label={
                            <span className="flex items-center justify-between gap-2">
                                <span>1. 제목 관련</span>
                                <ScoreBadge score={3} status="개선 필요" tone="danger" />
                            </span>
                        }
                    >
                        <Bullet label="문제">제목이 너무 평범하고 클릭을 유도하는 요소 부족</Bullet>
                        <Bullet label="개선">감정적 트리거와 호기심을 자극하는 키워드 추가</Bullet>
                        <Bullet secondary>
                            예: “20대 혼자 사는 법 | 진짜 현실적인 월세 절약 팁 3가지” “직장인 브이로그 | 퇴근 후 이렇게
                            보내면 삶이 달라집니다”
                        </Bullet>
                    </AnalysisItem>

                    <Divider />

                    <AnalysisItem
                        label={
                            <span className="flex items-center justify-between gap-2">
                                <span>2. 설명란 관련</span>
                                <ScoreBadge score={5} status="보통" tone="neutral" />
                            </span>
                        }
                    >
                        <Bullet label="문제">타임스탬프와 구독 유도 문구 미흡</Bullet>
                        <Bullet label="개선">1~2줄 요약 + 타임스탬프 추가</Bullet>
                        <Bullet secondary>00:00 오늘의 주제 소개 / 00:45 팁 1 / 02:15 팁 2 / 03:40 팁 3</Bullet>
                        <Bullet secondary>콜투액션(“좋아요·구독”, “댓글로 여러분의 생활 팁도 공유해주세요!”)</Bullet>
                    </AnalysisItem>

                    <Divider />

                    <AnalysisItem
                        label={
                            <span className="flex items-center justify-between gap-2">
                                <span>3. 해시태그 관련</span>
                                <ScoreBadge score={8} status="좋음" tone="positive" />
                            </span>
                        }
                    >
                        <Bullet label="현재 상태">적절한 해시태그 사용 중</Bullet>
                        <Bullet label="추가 제안">#20대일상 #직장인브이로그 #혼자사는법 #생활팁 #일상루틴</Bullet>
                    </AnalysisItem>

                    <Divider />

                    <AnalysisItem label="4. 추가 제안">
                        <Bullet>챕터 타임스탬프 삽입</Bullet>
                        <Bullet>카드·엔드스크린(플레이리스트·구독 유도)</Bullet>
                        <Bullet>재생목록 섹션 생성(“거리 인터뷰 시리즈”)</Bullet>
                        <Bullet>자동 자막(.srt) 편집 → 접근성·SEO 강화</Bullet>
                        <Bullet>트랜스크립트 자동 분석 → 키워드 요약, 커뮤니티/블로그 활용</Bullet>
                    </AnalysisItem>
                </div>
            </section>
        </div>
    )
}
