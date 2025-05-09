import React, { useEffect, useState } from 'react'
import styles from './GunsCollection.module.scss'
import getImage from '../../../assets/getImage'
import { IItemCard } from '../../../interfaces/IItemCard'
import getBackgroundColor from '../../../assets/getBackgroundColor'
import rgbaToString from '../../../assets/rgbaToString'
import getBrightestColor from '../../../assets/getBrightestColor'

const GunsSwiperCard: React.FC<{ swiperElement: IItemCard }> = ({ swiperElement }) => {

    const [dominantColor, setDominantColor] = useState<string>('');
    const [brightestColor, setBrightestColor] = useState<string>('');
    const [borderColor, setBorderColor] = useState<string>('');
    const [gradientBackground, setGradientBackground] = useState<string>('');
    const [gradientBorder, setGradientBorder] = useState<string>('')

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const imageUrl = getImage(swiperElement.img);

                const dominant = await getBackgroundColor(imageUrl);

                const dominantString = rgbaToString(dominant as any);
                setDominantColor(dominantString);
                setBrightestColor(getBrightestColor(dominant as any));
                setBorderColor(getBrightestColor(dominant as any));
            } catch (error) {
                console.error('Ошибка при получении цветов:', error);
            }
        };

        fetchColors();
    }, [swiperElement]);

    return (
        <div className={styles.swiperCard} style={{'--background__swiper__card': swiperElement.rarityShadow}}>
            <img src={getImage(swiperElement.img)} alt='Предпросмотр элемента'/>
        </div>
    )
}

export default GunsSwiperCard
