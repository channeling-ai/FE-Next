'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import ProfileImage from '@/components/ProfileImage'
import TextField from '@/components/TextField'
import { useLayoutStore } from '@/stores/layoutStore'

const channel = {
    name: 'LeoJ Makeup',
    email: 'LeoJMakeup@gmail.com',
    loginId: 'kjh21351324390',
}

function SettingHeader() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <header className="shrink-0 bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5">
            <div className="flex h-8 items-center gap-2">
                <button
                    type="button"
                    onClick={openSidebar}
                    className="-ml-1 flex size-8 items-center justify-center text-icon-primary transition-colors hover:text-text-primary desktop:hidden"
                    aria-label="메뉴 열기"
                >
                    <MenuIcon />
                </button>
                <h1 className="font-title-18sb text-text-primary desktop:font-title-20sb">
                    설정
                </h1>
            </div>
        </header>
    )
}

interface ProfileFieldProps {
    label: string
    value: string
}

function ProfileField({ label, value }: ProfileFieldProps) {
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

function SettingsProfileImage() {
    const label = `${channel.name} 프로필 이미지`

    return (
        <>
            <ProfileImage size={80} aria-label={label} className="tablet:hidden" />
            <ProfileImage size={120} aria-label={label} className="hidden tablet:block desktop:hidden" />
            <ProfileImage size={193} aria-label={label} className="hidden desktop:block" />
        </>
    )
}

interface ToggleProps {
    checked?: boolean
    label: string
}

function Toggle({ checked = false, label }: ToggleProps) {
    const thumbPositionClass = checked ? 'left-[21.6px]' : 'left-[2.4px]'

    return (
        <button
            type="button"
            aria-pressed={checked}
            aria-label={label}
            className={`relative h-6 w-[43.2px] shrink-0 rounded-3xl transition-colors ${checked ? 'bg-primary-60' : 'bg-bg-2'}`}
        >
            <span
                className={`absolute top-[2.4px] size-[19.2px] rounded-full bg-gray-95 transition-[left] ${thumbPositionClass}`}
            />
        </button>
    )
}

interface NotificationRowProps {
    title: string
    description: string
    checked?: boolean
}

function NotificationRow({ title, description, checked = false }: NotificationRowProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center justify-between gap-4">
                <h2 className="min-w-0 truncate font-body-16sb text-text-primary desktop:text-[18px] desktop:leading-[1.5]">
                    {title}
                </h2>
                <Toggle checked={checked} label={title} />
            </div>
            <p className="truncate font-caption-12r text-text-secondary desktop:font-body-14r">
                {description}
            </p>
        </div>
    )
}

interface ActionRowProps {
    label: string
    buttonLabel: string
    danger?: boolean
}

function ActionRow({ label, buttonLabel, danger = false }: ActionRowProps) {
    return (
        <div className="flex w-full items-center justify-between gap-4">
            <p className="min-w-0 truncate font-body-14m text-text-primary desktop:font-body-16m">
                {label}
            </p>
            <button
                type="button"
                className={`shrink-0 rounded-[20px] border px-3 py-1.5 font-body-14m transition-colors desktop:font-body-16m ${danger
                    ? 'border-border-error text-border-error hover:bg-border-error/10'
                    : 'border-border-default text-text-primary hover:bg-bg-1'
                    }`}
            >
                {buttonLabel}
            </button>
        </div>
    )
}

function SectionDivider() {
    return <div className="h-4 w-full shrink-0 bg-[#020202]" />
}

export default function SettingsPage() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <SettingHeader />

            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <section className="flex flex-col gap-8 pb-8">
                    <div className="flex w-full flex-col gap-[22px] px-4 pt-[17px] tablet:px-5 desktop:px-16 desktop:pt-0">
                        <SettingsProfileImage />

                        <div className="flex w-full flex-col gap-2">
                            <ProfileField label="채널명" value={channel.name} />
                            <ProfileField label="이메일" value={channel.email} />
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <TextField
                                label="채널 타겟층"
                                maxLength={50}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 타겟층을 입력해주세요"
                                fullWidth
                                inputClassName="h-[88px] desktop:h-[100px]"
                                labelClassName="desktop:font-body-14m"
                                textareaClassName="desktop:font-body-16r"
                            />
                            <TextField
                                label="채널 컨셉"
                                maxLength={150}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 컨셉을 입력해주세요"
                                heightVariant="large"
                                fullWidth
                                labelClassName="desktop:font-body-14m"
                                textareaClassName="desktop:font-body-16r"
                            />
                        </div>
                    </div>

                    <SectionDivider />

                    <div className="flex w-full flex-col gap-2 px-4 tablet:px-5 desktop:px-16">
                        <p className="font-caption-12m text-text-secondary desktop:font-body-14m">
                            이메일 알림
                        </p>
                        <div className="flex w-full flex-col gap-4">
                            <NotificationRow
                                title="마케팅 이메일 수신 동의"
                                description="이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요"
                                checked
                            />
                            <NotificationRow
                                title="일일 콘텐츠 추천 메일 수신"
                                description="프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천 받아요"
                            />
                        </div>
                    </div>

                    <SectionDivider />

                    <div className="flex w-full flex-col gap-4 px-4 tablet:px-5 desktop:px-16">
                        <ActionRow
                            label={`${channel.loginId}로 로그인 되어 있습니다`}
                            buttonLabel="로그아웃"
                        />
                        <ActionRow
                            label="계정 삭제하기"
                            buttonLabel="계정 삭제"
                            danger
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
