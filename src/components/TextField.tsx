'use client'

import { useState, useRef, useId } from 'react'

export interface TextFieldProps extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value' | 'maxLength'
> {
    value?: string
    onChange?: (value: string) => void
    label?: string
    maxLength?: number
    showCounter?: boolean // 카운터 표시 여부 (기본: true)
    placeholder?: string
    helperText?: string
    isError?: boolean
    errorMessage?: string
    className?: string
    sizeVariant?: 'mobile' | 'tablet' | 'desktop'
    heightVariant?: 'small' | 'large' // 높이 크기 분기 (기본: small: 88px, large: 151px)
}

export default function TextField({
    value: controlledValue,
    onChange,
    label,
    maxLength = 25,
    showCounter = true,
    placeholder,
    helperText,
    isError = false,
    errorMessage,
    className = '',
    sizeVariant = 'mobile',
    heightVariant = 'small',
    id: externalId,
    ...rest
}: TextFieldProps) {
    // 제어/비제어 호환
    const [internalValue, setInternalValue] = useState('')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const autoId = useId()
    const inputId = externalId ?? autoId

    const textLength = value.length
    const isActive = isFocused || textLength > 0
    const showPlaceholder = textLength === 0

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const next = e.target.value
        if (maxLength && next.length > maxLength) return // max length 차단
        if (!isControlled) setInternalValue(next)
        onChange?.(next)
    }

    const widthClass: Record<Required<TextFieldProps>['sizeVariant'], string> = {
        mobile: 'w-[328px]',
        tablet: 'w-[328px]', // 향후 수정
        desktop: 'w-[328px]', // 향후 수정
    }

    return (
        <div className={`flex flex-col gap-1 w-full`}>
            {/* 메인 Input 래퍼 */}
            <div
                className={[
                    `relative flex flex-col w-full px-4 py-3 bg-bg-1 rounded-[20px] ${className}`,
                    heightVariant === 'large' ? 'h-[151px]' : 'h-22 desktop:h-25', // variant에 따른 높이 분기
                    isFocused
                        ? 'shadow-[inset_0_0_0_1px_var(--color-border-active)]'
                        : isError
                          ? 'shadow-[inset_0_0_0_1px_var(--color-border-error)]'
                          : '',
                    'transition-colors duration-150 cursor-text',
                ].join(' ')}
                onClick={() => inputRef.current?.focus()}
            >
                {/* 라벨, 카운터 */}
                {(label || showCounter) && (
                    <div className="flex items-start justify-between shrink-0 mb-1">
                        {label ? (
                            <label
                                htmlFor={inputId}
                                className="font-caption-12m desktop:font-caption-14m text-text-secondary tracking-[-0.3px]"
                            >
                                {label}
                            </label>
                        ) : (
                            <div />
                        )}
                        {showCounter && (
                            <div className="flex items-center gap-0.5 font-caption-12r text-text-secondary tracking-[-0.3px]">
                                <span
                                    className={
                                        textLength === 0 ? 'text-text-secondary font-caption-12m' : 'text-text-primary'
                                    }
                                >
                                    {textLength}
                                </span>
                                <span>/</span>
                                <span>{maxLength}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 텍스트 컨텐츠 */}
                <div className="relative flex-1 flex flex-col justify-start">
                    {showPlaceholder && (
                        <div className="absolute inset-0 flex flex-col justify-start pointer-events-none text-text-secondary">
                            <p className="font-body-14r desktop:font-body-16r">{placeholder}</p>
                            {helperText && <p className="font-body-14r desktop:font-body-16r">{helperText}</p>}
                        </div>
                    )}

                    {/* 실제 입력 태그 */}
                    <textarea
                        ref={inputRef}
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        aria-placeholder={placeholder}
                        className={[
                            'absolute inset-0 w-full h-full bg-transparent outline-none m-0 p-0 resize-none',
                            heightVariant === 'large' ? 'overflow-y-auto custom-scrollbar pr-[4px]' : 'overflow-hidden',
                            'font-body-14r desktop:font-body-16r tracking-[-0.35px] text-text-primary caret-gray-90',
                            showPlaceholder ? 'text-transparent' : '',
                        ].join(' ')}
                        {...rest}
                    />
                </div>
            </div>

            {/* 에러 메시지 */}
            {isError && errorMessage && (
                <p className="px-[16px] text-[14px] leading-[1.5] tracking-[-0.35px] text-border-error" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
