import tinycolor from 'tinycolor2'
import React, { useEffect, useState } from 'react'
import styles from './Cases.module.scss'
import { IItemCard } from '../../../interfaces/IItemCard'
import getImage from '../../../assets/getImage'
import getBackgroundColor from '../../../assets/getBackgroundColor'
import rgbaToString from '../../../assets/rgbaToString'
import getBrightestColor from '../../../assets/getBrightestColor'

function getGradientBackground(dominantColor: string): string {
    const baseColor = tinycolor(dominantColor)

    const hsl = baseColor.toHsl()

    if (hsl.s < 0.1) {
        return 'linear-gradient(180deg, #1D1D1D 0%, #4A4A4A 100%)';
    }

    const pastelHsl = { ...hsl, l: Math.min(hsl.l + 0.3, 1) }
    const brightHsl = { ...hsl, l: hsl.l }
    const darkHsl = { ...hsl, l: Math.max(hsl.l - 0.2, 0) }

    const pastelColor = tinycolor({ h: pastelHsl.h, s: pastelHsl.s, l: pastelHsl.l }).toHexString()
    const brightColor = tinycolor({ h: brightHsl.h, s: brightHsl.s, l: brightHsl.l }).toHexString()
    const darkColor = tinycolor({ h: darkHsl.h, s: darkHsl.s, l: darkHsl.l }).toHexString()

    return `linear-gradient(135deg, ${pastelColor} 0%, ${brightColor} 50%, ${darkColor} 100%)`
}

const ItemCard: React.FC<{ item: IItemCard, clickHandler: (params: any) => void }> = ({ item, clickHandler }) => {
    const [dominantColor, setDominantColor] = useState<string>('')
    const [brightestColor, setBrightestColor] = useState<string>('')
    const [borderColor, setBorderColor] = useState<string>('')
    const [gradientBackground, setGradientBackground] = useState<string>('')
    const [gradientBorder, setGradientBorder] = useState<string>('')

    useEffect(() => {
        if (item.rarityBorder) {
            setBorderColor(item.rarityBorder)
        } else {
            const fetchColors = async () => {
                try {
                    const imageUrl = getImage(item.img)

                    const dominant = await getBackgroundColor(imageUrl)

                    const dominantString = rgbaToString(dominant as any)
                    setDominantColor(dominantString)
                    setBrightestColor(getBrightestColor(dominant as any))
                    setBorderColor(getBrightestColor(dominant as any))

                    const gradient = getGradientBackground(dominantString)

                    setGradientBackground(gradient)
                    setGradientBorder(gradient)
                } catch (error) {
                    console.error('Ошибка при получении цветов:', error)
                }
            }

            fetchColors()
        }
    }, [item])

    return (
        <div
            onClick={clickHandler}
            className={`flex column ${styles.itemCard}`}
            style={{
                'backgroundImage': `linear-gradient(180deg, #1D1D1D 0%, ${item.rarityBackground} 100%)` || 'rgba(255, 255, 255, 0.05)',
                borderColor: borderColor
            }}
        >
            <div className={`flex align__center justify__space__between ${styles.itemAmountAndType}`}>
                <span className={styles.itemType}>{item.type}</span>
                <span className={styles.itemAmont}>{`${item.amount} ШТ`}</span>
            </div>

            <div className={styles.itemPreview}>
                <img src={getImage(item.img)} alt={item.title} />
            </div>

            <div className={`flex column ${styles.itemAboutContainer}`}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemRarity}>{item.rarity}</span>
            </div>
        </div>
    )
}

export default ItemCard