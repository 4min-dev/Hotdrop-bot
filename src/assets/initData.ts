import getImage from './getImage'

interface TelegramUser {
    id: number,
    [key: string]: any
}

interface TelegramInitData {
    photo_url?: string,
    user?: TelegramUser
}

let initData: TelegramInitData | null = null

console.log(window.Telegram?.WebApp)
console.log(window.Telegram.WebApp.initData)
console.log(window.Telegram.WebApp.initDataUnsafe)

try {
    const rawInitData = window.Telegram?.WebApp?.initData
    if (rawInitData) {
        const parsedData = JSON.parse(decodeURIComponent(rawInitData))
        initData = parsedData
    } else {
        console.error('Telegram.WebApp.initData не доступен')
    }
} catch (error) {
    console.error('Ошибка при получении initData:', error)
    initData = null
}

export function getUserAvatar() {
    if (window.Telegram.WebApp.initDataUnsafe.user?.photo_url) {
        return window.Telegram.WebApp.initDataUnsafe.user.photo_url
    } else {
        console.warn('Аватар пользователя недоступен или не установлен:')
        return getImage('avatar.png')
    }
}

export default {
    initData,
    getUserAvatar,
}