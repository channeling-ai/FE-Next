import { useEffect, useRef, useState } from 'react'
import SavedIdeaCard from './saved-idea-card'
import SearchBar from './search-bar'
import IdeaDetailView from './idea-detail-view'
import Dropdown from '@/assets/icons/dropdown.svg'
import DropdownOrder from '../../../../components/dropdown-order'

export default function SavedIdea() {
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

    if (selectedIdea) {
        return <IdeaDetailView onBack={handleClose} />
    }

    return (
        <div className="flex flex-col gap-2 justify-start w-full  px-4 desktop:px-8">
            <h1 className="text-text-primary font-title-18sb">저장한 아이디어</h1>
            <div className="flex flex-col gap-4">
                <SearchBar />
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="text-text-primary font-body-14m">n</div>
                        <div className="text-text-secondary font-body-14m">개의 아이디어</div>
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
                <SavedIdeaCard onClick={() => setSelectedIdea(true)} />
            </div>
        </div>
    )
}
