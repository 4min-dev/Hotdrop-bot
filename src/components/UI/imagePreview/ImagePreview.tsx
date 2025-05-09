import React, { useEffect, useState } from 'react'
import styles from './ImagePreview.module.scss'
import getBackgroundColor from '../../../assets/getBackgroundColor'

const ImagePreview: React.FC<{ image: string, backgroundEffectColor?:string }> = ({ image, backgroundEffectColor }) => {
    const [backgroundColor, setBackgroundColor] = useState<string>('')

    useEffect(() => {
        let isMounted = true

        const loadBackgroundColor = async () => {
            try {
                const color = await getBackgroundColor(image)
                if (isMounted) {
                    setBackgroundColor(color)
                }
            } catch (error) {
                console.error('Ошибка при получении доминирующего цвета:', error)
            }
        }

        if (image) {
            loadBackgroundColor()
        }

        return () => {
            isMounted = false
        }
    }, [image])


    return (
        <div
            className={styles.imagePreview}
            style={{ backgroundColor: `rgba(${backgroundColor})`, "--background-color":backgroundEffectColor }}
        >
            <img src={image} alt="Preview" />
        </div>
    )
}

export default ImagePreview