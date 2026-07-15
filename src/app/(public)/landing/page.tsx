'use client'

import { useState, useRef } from 'react'
import LogoIcon from '@/assets/icons/logo.svg'
import MenuIcon from '@/assets/icons/menu.svg'
import SearchIcon from '@/assets/icons/search.svg'
import CardSearchIcon from '@/assets/icons/card_search.svg'
import CardLightbulbIcon from '@/assets/icons/card_lightbulb.svg'
import CardCommentIcon from '@/assets/icons/card_comment.svg'
import { Footer } from '@/components/Footer'
import ArrowRightIcon from '@/assets/icons/arrow_right.svg'
import FaqArrowIcon from '@/assets/icons/faq_arrow.svg'
import GoogleIcon from '@/assets/icons/google.svg'
import Link from 'next/link'

// 헬퍼: 파일 크기 포맷
const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    if (mb >= 1) {
        return `${mb.toFixed(1)} MB`
    }
    const kb = bytes / 1024
    return `${kb.toFixed(1)} KB`
}

export default function LandingPage() {
    // 데모 체험용 상태
    const [videoLink, setVideoLink] = useState('')
    const [showReport, setShowReport] = useState(false)
    const [activeTab, setActiveTab] = useState<'overview' | 'analyze'>('overview')
    
    // FAQ 아코디언 상태
    const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
        0: false,
        1: false,
        2: false,
    })

    const reportRef = useRef<HTMLDivElement>(null)

    // 링크 제출 핸들러 (인터랙션)
    const handleDemoSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!videoLink.trim()) return
        
        setShowReport(true)
        // 리포트 영역으로 스무스 스크롤
        setTimeout(() => {
            reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    }

    const toggleFaq = (index: number) => {
        setFaqOpen(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const handleGoogleLogin = () => {
        alert('구글 소셜 로그인 플로우(준비 중)로 진입합니다.')
    }

    return (
        <div className="min-h-screen bg-gray-0 text-text-primary selection:bg-primary-60/30 flex flex-col font-pretendard overflow-x-hidden">
            {/* 메인 랜딩 영역 */}
            <main className="flex-1 w-full flex flex-col items-center">
                {/* 1. 히어로 섹션 */}
                <section className="relative w-full flex flex-col items-center justify-center pt-72 pb-16 px-6 text-center overflow-hidden bg-gradient-to-b from-gray-5 to-gray-0 border-b border-white/5">
                    {/* 은은한 배경 그라데이션 원 */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-60/5 blur-[120px] rounded-full pointer-events-none z-0" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* 최상단 소개 뱃지 */}
                        <div className="inline-flex items-center px-2 py-1 bg-white/8 border border-white/8 rounded-full mb-1">
                            <span className="font-body-16m text-text-primary">언제나 내-일처럼, 유튜브 AI 파트너 채널링</span>
                        </div>

                        {/* 메인 헤드라인 */}
                        <h1 className="font-title-30r tablet:text-[40px] desktop:text-[48px] font-normal text-text-primary tracking-tight mb-6 whitespace-pre-line">
                            유튜브 영상 분석부터 트렌드 파악,{' '}
                            <br className="hidden tablet:block" />
                            채널 전략까지
                        </h1>

                        {/* 구글 로그인 버튼 CTA */}
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-95 text-[#1F1F1F] font-body-16m rounded-[8px] transition-all cursor-pointer"
                        >
                            <GoogleIcon className="w-5 h-5" />
                            <span>구글 계정으로 로그인</span>
                        </button>
                    </div>
                </section>

                {/* 2. 유튜버 페인포인트 & 3대 핵심 가치 카드 */}
                <section className="w-full py-22 px-16 flex flex-col items-start">
                    <div className="mb-4">
                        <h2 className="font-title-20sb tablet:text-[20px] desktop:text-[22px] text-text-primary mb-1">
                            유튜버에게 필요한 건 더 많은 시간이 아닙니다
                        </h2>
                        <p className="font-body-14r desktop:text-[16px] text-text-secondary">
                            영상 하나 올리는 것도 벅찬데, 분석까지 직접?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-2 w-full">
                        {/* 카드 1 */}
                        <div className="h-fit bg-gray-10 rounded-[20px] w-full p-5 transition-all duration-300 flex flex-col gap-3">
                            <CardSearchIcon className="w-8 h-8" />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-title-18sb text-text-primary">내 영상이 왜 잘됐는지 모르겠어요</h3>
                                <p className="font-body-16r text-text-secondary">
                                    채널링은 어떤 요소가 성과를 만들었는지<br/>
                                    데이터로 짚어드려요
                                </p>
                            </div>
                        </div>

                        {/* 카드 2 */}
                        <div className="h-fit bg-gray-10 rounded-[20px] w-full p-5 transition-all duration-300 flex flex-col gap-3">
                            <CardLightbulbIcon className="w-8 h-8" />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-title-18sb text-text-primary">다음에 뭘 만들어야 할지 모르겠어요</h3>
                                <p className="font-body-16r text-text-secondary">
                                    채널링은 지금 뜨는 키워드 기반으로<br/>
                                    채널에 맞는 아이디어를 제안해요
                                </p>
                            </div>
                        </div>

                        {/* 카드 3 */}
                        <div className="h-fit bg-gray-10 rounded-[20px] w-full p-5 transition-all duration-300 flex flex-col gap-3">
                            <CardCommentIcon className="w-8 h-8" />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-title-18sb text-text-primary">댓글을 다 읽을 시간이 없어요</h3>
                                <p className="font-body-16r text-text-secondary">
                                    수백 개의 댓글 속 진짜 반응은 무엇인지,<br/>
                                    채널링 AI가 감정과 키워드를 분류해 핵심만 전달해요
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. 데모 체험 입력창 섹션 */}
                <section className="w-full mt-8 flex flex-col px-16">
                    <div className="mb-4">
                        <h2 className="font-title-20sb tablet:text-[20px] desktop:text-[22px] text-text-primary mb-1">
                            영상 리포트를 미리 체험해보세요
                        </h2>
                        <p className="font-body-14r desktop:text-[16px] text-text-secondary">
                            유튜브 영상 링크를 입력하시면<br/>
                            채널링 AI 영상 리포트를 미리 보여드립니다
                        </p>
                    </div>

                    <form onSubmit={handleDemoSubmit} className="flex gap-2 items-center w-full mt-2">
                        <div className="flex gap-2 items-center flex-1 bg-gray-10 rounded-[20px] px-4 py-3">
                            <CardSearchIcon className="w-6 h-6" />
                            <input
                                type="url"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                placeholder="영상 링크를 입력해주세요"
                                className="bg-transparent outline-none flex-1 text-text-primary font-body-16r desktop:text-[18px] placeholder-secondary w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-[51px] h-[51px] rounded-[20px] bg-gray-30 flex items-center justify-center text-text-secondary transition-colors cursor-pointer shrink-0"
                            aria-label="리포트 조회"
                        >
                            <ArrowRightIcon className="w-6 h-6" />
                        </button>
                    </form>
                </section>

                {/* 4. 리포트 예시 화면 (데모 결과) */}
                <section
                    ref={reportRef}
                    className="w-full pt-[17px] pb-1 px-16 flex flex-col transition-all duration-700 relative border-t-[1.5px] border-border-subtitle mt-[17px]"
                >
                    <div className="absolute left-1/2 -translate-x-1/2 -top-[13px] bg-gray-0 text-center font-body-16r text-text-secondary z-10 select-none">
                        리포트 예시
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col tablet:flex-row gap-4">
                            <div 
                                className="w-full tablet:w-[316px] h-[178px] rounded-[20px] shrink-0 relative overflow-hidden"
                                style={{
                                    backgroundImage: 'linear-gradient(45deg, #EAEAEA 25%, transparent 25%), linear-gradient(-45deg, #EAEAEA 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #EAEAEA 75%), linear-gradient(-45deg, transparent 75%, #EAEAEA 75%)',
                                    backgroundSize: '16px 16px',
                                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                                    backgroundColor: '#FFFFFF'
                                }}
                            />

                            <div className="flex flex-col gap-1">
                                <div className="inline-block self-start px-2 py-1 bg-gray-20 rounded-full">
                                    <span className="font-body-14m text-gray-95">Long-Form</span>
                                </div>
                                <h3 className="font-title-20sb text-text-primary">
                                    주말 아침 루틴 | 느긋한 브런치 만들기
                                </h3>
                                <div className="flex flex-col gap-1 font-body-16r text-text-secondary">
                                    <span>업데이트: 2025년 6월 21일 (오전 03:39)</span>
                                    <span className="flex items-center gap-1">
                                        <span>지혜로운 생활</span>
                                        <span>·</span>
                                        <span>5일 전</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 개요/분석 탭 */}
                        <div className="w-full bg-gray-5 rounded-[20px] p-1 flex">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex-1 py-2 text-center rounded-[16px] text-center font-title-18sb transition-all cursor-pointer ${
                                    activeTab === 'overview'
                                        ? 'bg-gray-20 text-text-primary'
                                        : 'text-text-tertiary hover:text-text-primary'
                                }`}
                            >
                                개요
                            </button>
                            <button
                                onClick={() => setActiveTab('analyze')}
                                className={`flex-1 py-2 text-center rounded-[16px] text-center font-title-18sb transition-all cursor-pointer ${
                                    activeTab === 'analyze'
                                        ? 'bg-gray-20 text-text-primary'
                                        : 'text-text-tertiary hover:text-text-primary'
                                }`}
                            >
                                분석
                            </button>
                        </div>

                        {/* 탭 내용 분기 */}
                        {activeTab === 'overview' ? (
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-16sb text-text-primary">리포트 요약</h4>
                                <div className="flex flex-col gap-2">
                                    {/* 요약 카드 1 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2">
                                        <div className="self-start px-1 py-0.5 bg-[#4ADE80]/8 text-[#4ADE80] font-body-14m rounded-[8px]">
                                            긍정
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">진정성 있는 콘텐츠</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            시청자들의 높은 공감을 이끌어냈으며, 특히 긍정 댓글 비율 60%를 기록했어요.
                                        </p>
                                    </div>

                                    {/* 요약 카드 2 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2">
                                        <div className="self-start px-1 py-0.5 bg-gray-20 text-text-secondary font-body-14m rounded-[8px]">
                                            양호
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">2분대 이탈 발생</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            2분 6초~2분 55초 구간에서 이탈이 집중되고 있어요. 편집 템포 조절이 필요해요.
                                        </p>
                                    </div>

                                    {/* 요약 카드 3 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2">
                                        <div className="self-start px-1 py-0.5 bg-[#4ADE80]/8 text-[#4ADE80] font-body-14m rounded-[8px]">
                                            최적화 원활
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">SEO 점수 65점</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            제목과 해시태그 개선을 통해 검색 유입률을 더 높일 수 있어요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <h4 className="font-body-16sb text-text-primary">심층 반응 분석</h4>
                                <div className="flex flex-col gap-4 bg-gray-5 rounded-[20px] p-6 border border-white/5">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-2">
                                        <span className="font-body-14sb text-text-primary">가장 높은 호감 키워드</span>
                                        <span className="font-body-14m text-primary-60">{`"힐링", "요리", "음악"`}</span>
                                    </div>
                                    <p className="font-body-14r text-text-secondary leading-relaxed whitespace-pre-line">
                                        {`시청자들은 요리하는 소리와 배경 음악의 조화에 큰 편안함을 느꼈다고 언급했습니다.\n특히 "힐링된다", "위로받는다"는 키워드가 감정 분석 상위권에 랭크되었습니다.`}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[13px] font-normal text-text-tertiary">
                                        <span>분석 댓글 수: 100개</span>
                                        <span>신뢰도: 매우 높음 (94%)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Link
                            href="/landing/report"
                            className="relative block w-full p-[2px] rounded-[20px] overflow-hidden cursor-pointer mt-2 group focus:outline-none"
                        >
                        <div 
                            className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite]"
                            style={{
                            background: 'conic-gradient(from 0deg, #141415 0%, #141415 70%, #DA1B2E 100%)',
                            filter: 'blur(3px)'
                            }}
                        />
                        
                        <div className="relative z-10 w-full py-3.5 bg-gray-10 hover:bg-gray-10/95 text-text-primary font-title-18sb rounded-[18px] transition-colors flex items-center justify-center">
                            실제 데이터로 정밀한 리포트 받기
                        </div>
                    </Link>
                </div>
                </section>

                {/* 5. 자주 묻는 질문 (FAQ) */}
                <section className="w-full py-30 px-16 flex flex-col">
                    <h2 className="font-title-20sb desktop:text-[22px] tablet:text-[24px] text-text-primary mb-4">
                        자주 묻는 질문
                    </h2>

                    <div className="w-full flex flex-col">
                        {/* 질문 1 */}
                        <div className="border-b border-border-default flex flex-col pt-6 gap-2">
                            <button
                                onClick={() => toggleFaq(0)}
                                className="w-full flex items-center justify-between text-left font-title-18sb text-text-primary cursor-pointer"
                            >
                                <span>채널링, 유튜브 스튜디오랑 뭐가 다른가요?</span>
                                <FaqArrowIcon className={`w-6 h-6 text-[#CBCACE] transform transition-transform duration-200 ${faqOpen[0] ? '' : 'rotate-180'}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${faqOpen[0] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="font-body-16r text-text-secondary pb-5">
                                    {`유튜브 스튜디오가 조회수·시청 시간 같은 로우 데이터를 보여주는 데 그친다면, 채널링은 그 데이터를 가공해 "다음 영상에서 무엇을 해야 하는지"를 구체적으로 알려줍니다. 채널 컨셉과 현재 트렌드를 결합한 실천 가능한 피드백을 리포트로 받을 수 있다는 점이 채널링만의 차별점입니다.`}
                                </p>
                            </div>
                        </div>

                        {/* 질문 2 */}
                        <div className="border-b border-border-default flex flex-col pt-5 gap-2">
                            <button
                                onClick={() => toggleFaq(1)}
                                className="w-full flex items-center justify-between text-left font-title-18sb text-text-primary cursor-pointer"
                            >
                                <span>초보 유튜버도  쉽게 사용할 수 있을까요?</span>
                                <FaqArrowIcon className={`w-6 h-6 text-[#CBCACE] transform transition-transform duration-200 ${faqOpen[1] ? '' : 'rotate-180'}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${faqOpen[1] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="font-body-16r text-text-secondary pb-5">
                                    {`네, 가능합니다. 채널링은 복잡한 그래프 대신 직관적인 대시보드와 서술형 리포트를 제공합니다. 시청자 이탈 구간, 개선 포인트 등을 쉬운 언어로 풀어내어 누구나 바로 채널 운영에 적용할 수 있습니다.`}
                                </p>
                            </div>
                        </div>

                        {/* 질문 3 */}
                        <div className="flex flex-col pt-5 gap-2">
                            <button
                                onClick={() => toggleFaq(2)}
                                className="w-full flex items-center justify-between text-left font-title-18sb text-text-primary cursor-pointer"
                            >
                                <span>실제 채널 성장에 도움이 될까요?</span>
                                <FaqArrowIcon className={`w-6 h-6 text-[#CBCACE] transform transition-transform duration-200 ${faqOpen[2] ? '' : 'rotate-180'}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${faqOpen[2] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="font-body-16r text-text-secondary">
                                    {`채널링은 성공 채널들의 패턴을 데이터 기반으로 분석해 인사이트를 도출합니다. 감이 아닌 가공된 지표를 바탕으로 채널의 장단점을 파악하고, 제안된 가이드를 따라 개선해 나간다면 보다 체계적인 성장을 기대할 수 있습니다.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CTA (무료 시작하기) */}
                <section className="w-full flex flex-col items-center text-center">
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-body-16m text-text-secondary">무료로 시작하세요!</span>
                        <h2 className="font-title-30r tablet:text-[40px] desktop:text-[48px] font-normal text-text-primary">
                            채널링은 여러분의 채널을<br/>
                            내 일처럼 바라볼 준비가 되어있어요
                        </h2>
                        
                        <div className="flex flex-col items-center gap-3 mt-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-95 text-[#1F1F1F] font-body-16m rounded-[8px] transition-all cursor-pointer"
                            >
                                <GoogleIcon className="w-5 h-5" />
                                <span>구글 계정으로 로그인</span>
                            </button>
                            <span className="font-body-14r text-text-secondary mb-22">유튜브 연동을 위해 구글 로그인만 지원합니다.</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* 하단 푸터 */}
            <Footer isFixed={false} />
        </div>
    )
}
