import { useRef, useState } from 'react'
import SavedIdeaCard from './saved-idea-card'
import SearchBar from './search-bar'
import IdeaDetailView from './idea-detail-view'
import DropdownOpen from '@/assets/icons/dropdown-open.svg'
import DropdownOrder from './dropdown-order'

export default function SavedIdea() {
    const [selectedIdea, setSelectedIdea] = useState<any | null>(null)
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
        setSelectedIdea(null)
    }

    if (selectedIdea) {
        return <IdeaDetailView onBack={handleClose} />
    }
    return (
        <div className="flex flex-col px-4 gap-2  justify-start w-full ">
            <h1 className="text-text-primary font-title-18sb">저장한 아이디어</h1>
            <div className="flex flex-col gap-4">
                <SearchBar />
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="text-text-primary font-body-14m">n</div>
                        <div className="text-text-secondary font-body-14m">개의 아이디어</div>
                    </div>
                    <div
                        className="flex gap-1 py-2 pl-4 pr-3 bg-bg-1 rounded-[20px] relative z-100"
                        onClick={handleDropdownClick}
                        ref={dropdownOrderRef}
                    >
                        {selectedOption == '' && <div className="font-body-14m text-text-primary">최신순</div>}
                        {selectedOption != '' && <div className="font-body-16m text-gray-900">{selectedOption}</div>}
                        {!isDropdownOpen && <DropdownOpen className="cursor-pointer rotate-180 text-text-secondary" />}
                        {isDropdownOpen && (
                            <>
                                <DropdownOpen className="cursor-pointer text-text-secondary" />

                                <DropdownOrder handleOptionValue={handleOrderOptionClick} />
                            </>
                        )}
                    </div>
                </div>
                <SavedIdeaCard onClick={() => setSelectedIdea(true)} />
            </div>
        </div>
    )
}
