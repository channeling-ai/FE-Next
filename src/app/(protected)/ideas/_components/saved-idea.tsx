import { useEffect, useRef, useState } from 'react'
import SavedIdeaCard from './saved-idea-card'
import SearchBar from './search-bar'
import IdeaDetailView from './idea-detail-view'
import Dropdown from '@/assets/icons/dropdown.svg'
import DropdownOrder from '@/components/dropdown-order'

export default function SavedIdea() {
    const [selectedIdea, setSelectedIdea] = useState<boolean>(false)
    const [order, setOrder] = useState('최신순')
    const handleClose = () => {
        setSelectedIdea(false)
    }

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
                    <DropdownOrder onChange={setOrder} />
                </div>
                <SavedIdeaCard onClick={() => setSelectedIdea(true)} />
            </div>
        </div>
    )
}
