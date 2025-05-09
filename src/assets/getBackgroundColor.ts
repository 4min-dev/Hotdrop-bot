import { FastAverageColor } from 'fast-average-color'

const fac = new FastAverageColor()

export default function getBackgroundColor(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!imageUrl || typeof imageUrl !== 'string') {
            return reject('Некорректный URL изображения')
        }

        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = imageUrl

        let timeoutId: NodeJS.Timeout | null = null

        const timeoutDuration = 5000
        timeoutId = setTimeout(() => {
            img.onload = img.onerror = () => { }
            reject('Превышено время ожидания загрузки изображения')
        }, timeoutDuration)

        img.onload = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            try {
                fac.getColorAsync(img).then((color:any) => {
                    if (!color || !color.value) {
                        reject('Невозможно определить доминирующий цвет')
                        return
                    }
                    resolve(color.value)
                }).catch(() => {
                    reject('Ошибка при обработке изображения')
                })
            } catch (error) {
                reject('Не удалось получить цвет')
            }
        }

        img.onerror = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            reject('Ошибка загрузки изображения')
        }
    })
}