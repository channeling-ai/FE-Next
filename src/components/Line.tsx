interface LineProps {
    variant: 'thin' | 'medium' | 'thick';
}

export default function Line({ variant }: LineProps) {
    const heightClass = variant === 'thin' ? 'h-[1px]' : variant === 'medium' ? 'h-2' : 'h-4';

    const bgClass = variant === 'thick' ? 'bg-[#020202]' : 'bg-border-subtle';

    const layoutClass = variant === 'thick' ? 'w-full self-stretch' : 'w-[328px]';

    return <div className={`${heightClass} ${bgClass} ${layoutClass}`} />;
}
