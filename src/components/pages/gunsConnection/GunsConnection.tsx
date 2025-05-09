import React, { useState } from 'react'
import styles from './GunsCollection.module.scss'
import getImage from '../../../assets/getImage'
import { IItemCard } from '../../../interfaces/IItemCard'
import getFormattedNumber from '../../../assets/getFormattedNumber'
import GunsCollectionCard from './GunsCollectionCard'
import GunsSwiperCard from './GunsSwiperCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'

const GunsConnection = () => {

    const [items, setItems] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0AA8EC',
            rarityButton:'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityBorder: `linear-gradient(135.95deg, #0AA8EC 0.88%, #0978A7 46.7%, #094862 92.51%)`,
            popupRarityBorder:'#66D1FF',
            rarityShadow: '#21A9E3'
        },

        {
            id: 2,
            img: '',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0AA8EC',
            rarityButton:'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityBorder: `linear-gradient(135.95deg, #0AA8EC 0.88%, #0978A7 46.7%, #094862 92.51%)`,
            popupRarityBorder:'#66D1FF',
            rarityShadow: '#21A9E3'
        },

        {
            id: 3,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0AA8EC',
            rarityButton:'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityBorder: `linear-gradient(135.95deg, #0AA8EC 0.88%, #0978A7 46.7%, #094862 92.51%)`,
            popupRarityBorder:'#66D1FF',
            rarityShadow: '#21A9E3'
        },

        {
            id: 4,
            img: '',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0AA8EC',
            rarityButton:'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityBorder: `linear-gradient(135.95deg, #0AA8EC 0.88%, #0978A7 46.7%, #094862 92.51%)`,
            popupRarityBorder:'#66D1FF',
            rarityShadow: '#21A9E3'
        }
    ])

    const [swiperData, setSwiperData] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0978A7',
            rarityShadow: '#21A9E3'
        },

        {
            id: 2,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0978A7',
            rarityShadow: '#21A9E3'
        },

        {
            id: 3,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0978A7',
            rarityShadow: '#21A9E3'
        },

        {
            id: 4,
            img: 'scorpion.png',
            title: 'Scorpion',
            rarity: 'Restricted',
            amount: 13,
            hint: `Шанс выпадения скина редкости выше чем Restricted равен 13%`,
            price: 1230,
            type: 'gun',
            rarityBackground: '#0978A7',
            rarityShadow: '#21A9E3'
        }
    ])

    const [isSelectedPopupActive, setSelectedPopupActive] = useState(false)
    const [selectedItem, setSelectedItem] = useState<IItemCard | null>(null)

    function handleSelectItem(item: IItemCard) {
        setSelectedPopupActive(true)
        setSelectedItem(item)
    }

    function handleCloseSelectedItemPopup() {
        setSelectedPopupActive(false)
    }

    return (
        <div>
            <SelectedItemPopup isActive={isSelectedPopupActive} selectedItem={selectedItem!} closePopupHandler={handleCloseSelectedItemPopup} />
            <div className={`flex align__end ${styles.gunsConnectionTextContainer}`}>
                <span className={styles.gunsConnectionTitle}>Макс. редкость</span>
                <span className={styles.gunsConnectionDescription}>Restricted</span>
            </div>

            <div className={`flex flex__wrap ${styles.gunsConnectionCardsContainer}`}>
                {items && items.length > 0 ? Array(...items, ...items, ...items, ...items).map((item) => (
                    <GunsCollectionCard itemCard={item} handleSelectItem={handleSelectItem} />
                )) : <h3>Загрузка..</h3>}
            </div>

            <div className={`flex align__center ${styles.swiperWrapper}`}>
                {swiperData && swiperData.length > 0 ? Array(...swiperData, ...swiperData).map((swiperElement) => (
                    <GunsSwiperCard swiperElement={swiperElement} />
                )) : <h3>Загрузка..</h3>}
            </div>

            <div className={`flex align__center ${styles.uiButtons}`}>
                <button type='button' className={`flex align__center justify__space__between ${styles.sellItemButton}`}>
                    <span className={styles.buttonText}>Продать</span>
                    <div className={`flex align__center ${styles.sellItemPriceContainer}`}>
                        <span className={styles.buttontext}>{getFormattedNumber(1230)}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74769 0.244054C7.70082 0.178673 7.64177 0.123794 7.57407 0.0826933C7.50637 0.0415927 7.43141 0.0151136 7.35366 0.00483701C7.27591 -0.00543955 7.19697 0.000697173 7.12155 0.0228809C7.04613 0.0450646 6.97578 0.0828404 6.91469 0.133952C5.42412 1.37954 4.44091 3.16551 4.16214 5.13388C3.65128 4.74828 3.20349 4.27946 2.83603 3.74546C2.78612 3.67285 2.72144 3.61258 2.64659 3.56896C2.57175 3.52534 2.48858 3.49943 2.40302 3.49309C2.31746 3.48675 2.2316 3.50013 2.15158 3.53228C2.07155 3.56443 1.99932 3.61455 1.94003 3.67908C0.912836 4.79755 0.25439 6.22736 0.060072 7.76138C-0.134246 9.29541 0.145654 10.854 0.859228 12.2114C1.5728 13.5688 2.68299 14.6544 4.02899 15.3112C5.37498 15.9679 6.88689 16.1615 8.34569 15.8641C9.80449 15.5666 11.1344 14.7935 12.1429 13.6567C13.1513 12.5199 13.7859 11.0784 13.9547 9.54115C14.1235 8.00386 13.8177 6.45054 13.0817 5.10622C12.3457 3.76189 11.2176 2.69636 9.86091 2.06398C9.0269 1.64184 8.30225 1.01776 7.74769 0.244054ZM9.91535 9.9298C9.91506 10.3689 9.82325 10.8028 9.64625 11.2014C9.46925 11.6 9.21127 11.9539 8.89012 12.2387C8.56896 12.5235 8.19228 12.7323 7.78605 12.8509C7.37982 12.9694 6.95372 12.9948 6.53715 12.9254C6.12058 12.8559 5.72344 12.6931 5.37315 12.4484C5.02286 12.2036 4.72775 11.8827 4.50817 11.5077C4.2886 11.1328 4.1498 10.7127 4.10134 10.2764C4.05287 9.8402 4.09591 9.39822 4.22747 8.98098C4.71592 9.35743 5.27747 9.63673 5.88647 9.79055C6.05158 8.68221 6.58069 7.6677 7.38369 6.9198C8.08447 7.01694 8.72751 7.3757 9.19319 7.92938C9.65888 8.48305 9.91551 9.19393 9.91535 9.9298Z" fill="white" />
                        </svg>
                    </div>
                </button>

                <button type='button' className={`flex align__center justify__center ${styles.exportItemButton}`}>
                    <span className={styles.buttonText}>Забрать</span>
                </button>
                "
            </div>
        </div>
    )
}

export default GunsConnection
