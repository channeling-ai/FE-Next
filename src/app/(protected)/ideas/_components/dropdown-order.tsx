interface DropdownOrderProps {
    handleOptionValue: (e: React.MouseEvent<HTMLButtonElement>, option: string) => void
}

export default function DropdownOrder({ handleOptionValue }: DropdownOrderProps) {
    const dropdownOptions = ['최신순', '인기순', '날짜순']

    return (
        <div className="flex flex-col w-42 absolute -bottom-40 -left-20">
            {dropdownOptions.map((option) => {
                const baseStyle =
                    'flex flex-col justify-center items-start px-4 py-3 gap-2 bg-bg-2 hover:bg-bg-1 font-body-16m cursor-pointer'
                const conditionalStyle = 'first:rounded-t-[20px] last:rounded-b-[20px]'

                return (
                    <button
                        key={option}
                        type="button"
                        className={`${baseStyle} ${conditionalStyle}`}
                        onClick={(e) => handleOptionValue(e, option)}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
}
