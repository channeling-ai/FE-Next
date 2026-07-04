interface ProfileFieldProps {
    label: string
    value: string
}

export default function ProfileField({ label, value }: ProfileFieldProps) {
    return (
        <div className="flex w-full flex-col gap-0.5">
            <span className="font-caption-12m text-text-secondary desktop:font-body-14m">
                {label}
            </span>
            <span className="truncate font-body-16sb text-text-primary desktop:text-[18px] desktop:leading-[1.5]">
                {value}
            </span>
        </div>
    )
}
