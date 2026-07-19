'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Tab from '../../ideas/_components/Tab'
import SearchBar from './SearchBar'
import Chip from '@/components/Chip'
import VideoCard from './VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import ReportList from './ReportList'
import { useGetChannelReportList } from '@/hooks/useGetChannelReportList'
import { formatKoreanDate } from '@/utils/format'

type VideoType = 'ALL' | 'LONG' | 'SHORTS'
type OrderType = '최신순' | '인기순' | '날짜순'
type SortType = 'LATEST' | 'POPULAR' | 'DATE'

const sortMap: Record<OrderType, SortType> = {
    최신순: 'LATEST',
    인기순: 'POPULAR',
    날짜순: 'DATE',
}

export default function VideoReport() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'myreport' | 'recommend'>('myreport')
    const [activeChip, setActiveChip] = useState<VideoType>('ALL')
    const [isOpenReportList, setIsOpenReportList] = useState(false)

    const [order, setOrder] = useState<OrderType>('최신순')

    const { data, isLoading, error } = useGetChannelReportList({
        type: activeChip,
        page: 1,
        size: 8,
    })
    if (isOpenReportList) {
        return (
            <ReportList
                totalCount={9}
                onBack={() => setIsOpenReportList(false)}
                onCreate={() => router.push('/reports/period')}
            />
        )
    }
    return (
        <div>
            <Tab title="내 리포트 내역" onClick={() => setActiveTab('myreport')} isActive={activeTab === 'myreport'} />
            <Tab title="추천 리포트" onClick={() => setActiveTab('recommend')} isActive={activeTab === 'recommend'} />

            {activeTab === 'myreport' && (
                <div className="flex flex-col pt-4 gap-4">
                    <SearchBar />
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <Chip title="전체" onClick={() => setActiveChip('ALL')} isActive={activeChip === 'ALL'} />
                            <Chip title="롱폼" onClick={() => setActiveChip('LONG')} isActive={activeChip === 'LONG'} />
                            <Chip
                                title="숏폼"
                                onClick={() => setActiveChip('SHORTS')}
                                isActive={activeChip === 'SHORTS'}
                            />
                        </div>

                        <DropdownOrder onChange={(value) => setOrder(value as OrderType)} />
                    </div>
                    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2">
                        {isLoading && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                영상을 불러오는 중...
                            </div>
                        )}

                        {/* {error && (
                                                               <div className="col-span-full py-6 text-center font-body-14m text-red-error">
                                                                   영상 목록을 불러오지 못했습니다.
                                                               </div>
                                                           )} */}

                        {!isLoading && !error && data?.reportList.length === 0 && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                최근 영상이 없습니다.
                            </div>
                        )}

                        {!isLoading &&
                            !error &&
                            data?.reportList?.map((report) => (
                                <VideoCard
                                    key={report.videoId}
                                    title={report.videoTitle}
                                    leftside="리포트"
                                    leftsideamount={`개`}
                                    rightside="최근생성"
                                    rightsideamount={formatKoreanDate(report.updatedAt)}
                                    imageUrl={report.videoThumbnailUrl}
                                    onClick={() => router.push('/reports/period')}
                                />
                            ))}
                    </div>
                </div>
            )}
            {activeTab === 'recommend' && (
                <div className="flex flex-col pt-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="font-title-18sb text-text-primary">나랑 비슷한 채널의 인기 영상</div>
                        <div className="font-body-14r text-text-secondary">
                            인기있는 유사 채널 리포트로 성공 전략을 벤치마킹하세요
                        </div>
                    </div>

                    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2">
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="font-title-18sb text-text-primary">내 분야 대형 채널의 최신 트렌드</div>
                        <div className="font-body-14r text-text-secondary">
                            카테고리 리더가 다루는 최신 주제로 시장의 흐름을 파악하고 기획에 참고해보세요
                        </div>
                    </div>

                    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2">
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                        <VideoCard
                            title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                            leftside="조회수"
                            rightside="17만회"
                            period="3년 전"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
