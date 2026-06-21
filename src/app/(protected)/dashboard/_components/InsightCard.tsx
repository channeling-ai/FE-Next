interface InsightCardProps {
    description: string
    tags: string[]
    title: string
}

export default function InsightCard({ description, tags, title }: InsightCardProps) {
    return (
        <article className="flex w-full flex-col gap-2 rounded-[20px] bg-bg-1 p-5">
            <div className="flex items-center justify-between gap-4">
                <h3 className="min-w-0 truncate font-body-16sb text-text-primary desktop:text-[18px] desktop:leading-[1.5]">
                    {title}
                </h3>
                <span aria-hidden className="shrink-0 text-[28px] font-light leading-5 text-icon-secondary">
                    ›
                </span>
            </div>
            <p className="font-body-14r text-text-secondary desktop:font-body-16r">{description}</p>
            <div className="h-px w-full bg-border-default" />
            <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-primary-10 px-2 py-1 font-caption-12m text-text-brand desktop:font-body-14m">
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    )
}
