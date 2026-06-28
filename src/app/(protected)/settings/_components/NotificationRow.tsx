'use client'

import Toggle from './Toggle'

interface NotificationRowProps {
    checked: boolean
    description: string
    onChange: (checked: boolean) => void
    title: string
}

export default function NotificationRow({ checked, description, onChange, title }: NotificationRowProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center justify-between gap-4">
                <h2 className="min-w-0 truncate font-body-16sb text-text-primary desktop:text-[18px] desktop:leading-[1.5]">
                    {title}
                </h2>
                <Toggle checked={checked} label={title} onChange={onChange} />
            </div>
            <p className="truncate font-caption-12r text-text-secondary desktop:font-body-14r">
                {description}
            </p>
        </div>
    )
}
