import React from 'react';
import styles from './GunsConnection.module.scss';
import tinycolor from 'tinycolor2';
import ICaseResponse from '../../../interfaces/ICaseResponse';

function getGradientBackground(dominantColor: string): string {
    const baseColor = tinycolor(dominantColor)

    const pastelColor = baseColor.brighten(30).saturate(10).toHexString()
    const brightColor = baseColor.saturate(50).toHexString()
    const darkColor = baseColor.darken(30).desaturate(10).toHexString()

    return `linear-gradient(135deg, ${pastelColor} 0%, ${brightColor} 50%, ${darkColor} 100%)`
}

type TGunsConnectionCard = {
    isFromInventory: boolean,
    itemCard: ICaseResponse,
    isHidden: boolean | null,
    handleTouchStart: (touchedItem: ICaseResponse, event: React.TouchEvent<HTMLDivElement>, isFromInventory: boolean) => void,
    handleTouchEnd: (isFromInventory: boolean) => void,
    handleTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void,
    handleSelectItem: (selectedItem: ICaseResponse) => void
}

const GunsConnectionCard: React.FC<TGunsConnectionCard> = ({ itemCard, isHidden, handleSelectItem, handleTouchStart, handleTouchEnd, handleTouchMove, isFromInventory }) => {
    return (
        <div
            style={{
                '--gradient-border-image': (itemCard.rarityBorder && !isHidden) ? itemCard.rarityBorder : 'none'
            }}
            onClick={() => itemCard.img_url ? handleSelectItem(itemCard) : null}
            onTouchStart={(e) => handleTouchStart(itemCard, e, isFromInventory)}
            onTouchEnd={() => handleTouchEnd(isFromInventory)}
            onTouchMove={handleTouchMove}
            className={styles.gunsConnectionCardContent}
        >
            {itemCard.img_url && (
                <div className={styles.gunsConnectionCardPreview} style={{ 'display': isHidden ? 'none' : 'block' }}>
                    <img src={itemCard.img_url} alt="Предмет" style={{
                        filter: `drop-shadow(0 0 14px ${itemCard.rarityShadow})`
                    }} />
                </div>
            )}
        </div>
    )
}

export default GunsConnectionCard