'use client';

import { ReactNode } from 'react';
import XIcon from '@/assets/icons/X.svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

interface HeaderProps {
    title: string;
    caption?: string;
    showClose?: boolean;
    onClose?: () => void;
}

interface FooterProps {
    children: ReactNode;
}

interface ProgressBarProps {
    progress: number;
}

const ModalMain = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[296px] rounded-[20px] bg-gray-30 p-6 shadow-2xl text-white flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

const Header = ({
    title,
    caption,
    showClose,
    onClose,
}: {
    title: string;
    caption?: string;
    showClose?: boolean;
    onClose?: () => void;
}) => (
    <div className="relative w-full">
        <div className="flex justify-between items-start gap-1">
            <div className="flex flex-col gap-1">
                <h2 className="font-title-18sb leading-tight break-keep">{title}</h2>
                {caption && <p className="font-body-14m text-text-secondary break-all">{caption}</p>}
            </div>

            {showClose && onClose && (
                <button onClick={onClose} className="-mr-1 -mt-1">
                    <XIcon className="w-full h-full" />
                </button>
            )}
        </div>
    </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full h-1 bg-gray-0 rounded-full overflow-hidden">
        <div
            className="h-full bg-color-primary-60 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        />
    </div>
);

const Footer = ({ children }: { children: ReactNode }) => {
    return <div className="flex gap-2 w-full">{children}</div>;
};

export const ModalButton = ({
    children,
    variant = 'primary',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) => {
    const baseStyles =
        'flex-1 h-10 py-2 px-4 rounded-[10px] font-body-16sb flex items-center justify-center transition-colors';
    const variants = {
        primary: 'bg-primary-60 text-white font-body-16sb',
        outline: 'bg-gray-30 border border-gray-40 text-text-secondary',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

export const Modal = Object.assign(ModalMain, {
    Header,
    ProgressBar,
    Footer,
    Button: ModalButton,
});
