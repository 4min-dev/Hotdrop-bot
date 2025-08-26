import React from 'react'
import styles from './Cases.module.scss'
import ICaseResponse from '../../../interfaces/ICaseResponse'

const ItemCard: React.FC<{ item: ICaseResponse, clickHandler: (params: any) => void }> = ({ item, clickHandler }) => {

    return (
        <div
            onClick={clickHandler}
            className={`flex column ${styles.itemCard}`}
            style={{
                'backgroundImage': `linear-gradient(180deg, #1D1D1D 0%, ${item.rarityPreviewBackground ? item.rarityPreviewBackground : item.rarityBackground} 100%)` || 'rgba(255, 255, 255, 0.05)',
                borderColor: item.rarityBorder
            }}
        >
            <div className={`flex align__center justify__space__between ${styles.itemAmountAndType}`}>
                <span className={styles.itemType}>{(item.itemType ? item.itemType : item.type ? item.type : item.model).replace(/_/g, ' ')}</span>
                <span className={styles.itemAmont}>{`${item.count} ШТ`}</span>
            </div>

            <div className={styles.itemPreview}>
                <img src={item.img_url} alt={item.title} />
            </div>

            <div className={`flex column ${styles.itemAboutContainer}`}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemRarity}>{item.rare?.replace(/_/g, ' ')}</span>
            </div>
        </div>
    )
}

export default ItemCard