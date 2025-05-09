import React, { useEffect, useState } from 'react'
import styles from './Store.module.scss'
import { IItemCard } from '../../../interfaces/IItemCard'
import getImage from '../../../assets/getImage'
import getBackgroundColor from '../../../assets/getBackgroundColor'
import rgbaToString from '../../../assets/rgbaToString'
import getBrightestColor from '../../../assets/getBrightestColor'
import ImagePreview from '../../UI/imagePreview/ImagePreview'

const StoreItemCard: React.FC<{ itemCard: IItemCard, clickHandler:(itemCard:IItemCard) => void }> = ({ itemCard , clickHandler}) => {
    const [dominantColor, setDominantColor] = useState<string>('')
    const [brightestColor, setBrightestColor] = useState<string>('')
    const [borderColor, setBorderColor] = useState<string>('')

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const imageUrl = getImage(itemCard.img)

                const dominant = await getBackgroundColor(imageUrl)

                setDominantColor(rgbaToString(dominant as any))
                setBrightestColor(rgbaToString(dominant as any))
                setBorderColor(getBrightestColor(dominant as any))
            } catch (error) {
                console.error('Ошибка при получении цветов:', error)
            }
        }

        fetchColors()
    }, [itemCard])

    const formatPriceWithSpans = (price: number) => {
        const formattedPrice = price.toLocaleString('ru-RU', { useGrouping: true })
    
        const normalizedPrice = formattedPrice.replace(/\s/g, ' ')
    
        const parts = normalizedPrice.split(' ')
    
        return parts.map((part, index) => (
            <span key={index} className={styles.pricePart}>
                {part}
            </span>
        ))
    }

    return (
        <div className={`flex align__center justify__space__between ${styles.itemCard}`}>
            <div className={`flex align__center ${styles.aboutItemCard}`}>
                <ImagePreview image={getImage(itemCard.img)} />

                <div className={`flex column ${styles.aboutItemTextContainer}`}>
                    <span className={styles.itemTitle}>{itemCard.title}</span>
                    <span className={`flex align__center justify__center ${styles.itemRarity}`} style={{ backgroundColor: itemCard.rarityBackground, boxShadow: itemCard.rarityShadow ? itemCard.rarityShadow : `0px 0px 13.4px 0px ${brightestColor}, 0px 4px 4.8px 0px ${dominantColor} inset` }}>{itemCard.rarity}</span>
                </div>
            </div>

            <button type='button' className={`flex align__center justify__space__between ${styles.purchaseItemButton}`} onClick={() => clickHandler(itemCard)}>
                <span className={styles.buttonText}>Купить</span>
                <div className={`flex align__end ${styles.itemPriceContainer}`}>
                    <span className={`flex align__center ${styles.itemPrice}`}>{formatPriceWithSpans(itemCard.price)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.56175 1.33344C7.5266 1.28633 7.48231 1.24679 7.43154 1.21718C7.38076 1.18756 7.32454 1.16848 7.26623 1.16108C7.20792 1.15367 7.14871 1.1581 7.09214 1.17408C7.03558 1.19006 6.98281 1.21728 6.937 1.25411C5.81907 2.15161 5.08166 3.43848 4.87258 4.85678C4.48944 4.57894 4.1536 4.24113 3.878 3.85636C3.84057 3.80404 3.79206 3.76061 3.73592 3.72918C3.67979 3.69775 3.61741 3.67909 3.55324 3.67452C3.48907 3.66995 3.42468 3.67959 3.36466 3.70275C3.30464 3.72592 3.25047 3.76203 3.206 3.80853C2.4356 4.61444 1.94177 5.64468 1.79603 6.75001C1.65029 7.85534 1.86022 8.97837 2.3954 9.95642C2.93058 10.9345 3.76322 11.7168 4.77272 12.19C5.78222 12.6631 6.91615 12.8027 8.01025 12.5884C9.10435 12.374 10.1018 11.817 10.8582 10.9978C11.6145 10.1787 12.0904 9.1401 12.217 8.03241C12.3436 6.92472 12.1143 5.80549 11.5623 4.83684C11.0103 3.8682 10.1642 3.10044 9.14667 2.64478C8.52116 2.34061 7.97767 1.89094 7.56175 1.33344ZM9.1875 8.31244C9.18728 8.62886 9.11842 8.94147 8.98567 9.22869C8.85292 9.51591 8.65944 9.77092 8.41857 9.97611C8.17771 10.1813 7.89519 10.3318 7.59052 10.4172C7.28585 10.5026 6.96628 10.5209 6.65384 10.4709C6.34141 10.4208 6.04356 10.3035 5.78084 10.1272C5.51812 9.95085 5.29679 9.7196 5.13211 9.44942C4.96743 9.17923 4.86333 8.87653 4.82698 8.56221C4.79064 8.24788 4.82291 7.92942 4.92158 7.62878C5.28792 7.90003 5.70908 8.10128 6.16583 8.21211C6.28967 7.4135 6.6865 6.68251 7.28875 6.14361C7.81434 6.2136 8.29662 6.47211 8.64588 6.87105C8.99514 7.27 9.18762 7.78222 9.1875 8.31244Z" fill="white" />
                    </svg>
                </div>
            </button>
        </div>
    )
}

export default StoreItemCard
