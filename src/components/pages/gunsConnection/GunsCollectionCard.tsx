import React, { useEffect, useState } from 'react';
import styles from './GunsCollection.module.scss';
import getImage from '../../../assets/getImage';
import getBackgroundColor from '../../../assets/getBackgroundColor';
import rgbaToString from '../../../assets/rgbaToString';
import getBrightestColor from '../../../assets/getBrightestColor';
import { IItemCard } from '../../../interfaces/IItemCard';
import tinycolor from 'tinycolor2';

function getGradientBackground(dominantColor: string): string {
    const baseColor = tinycolor(dominantColor)

    const pastelColor = baseColor.brighten(30).saturate(10).toHexString()
    const brightColor = baseColor.saturate(50).toHexString()
    const darkColor = baseColor.darken(30).desaturate(10).toHexString()

    return `linear-gradient(135deg, ${pastelColor} 0%, ${brightColor} 50%, ${darkColor} 100%)`
}

type TGunsCollectionCard = { 
    itemCard: IItemCard, 
    handleSelectItem:(selectedItem:IItemCard) => void }

const GunsCollectionCard: React.FC<TGunsCollectionCard> = ({ itemCard, handleSelectItem }) => {
    const [dominantColor, setDominantColor] = useState<string>('')
    const [brightestColor, setBrightestColor] = useState<string>('')
    const [borderColor, setBorderColor] = useState<string>('')
    const [gradientBackground, setGradientBackground] = useState<string>('')
    const [gradientBorder, setGradientBorder] = useState<string>('')

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const imageUrl = getImage(itemCard.img)

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
        };

        fetchColors()
    }, [itemCard])

    return (
        <div
            className={`flex align__center justify__center ${styles.gunsConnectionCard}`}
            style={{
                '--gradient-border': itemCard.rarityBorder || 'rgba(255, 255, 255, 0.05)'
            }}
            onClick={() => itemCard.img ? handleSelectItem(itemCard) : null}
        >
            {itemCard.img && (
                <div className={styles.gunsConnectionCardPreview}>
                    <img src={getImage(itemCard.img)} alt="Предмет" style={{
                        filter: `drop-shadow(0 0 14px ${itemCard.rarityShadow})`
                    }} />
                </div>
            )}
        </div>
    )
}

export default GunsCollectionCard