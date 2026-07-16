import { LOCAL_STORAGE_KEY } from '@/constants/key'

function getStoredValue<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
        const raw = window.localStorage.getItem(key)
        return raw ? JSON.parse(raw) as T : null
    } catch {
        return null
    }
}

function setStoredValue(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export const authStorage = {
    getAccessToken: () => getStoredValue<string>(LOCAL_STORAGE_KEY.accessToken),
    getChannelId: () => getStoredValue<string>(LOCAL_STORAGE_KEY.channelId),
    getIsNew: () => getStoredValue<boolean>(LOCAL_STORAGE_KEY.isNew),
    setSession: ({ accessToken, channelId, isNew }: { accessToken: string; channelId: string; isNew: boolean }) => {
        setStoredValue(LOCAL_STORAGE_KEY.accessToken, accessToken)
        setStoredValue(LOCAL_STORAGE_KEY.channelId, channelId)
        setStoredValue(LOCAL_STORAGE_KEY.isNew, isNew)
    },
    clear: () => {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
        window.localStorage.removeItem(LOCAL_STORAGE_KEY.channelId)
        window.localStorage.removeItem(LOCAL_STORAGE_KEY.isNew)
    },
}
