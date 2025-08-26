import React, { useEffect } from 'react'
import styles from './GunsConnection.module.scss'
import ICaseResponse from '../../../interfaces/ICaseResponse'

const GunsSwiperCard: React.FC<{ swiperElement: ICaseResponse, handleTouchStart: (touchedItem: ICaseResponse, event: React.TouchEvent<HTMLDivElement>, isFromInventory: boolean) => void, handleTouchEnd: (isFromInventory: boolean) => void, handleTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void, isFromInventory: boolean }> = ({ swiperElement, handleTouchStart, handleTouchEnd, handleTouchMove, isFromInventory }) => {
    return (
        <div className={styles.swiperCard} style={{ '--background__swiper__card': swiperElement.rarityShadow }} onTouchStart={(event) => handleTouchStart(swiperElement, event, isFromInventory)} onTouchEnd={() => handleTouchEnd(isFromInventory)} onTouchMove={handleTouchMove}>
            <img src={swiperElement.img_url} alt='Предпросмотр элемента' />
        </div>
    )
}

export default GunsSwiperCard
