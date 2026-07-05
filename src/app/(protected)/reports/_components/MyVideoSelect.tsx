import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'
import Back from '@/assets/icons/back.svg'
import { useState } from 'react'
import SearchBar from './SearchBar'
import VideoCard from './VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import Chip from '@/components/Chip'

interface MyVideoSelectProps {
    onBack: () => void
}

export default function MyVideoSelect({ onBack }: MyVideoSelectProps) {
    const [activeChip, setActiveChip] = useState<'all' | 'longform' | 'shortform'>('all')

    const [order, setOrder] = useState('최신순')
    return (
        <div className="fixed inset-y-0 px-16 left-0 right-0 desktop:left-[200px] z-30 flex flex-col gap-2 bg-bg-0 overflow-y-auto">
            <div className="sticky px-4 py-3 mt-1.75 flex flex-row justify-between">
                <div className="flex gap-2">
                    <button onClick={onBack} className="cursor-pointer flex items-center">
                        <Back />
                    </button>
                    <h1 className="text-text-primary font-title-18sb">내 영상 선택</h1>
                </div>
            </div>
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

                    <DropdownOrder onChange={setOrder} />
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
        </div>
    )
}
