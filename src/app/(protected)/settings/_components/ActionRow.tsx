interface ActionRowProps {
    label: string
    buttonLabel: string
    danger?: boolean
}

export default function ActionRow({ label, buttonLabel, danger = false }: ActionRowProps) {
    return (
        <div className="flex w-full items-center justify-between gap-4">
            <p className="min-w-0 truncate font-body-14m text-text-primary">
                {label}
            </p>
            <button
                type="button"
                className={`shrink-0 rounded-[20px] border px-3 py-1.5 font-body-14m transition-colors ${danger
                    ? 'border-border-error text-border-error hover:bg-border-error/10'
                    : 'border-border-default text-text-primary hover:bg-bg-1'
                    }`}
            >
                {buttonLabel}
            </button>
        </div>
    )
}
