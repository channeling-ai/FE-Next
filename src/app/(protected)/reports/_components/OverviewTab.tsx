import Comment from './comment'
import EvaluationCard from './evaluation-card'
import SummaryComment from './summary-comment'
import SummaryCard from './SummaryCard'

export default function OverviewTab() {
    return (
        <div className="flex flex-col pt-8 gap-8">
            <section id="report-summary" className="flex flex-col gap-2">
                <p className="font-body-18sb text-text-primary">리포트 요약</p>
                <SummaryCard
                    status="긍정"
                    summarytitle="진정성 있는 콘텐츠"
                    details="시청자들의 높은 공감을 이끌어냈으며, 특히 긍정 댓글 비율 60%를 기록했어요."
                />
                <SummaryCard
                    status="양호"
                    summarytitle="2분대 이탈 발생"
                    details="2분 6초~2분 55초 구간에서 이탈이 집중되고 있어요. 편집 템포 조절이 필요해요."
                />
                <SummaryCard
                    status="최적화 원활"
                    summarytitle="SEO 점수 65점"
                    details="제목과 해시태그 개선을 통해 검색 유입률을 더 높일 수 있어요."
                />
            </section>
            <section id="video-evaluation" className="flex flex-col gap-2">
                <p className="font-body-18sb text-text-primary">영상 평가</p>
                <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2">
                    <EvaluationCard type="view" score={120} average={900} />
                    <EvaluationCard type="likes" score={120} average={900} />
                    <EvaluationCard type="comments" score={120} average={900} />
                    <EvaluationCard type="concept-consistency" score={120} average={900} />
                    <EvaluationCard type="SEO" score={120} average={900} />
                    <EvaluationCard type="revisit-rate" score={120} average={900} />
                </div>
            </section>
            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-18sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 p-5 rounded-[20px] bg-bg-1">
                    <SummaryComment
                        timestamp="00:00"
                        comment="소제목소제목소제목소제목소제목소제목소제목소제목소제목소제목"
                        detail="캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다."
                    />
                    <SummaryComment timestamp="00:00" comment="소제목" detail="캡션입니다" />
                    <SummaryComment timestamp="00:00" comment="소제목" detail="캡션입니다" />
                </div>
            </section>
            <section id="comments" className="flex flex-col gap-2">
                <p className="font-body-18sb text-text-primary">댓글 반응</p>
                <div className="flex flex-col gap-8 p-5 rounded-[20px] bg-bg-1">
                    <div className="flex gap-6"></div>
                    <div className="flex flex-col">
                        <p className="font-body-14m text-text-secondary">주요 댓글</p>
                        <div className="flex flex-col gap-2">
                            <Comment
                                comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                profileImageUrl=""
                                nickname="닉네임"
                                time="n"
                            />
                            <div className="w-full bg-border-default h-px"></div>
                            <Comment
                                comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                profileImageUrl=""
                                nickname="닉네임"
                                time="n"
                            />
                            <div className="w-full bg-border-default h-px"></div>
                            <Comment
                                comment="영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!"
                                profileImageUrl=""
                                nickname="닉네임"
                                time="n"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
