import { HTMLAttributes, ReactNode } from 'react';

interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function Scroll({ children, className = '', ...props }: ScrollProps) {
    return (
        <div 
            className={`overflow-y-auto custom-scrollbar ${className}`} 
            {...props}
        >
            {children}
        </div>
    );
}
