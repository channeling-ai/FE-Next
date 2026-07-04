import { useState } from 'react'

interface ChipProps {
    title: string
    onClick: () => void
    isActive: boolean
}

export default function Chip({ title, onClick, isActive }: ChipProps) {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 rounded-full font-body-16m ${isActive ? `bg-gray-95 text-text-inverse` : `bg-bg-1 text-text-secondary cursor-pointer`}`}
        >
            {title}
        </div>
    )
}
