'use client'

import { useEffect, useRef, useState } from 'react'
import Tab from '../../ideas/_components/tab'
import SearchBar from './SearchBar'
import Chip from '@/components/Chip'
import VideoCard from './VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import Dropdown from '@/assets/icons/dropdown.svg'

export default function ReportList() {
    const [activeTab, setActiveTab] = useState<'myreport' | 'recommend'>('myreport')
    const [activeChip, setActiveChip] = useState<'all' | 'longform' | 'shortform'>('all')
    const [selectedIdea, setSelectedIdea] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleOrderOptionClick = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
        e.stopPropagation()
        setSelectedOption(option)
        handleDropdownClick()
    }

    const dropdownOrderRef = useRef<HTMLDivElement>(null)

    const [selectedOption, setSelectedOption] = useState('')
    const handleClose = () => {
        setSelectedIdea(false)
    }

    useEffect(() => {
        if (!isDropdownOpen) return
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownOrderRef.current && !dropdownOrderRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    return (
        <div className="px-16">
            <Tab title="내 리포트 내역" onClick={() => setActiveTab('myreport')} isActive={activeTab === 'myreport'} />
            <Tab title="추천 리포트" onClick={() => setActiveTab('recommend')} isActive={activeTab === 'recommend'} />

            {activeTab === 'myreport' && (
                <div className="flex flex-col pt-4 gap-4">
                    <SearchBar />
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <Chip title="전체" onClick={() => setActiveChip('all')} isActive={activeChip === 'all'} />
                            <Chip
                                title="롱폼"
                                onClick={() => setActiveChip('longform')}
                                isActive={activeChip === 'longform'}
                            />
                            <Chip
                                title="숏폼"
                                onClick={() => setActiveChip('shortform')}
                                isActive={activeChip === 'shortform'}
                            />
                        </div>

                        <div
                            className="flex items-center gap-1 py-2 pl-4 pr-3 bg-bg-1 rounded-[20px] cursor-pointer relative z-100"
                            onClick={handleDropdownClick}
                            ref={dropdownOrderRef}
                        >
                            {selectedOption == '' && <div className="font-body-14m text-text-primary">최신순</div>}
                            {selectedOption != '' && (
                                <div className="font-body-16m text-text-primary">{selectedOption}</div>
                            )}
                            {!isDropdownOpen && <Dropdown className="text-text-secondary" />}
                            {isDropdownOpen && (
                                <>
                                    <Dropdown className="scale-y-[-1] text-text-secondary" />

                                    <DropdownOrder handleOptionValue={handleOrderOptionClick} />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
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
            {activeTab === 'recommend' && (
                <div className="flex flex-col pt-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="font-title-20sb text-text-primary">나랑 비슷한 채널의 인기 영상</div>
                        <div className="font-body-16r text-text-secondary">
                            인기있는 유사 채널 리포트로 성공 전략을 벤치마킹하세요
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
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
                        <div className="font-title-20sb text-text-primary">내 분야 대형 채널의 최신 트렌드</div>
                        <div className="font-body-16r text-text-secondary">
                            카테고리 리더가 다루는 최신 주제로 시장의 흐름을 파악하고 기획에 참고해보세요
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
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
