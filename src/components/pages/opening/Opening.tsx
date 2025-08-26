import React, { useState, useEffect, useMemo } from 'react'
import styles from './Opening.module.scss'
import { useParams } from 'react-router-dom'
import { useGetCaseQuery, useOpenCaseMutation } from '../../../redux/services/caseService'
import ICaseWeapon from '../../../interfaces/ICaseWeapon'
import getRarityStyles from '../../../assets/getRarityStyles'
import { useGetInventoryQuery } from '../../../redux/services/userService'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'
import { useSellWeaponMutation } from '../../../redux/services/weaponService'
import { useNotification } from '../../../providers/notification/NotificationProvider'
import { rarityOrder } from '../../../assets/rarityOrder'

const Opening: React.FC = () => {
    const { id } = useParams()

    const { addNotification } = useNotification()

    const [fetchToSellItem] = useSellWeaponMutation()
    const [fetchToOpenCase, { data: winningItem }] = useOpenCaseMutation()
    const { data: userInventoryData, refetch: refetchUserInventoryData } = useGetInventoryQuery()
    const { data: caseData } = useGetCaseQuery(String(id))
    const [isWinningItem, setIsWinningItem] = useState<boolean>(false)
    const [avaliableKeys, setAvaliableKeys] = useState<number | null>(null)
    const [itemsData, setItemsData] = useState<ICaseWeapon[]>([])
    const [extendedItems, setExtendedItems] = useState<ICaseWeapon[]>([])
    const [translateValue, setTranslateValue] = useState<number>(0)
    const [isScrolling, setIsScrolling] = useState<boolean>(false)
    const [isSellFetching, setIsSellFetching] = useState<boolean>(false)

    const shuffleArray = (array: ICaseWeapon[]): ICaseWeapon[] => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }
        return shuffled
    }

    useEffect(() => {
        if (!caseData) return
        const shuffledWeapons = shuffleArray(caseData.weapons)

        const sortedWeapons = [...caseData.weapons].sort((a, b) => {
            const indexA = rarityOrder.indexOf(a.rare)
            const indexB = rarityOrder.indexOf(b.rare)
            return indexA - indexB
        })

        setItemsData(sortedWeapons)
        setExtendedItems(Array.from({ length: 400 }, (_, i) => ({ ...shuffledWeapons[i % shuffledWeapons.length], uniqueId: `${shuffledWeapons[i % shuffledWeapons.length].id}-${i}` })))
    }, [caseData])

    const totalItems = extendedItems.length
    const itemWidth = 127.17

    useEffect(() => {
        if (!extendedItems) return
        console.log(extendedItems)
    }, [extendedItems])

    const handleStartTranslate = async () => {
        try {
            setIsScrolling(true)
            const winningItem = await fetchToOpenCase(String(id))
            if (winningItem.data?.success) {
                refetchUserInventoryData()
                setExtendedItems((prev: ICaseWeapon[]) => {
                    const copy = [...prev]
                    copy[342] = { ...copy[342], title: winningItem.data.title, rare: winningItem.data.rare, img_url: winningItem.data.img_url }
                    return copy
                })
                if (isScrolling) return
                const middleIndex = Math.floor(totalItems / 2)
                const finalTargetIndex = 372 / 2
                const startOffset = itemWidth * (middleIndex - 5)
                const targetPosition = itemWidth * finalTargetIndex
                setTranslateValue(startOffset)
                setTimeout(() => {
                    setTranslateValue(targetPosition)
                }, 10)
                setTimeout(() => {
                    setIsScrolling(false)
                    setIsWinningItem(true)
                }, 4000)
            } else {
                addNotification('Отсутствует подходящий кейс')
                setIsScrolling(false)
            }
        } catch (error) {
            console.log(error)
            setIsScrolling(false)
        }
    }

    useEffect(() => {
        console.log(userInventoryData)
        console.log(caseData)
        if (!userInventoryData || !caseData) return
        const avaliableKeys = userInventoryData.keys.filter((key) => key.id === caseData.key.id)

        if (avaliableKeys.length > 0) {
            setAvaliableKeys(avaliableKeys[0].count)
        } else {
            setAvaliableKeys(0)
        }

    }, [userInventoryData, caseData])

    function handleClosePopup() {
        if (!caseData) return
        const shuffledWeapons = shuffleArray(caseData.weapons)
        setExtendedItems(Array.from({ length: 400 }, (_, i) => ({ ...shuffledWeapons[i % shuffledWeapons.length], uniqueId: `${shuffledWeapons[i % shuffledWeapons.length].id}-${i}` })))
        setIsWinningItem(false)
        setTranslateValue(0)
    }

    async function handleSellItem() {
        if (!winningItem) return
        try {
            setIsSellFetching(true)
            const result = await fetchToSellItem(winningItem.weapon_id)
            console.log(result)
            handleClosePopup()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSellFetching(false)
        }
    }

    const memoizedItems = useMemo(() => extendedItems, [extendedItems])
    return (
        <div>
            {winningItem && (
                <SelectedItemPopup
                    isActive={isWinningItem}
                    selectedItem={winningItem}
                    closePopupHandler={handleClosePopup}
                    buttonClickHandler={handleSellItem}
                    handleImportButton={handleClosePopup}
                    isButtonDisabled={isSellFetching}
                />
            )}
            <div className={`flex align__center justify__center ${styles.avaliableKeysContainer}`}>
                <span className={styles.avaliableKeysTitle}>Доступно ключей: </span>
                <span className={styles.avaliablekeysValue}>{avaliableKeys ? avaliableKeys : 0}</span>
            </div>
            <div className={`flex align__center ${styles.itemsWrapper}`}>
                <div className={`flex column align__center ${styles.currentWeaponContainer}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="35"
                        viewBox="0 0 21 35"
                        fill="none"
                    >
                        <path
                            d="M10.5 0L21 17.5L10.5 35L0 17.5L10.5 0Z"
                            fill="url(#paint0_linear_2044_706)"
                        />
                        <path
                            d="M20.417 17.5L10.5 34.0283L0.582031 17.5L10.5 0.970703L20.417 17.5Z"
                            stroke="#8A2EE8"
                            strokeOpacity="0.4"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_2044_706"
                                x1="10.5"
                                y1="0"
                                x2="10.5"
                                y2="35"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4D1A82" />
                                <stop offset="1" stopColor="#8A2EE8" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div
                        className={`flex align__center ${styles.itemsContainer}`}
                        style={{
                            transform: `translateX(-${translateValue}px)`,
                            transition: isScrolling ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
                        }}
                    >
                        {memoizedItems.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className={`flex column align__center justify__center ${styles.itemCard}`}
                                style={{ backgroundImage: `linear-gradient(180deg, #1D1D1D 0%, ${getRarityStyles(item).rarityBackground} 100%)` || 'rgba(255, 255, 255, 0.05)' }}
                            >
                                <div className={styles.itemPreview}>
                                    <img src={item.img_url} alt="Item preview" />
                                </div>
                                <div className={`flex column ${styles.itemTextContainer}`}>
                                    <span className={`text__center ${styles.itemTitle}`}>
                                        {item.title.replace(/_/g, ' ')}
                                    </span>
                                    <span className={styles.itemRare}>{item.rare.replace(/_/g, ' ')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`flex align__center justify__space__between ${styles.openCaseButton} ${(avaliableKeys === 0 || isScrolling) ? styles.disabled : ''}`} onClick={handleStartTranslate}>
                <span className={styles.buttonTitle}>
                    Открыть кейс
                </span>
                <div className={`flex align__center ${styles.openCasePreviewContainer}`}>
                    <span className={styles.avaliablekeysValue}>1</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.125 1.25C12.3047 1.24991 11.4943 1.42923 10.7507 1.77539C10.007 2.12154  9.34804 2.62616 8.81998 3.25387C8.29191 3.88157 7.90753 4.61718 7.69376 5.40912C7.47999 6.20106 7.44202 7.03017 7.5825 7.83833C7.63833 8.16333 7.55583 8.43583 7.39833 8.59333L1.98167 14.0092C1.5131 14.478 1.24992 15.1138 1.25 15.7767V18.125C1.25 18.47 1.53 18.75 1.875 18.75H5C5.16576 18.75 5.32473 18.6842 5.44194 18.5669C5.55915 18.4497 5.625 18.2908 5.625 18.125V16.875H6.875C7.04076 16.875 7.19973 16.8092 7.31694 16.6919C7.43415 16.5747 7.5 16.4158 7.5 16.25V15H8.75C8.9157 14.9999 9.07457 14.9339 9.19167 14.8167L11.4067 12.6017C11.565 12.4442 11.8375 12.3617 12.1617 12.4183C12.9291 12.5505 13.7156 12.522 14.4714 12.3344C15.2272 12.1469 15.9358 11.8044 16.5524 11.3288C17.169 10.8531 17.6801 10.2546 18.0534 9.57118C18.4266 8.88774 18.6539 8.13423 18.7209 7.35839C18.7878 6.58254 18.6929 5.80125 18.4422 5.06398C18.1914 4.32672 17.7904 3.64954 17.2643 3.07534C16.7383 2.50113 16.0988 2.0424 15.3863 1.72819C14.6737 1.41399 13.9037 1.25115 13.125 1.25ZM13.125 3.75C12.9592 3.75 12.8003 3.81585 12.6831 3.93306C12.5658 4.05027 12.5 4.20924 12.5 4.375C12.5 4.54076 12.5658 4.69973 12.6831 4.81694C12.8003 4.93415 12.9592 5 13.125 5C13.6223 5 14.0992 5.19754 14.4508 5.54917C14.8025 5.90081 15 6.37772 15 6.875C15 7.04076 15.0658 7.19973 15.1831 7.31694C15.3003 7.43415 15.4592 7.5 15.625 7.5C15.7908 7.5 15.9497 7.43415 16.0669 7.31694C16.1842 7.19973 16.25 7.04076 16.25 6.875C16.25 6.0462 15.9208 5.25134 15.3347 4.66529C14.7487 4.07924 13.9538  3.75 13.125 3.75Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
            <div className={`flex column ${styles.possibleItemsContainer}`}>
                <span className={styles.possibleItemsContainerTitle}>Возможный выигрыш</span>
                <div className={`flex flex__wrap ${styles.possibleItemCardsContainer}`}>
                    {itemsData && itemsData.map((item) => (
                        <div
                            key={item.id}
                            className={`flex column ${styles.possibleItemCard}`}
                            style={{ backgroundImage: `linear-gradient(180deg, #1D1D1D 0%, ${getRarityStyles(item).rarityBackground} 100%)` || 'rgba(255, 255, 255, 0.05)', borderColor: getRarityStyles(item).rarityBorder }}
                        >
                            <span className={styles.itemType}>{item.model.replace(/_/g, ' ')}</span>
                            <div className={styles.itemPreview}>
                                <img src={item.img_url} alt="Item preview" />
                            </div>
                            <div className={`flex column ${styles.itemTextContainer}`}>
                                <span className={styles.itemTitle}>{item.title.replace(/_/g, ' ')}</span>
                                <span className={styles.itemRare}>{item.rare.replace(/_/g, ' ')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Opening