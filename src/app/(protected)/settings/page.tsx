'use client'

import { useState } from 'react'
import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import ActionRow from './_components/ActionRow'
import EditableTextField from './_components/EditableTextField'
import NotificationRow from './_components/NotificationRow'
import ProfileField from './_components/ProfileField'
import SectionDivider from './_components/SectionDivider'
import SettingHeader from './_components/SettingHeader'
import SettingsProfileImage from './_components/SettingsProfileImage'

const channel = {
    name: 'LeoJ Makeup',
    email: 'LeoJMakeup@gmail.com',
    loginId: 'kjh21351324390',
}

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState({
        dailyRecommendation: false,
        marketing: true,
    })

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <SettingHeader />

            <Scroll as="main" className="flex-1">
                <section className="flex flex-col gap-8 pb-8">
                    <PageContent className="flex flex-col gap-[22px] pt-[17px] desktop:pt-0">
                        <SettingsProfileImage channelName={channel.name} />

                        <div className="flex w-full flex-col gap-2">
                            <ProfileField label="채널명" value={channel.name} />
                            <ProfileField label="이메일" value={channel.email} />
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <EditableTextField
                                label="채널 타겟층"
                                maxLength={50}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 타겟층을 입력해주세요"
                                fullWidth
                                inputClassName="h-[88px] desktop:h-[100px]"
                                labelClassName="desktop:font-body-14m"
                                textareaClassName="desktop:font-body-16r"
                            />
                            <EditableTextField
                                label="채널 컨셉"
                                maxLength={150}
                                placeholder="더욱 최적화된 분석 및 제안을 위해 채널 컨셉을 입력해주세요"
                                heightVariant="large"
                                fullWidth
                                labelClassName="desktop:font-body-14m"
                                textareaClassName="desktop:font-body-16r"
                            />
                        </div>
                    </PageContent>

                    <SectionDivider />

                    <PageContent className="flex flex-col gap-2">
                        <p className="font-caption-12m text-text-secondary desktop:font-body-14m">
                            이메일 알림
                        </p>
                        <div className="flex w-full flex-col gap-4">
                            <NotificationRow
                                checked={emailNotifications.marketing}
                                title="마케팅 이메일 수신 동의"
                                description="이벤트 또는 혜택과 관련된 마케팅 이메일 수신을 받아요"
                                onChange={(checked) => {
                                    setEmailNotifications((current) => ({ ...current, marketing: checked }))
                                }}
                            />
                            <NotificationRow
                                checked={emailNotifications.dailyRecommendation}
                                title="일일 콘텐츠 추천 메일 수신"
                                description="프리미엄 요금제에서 제공되는 일일 콘텐츠를 추천 받아요"
                                onChange={(checked) => {
                                    setEmailNotifications((current) => ({ ...current, dailyRecommendation: checked }))
                                }}
                            />
                        </div>
                    </PageContent>

                    <SectionDivider />

                    <PageContent className="flex flex-col gap-4">
                        <ActionRow
                            label={`${channel.loginId}로 로그인 되어 있습니다`}
                            buttonLabel="로그아웃"
                        />
                        <ActionRow
                            label="계정 삭제하기"
                            buttonLabel="계정 삭제"
                            danger
                        />
                    </PageContent>
                </section>
            </Scroll>
        </div>
    )
}
