interface TabProps {
    title: string
    onclick: () => void
    isActive: boolean
}

export default function Tab({ title, onclick, isActive }: TabProps) {
    return (
        <button
            className={`relative z-10 -mb-px font-body-16sb border-b-2 transition-colors duration-300 ease-in-out py-2 px-4 ${isActive ? 'text-text-brand border-text-brand' : 'border-transparent text-text-secondary'}`}
            onClick={onclick}
        >
            {title}
        </button>
    )
}
