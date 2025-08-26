import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './GunsConnection.module.scss'
import getFormattedNumber from '../../../assets/getFormattedNumber'
import GunsConnectionCard from './GunsConnectionCard'
import GunsSwiperCard from './GunsSwiperCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'
import ICaseResponse from '../../../interfaces/ICaseResponse'
import { useSellCraftedWeaponMutation, useStartCraftGameMutation, useStartCraftWeaponMutation } from '../../../redux/services/gameEventService'
import ICraftedWeapon from '../../../interfaces/ICraftedWeapon'
import { rarityOrder } from '../../../assets/rarityOrder'
import { useSellWeaponMutation } from '../../../redux/services/weaponService'

const GunsConnection: React.FC = () => {
    const [craftedGameStorage, setCraftedGameStorage] = useState<{
        crafted_weapons: ICraftedWeapon[],
        inventory_weapons: ICraftedWeapon[]
    }>({
        crafted_weapons: [],
        inventory_weapons: []
    })

    const [fetchToSellCraftedWeapon] = useSellCraftedWeaponMutation()
    const [fetchToSellWeapon] = useSellWeaponMutation()
    const [fetchToStartWeaponGame, { data: startedCraftGameData }] = useStartCraftGameMutation()
    const [fetchToCraftWeapon, { data: craftedWeaponData }] = useStartCraftWeaponMutation()

    const [isCraftedWeaponSold, setCraftedWeaponSold] = useState<boolean>(false)

    const [maxCurrentRarity, setMaxCurrentRarity] = useState<null | string>(null)
    const [items, setItems] = useState<ICaseResponse[]>(Array(16).fill({} as ICaseResponse))
    const [swiperData, setSwiperData] = useState<ICaseResponse[]>([])

    const [isSelectedPopupActive, setSelectedPopupActive] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ICaseResponse | null>(null)
    const [targetedWeapon, setTargetedWeapon] = useState<ICaseResponse | null>(null)
    const [draggingItemPosition, setDraggingItemPosition] = useState<{ y: number, x: number }>({ y: 0, x: 0 })

    const containerRef = useRef<HTMLDivElement>(null)
    const inventoryRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(16).fill(null))
    const [latestCraftedIndex, setLatestCraftedIndex] = useState<number>(0)

    const [isfromInventory, setIsFromInventory] = useState<boolean>(false)
    const [isSaleFetching, setIsSaleFetching] = useState<boolean>(false)

    function handleSelectItem(item: ICaseResponse) {

        const targetedItemCount = items.filter((craftedItem) => (craftedItem.title === item.title) && (craftedItem.rare === item.rare)).length

        setSelectedPopupActive(true)
        setTargetedWeapon({
            ...item,
            count: targetedItemCount
        })
    }

    function handleCloseSelectedItemPopup() {
        setSelectedPopupActive(false)

        setTimeout(() => {
            setTargetedWeapon(null)
        }, 400)
    }

    function getItemStyles(item: any): any {
        const itemRare = item.rare?.toLowerCase()

        if (itemRare === 'restricted') {
            return { rarityBorder: 'linear-gradient(135.95deg, #5676F8 0.88%, #2148E3 46.7%, #0D216F 92.51%)', rarityShadow: '#2148E3' }
        }

        if (itemRare === 'rare') {
            return { rarityBorder: 'linear-gradient(135.95deg, #0AA8EC 0.88%, #0978A7 46.7%, #094862 92.51%)', rarityShadow: '#21A9E3' }
        }

        if (itemRare === 'classified') {
            return { rarityBorder: 'linear-gradient(135.95deg, #CB97FF 0.88%, #9D49F1 46.7%, #340B5D 92.51%)', rarityShadow: '#9D49F1' }
        }

        if (itemRare === 'covert') {
            return { rarityBorder: 'linear-gradient(135.95deg, #E480F3 0.88%, #CC2FE4 46.7%, #60066E 92.51%)', rarityShadow: '#DB49F1' }
        }

        if (itemRare === 'legendary') {
            return { rarityBorder: 'linear-gradient(135.95deg, #F67274 0.88%, #EF2427 46.7%, #5F0A0B 92.51%)', rarityShadow: '#EF2427' }
        }

        if (itemRare === 'exceedingly_rare') {
            return { rarityBorder: 'linear-gradient(135.95deg, #FFEE9F 0.88%, #C5AA2E 46.7%, #927F27 92.51%)', rarityShadow: '#C5AA2E' }
        }

        return { rarityBorder: 'linear-gradient(135.95deg, #C2C5C6 0.88%, #737373 46.7%, #4C4E4E 92.51%)' }
    }

    useEffect(() => {
        if (!startedCraftGameData) return
        setSwiperData(startedCraftGameData.inventory_weapons as ICaseResponse[])
    }, [startedCraftGameData])

    useEffect(() => {
        const validItems = items.filter(item => item.rare && Object.keys(item).length > 0)

        if (validItems.length === 0) {
            setMaxCurrentRarity(null)
            return
        }

        const maxRarity = validItems.reduce((highestRarity, item) => {
            const currentRarityIndex = rarityOrder.indexOf(item.rare!)
            const highestRarityIndex = rarityOrder.indexOf(highestRarity)

            return currentRarityIndex > highestRarityIndex ? item.rare! : highestRarity
        }, rarityOrder[0])

        setMaxCurrentRarity(maxRarity)
    }, [items])

    let hasFetched: boolean = false

    useEffect(() => {
        if (startedCraftGameData) {
            const updatedCraftedWeapons = startedCraftGameData.crafted_weapons.map((weapon, index) => ({
                ...weapon,
                defaultId: weapon.id,
                id: `${weapon.id}-${index}`,
                unique_id: `${weapon.title}-${weapon.id}-${index}`
            }))

            console.log(updatedCraftedWeapons)

            const expandedWeapons = [] as ICraftedWeapon[]
            updatedCraftedWeapons.forEach(weapon => {
                for (let i = 0; i < weapon.count; i++) {
                    expandedWeapons.push(weapon)
                }
            })


            setCraftedGameStorage({
                crafted_weapons: updatedCraftedWeapons,
                inventory_weapons: startedCraftGameData.inventory_weapons
            })

            const newSwiperData: ICaseResponse[] = []

            startedCraftGameData.inventory_weapons.forEach((weapon: any, index: number) => {
                newSwiperData[index] = {
                    ...weapon, rarityBorder: getItemStyles(weapon).rarityBorder, rarityShadow: getItemStyles(weapon).rarityShadow
                }
            })

            setSwiperData(newSwiperData as ICaseResponse[])

            const newItems = Array(16).fill({} as ICaseResponse)
            expandedWeapons.forEach((weapon: any, index: number) => {

                if (index < 16) {
                    newItems[index] = {
                        ...weapon, id: `${weapon.title}-${index}`, uniqueId: `${weapon.title}-${index}`, rarityBorder: getItemStyles(weapon).rarityBorder, rarityShadow: getItemStyles(weapon).rarityShadow
                    }
                }
            })

            setItems(newItems)
        } else if (!hasFetched) {
            hasFetched = true
            fetchToStartWeaponGame()
        }
    }, [startedCraftGameData])

    function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
        const touch = event.touches[0]
        const y = touch.clientY
        const x = touch.clientX

        setDraggingItemPosition({ x, y })
    }

    function handleTouchStart(touchedItem: ICaseResponse, event: React.TouchEvent<HTMLDivElement>, isFromInventory: boolean) {
        setIsFromInventory(isFromInventory)
        setSelectedItem(touchedItem)
        handleTouchMove(event)
    }

    async function handleTouchEnd(isFromInventory: boolean) {
        if (selectedItem) {

            const dropX = draggingItemPosition.x
            const dropY = draggingItemPosition.y

            const inventoryRect = inventoryRef.current?.getBoundingClientRect()
            const isDroppedOnInventory = inventoryRect && (
                dropX >= inventoryRect.left &&
                dropX <= inventoryRect.right &&
                dropY >= inventoryRect.top &&
                dropY <= inventoryRect.bottom
            )

            if (isDroppedOnInventory) {
                if (selectedItem.isCraftedWeapon || !items.some((item) => item.id === selectedItem.id) || craftedGameStorage.crafted_weapons.some((weapon) => weapon.defaultId === selectedItem.defaultId)) return setSelectedItem(null)

                const sourceIndex = items.findIndex(
                    (item) => item.uniqueId === selectedItem.uniqueId && Object.keys(item).length > 0
                )

                if (sourceIndex !== -1) {
                    const newItems = [...items]

                    if (craftedGameStorage.crafted_weapons.some((craftedWeapon) => craftedWeapon.id === selectedItem.defaultId) || selectedItem.isCraftedWeapon) {
                        newItems[sourceIndex] = selectedItem as ICaseResponse
                    } else {
                        newItems[sourceIndex] = {} as ICaseResponse
                    }

                    setItems(newItems)
                }

                const updatedSwiperData = swiperData.length > 0 ? swiperData
                    .map((item) => {
                        if (item.id === selectedItem.id || selectedItem.weapon_id === item.id) {
                            return item.count >= 1 ? { ...item, count: item.count + 1 } : { ...item, count: 1 }
                        }

                        console.log(`Item = ${JSON.stringify(item)}`)
                        return item
                    }) : [...swiperData, { ...selectedItem, count: 1 }]
                setSwiperData(updatedSwiperData)
            } else {
                const targetIndex = cardRefs.current.findIndex((cardRef) => {
                    if (!cardRef) return false
                    const rect = cardRef.getBoundingClientRect()
                    return (
                        dropX >= rect.left &&
                        dropX <= rect.right &&
                        dropY >= rect.top &&
                        dropY <= rect.bottom
                    )
                })
                const selectedIndex = items.findIndex((item) => {
                    return item.uniqueId === selectedItem.uniqueId
                })

                if (!items[targetIndex] || ((Object.keys(items[targetIndex]).length > 0) && (items[targetIndex].rare !== selectedItem.rare || selectedItem.uniqueId === items[targetIndex].uniqueId) || selectedItem.rare?.toLowerCase() === 'exceedingly_rare')) {
                    document.body.style.touchAction = 'inherit'
                    setSelectedItem(null)
                    return
                }
                console.log(selectedItem)
                if (items[targetIndex].rare === selectedItem.rare) {
                    const firstWeaponSource = craftedGameStorage.crafted_weapons.some((craftedWeapon) => craftedWeapon.weapon_id === items[targetIndex].weapon_id) || items[targetIndex].isCraftedWeapon ? 'crafted_weapons' : 'inventory'
                    const secondWeaponSource = craftedGameStorage.crafted_weapons.some((craftedWeapon) => craftedWeapon.weapon_id === selectedItem.weapon_id) || selectedItem.isCraftedWeapon ? 'crafted_weapons' : 'inventory'

                    console.log(`First source = ${firstWeaponSource}`)
                    console.log(`Second source = ${secondWeaponSource}`)

                    console.log(items[targetIndex])
                    console.log(selectedItem)

                    try {
                        const craftedWeaponData = await fetchToCraftWeapon({
                            first_weapon: {
                                source: firstWeaponSource,
                                weapon_id: String(items[targetIndex].weapon_id || items[targetIndex].defaultId || items[targetIndex].id)
                            },
                            second_weapon: {
                                source: secondWeaponSource,
                                weapon_id: String(selectedItem.weapon_id || selectedItem.defaultId || selectedItem.id)
                            }
                        })
                        setCraftedWeaponSold(false)

                        const updatedItems = [...items]
                        console.log(craftedWeaponData)
                        if (craftedWeaponData && craftedWeaponData.data) {
                            setLatestCraftedIndex(targetIndex)
                            updatedItems[targetIndex] = {
                                ...craftedWeaponData.data,
                                rarityBorder: getItemStyles(craftedWeaponData.data).rarityBorder,
                                rarityShadow: getItemStyles(craftedWeaponData.data).rarityShadow,
                                isCraftedWeapon: true,
                                uniqueId: `${craftedWeaponData.data.title}-${targetIndex}`
                            } as ICaseResponse

                            if (!isFromInventory) {
                                updatedItems[selectedIndex] = {} as ICaseResponse
                            }

                        }

                        setItems(updatedItems)
                    } catch (error) {
                        console.log(error)
                    }
                } else {

                    if (targetIndex !== -1) {
                        const newItems = [...items]
                        const sourceIndex = items.findIndex(
                            (item) => item.uniqueId === selectedItem.uniqueId && Object.keys(item).length > 0
                        )

                        if (sourceIndex !== -1) {
                            console.log(isFromInventory)

                            if (!isFromInventory) {
                                newItems[sourceIndex] = items[targetIndex]
                            }

                            newItems[targetIndex] = { ...selectedItem, uniqueId: `${selectedItem.title}-${targetIndex}` }

                        } else {
                            newItems[targetIndex] = { ...selectedItem, uniqueId: `${selectedItem.title}-${targetIndex}` }

                        }

                        setItems(newItems)
                    }
                }

                if (isFromInventory) {
                    const updatedSwiperData = swiperData.length > 0 ? swiperData
                        .map((item) => {
                            if ((item.id === selectedItem.id || selectedItem.weapon_id === item.id) && item.count >= 1) {
                                return { ...item, count: item.count - 1 }
                            }

                            return item
                        }) : swiperData

                    console.log(updatedSwiperData)
                    setSwiperData(updatedSwiperData)
                }

            }
        }

        document.body.style.touchAction = 'inherit'
        setSelectedItem(null)
        setIsFromInventory(false)
    }

    async function handleSellWeapon(coinsPrice?: 'free_coins' | 'donation_coins', isQuicklySell?: boolean) {
        if (!targetedWeapon && !craftedWeaponData) return
        console.log(craftedWeaponData)
        try {
            const weaponId = targetedWeapon?.weapon_id || targetedWeapon?.defaultId || targetedWeapon?.id || craftedWeaponData?.weapon_id || craftedWeaponData?.id
            if (!weaponId) {
                console.error('No valid weapon ID found')
                return
            }
            setIsSaleFetching(true)

            const selledWeapon = isQuicklySell || (craftedGameStorage.crafted_weapons.some((item) => (item?.defaultId === targetedWeapon?.defaultId) || item?.defaultId === targetedWeapon?.id)) || (craftedWeaponData && craftedWeaponData?.weapon_id === targetedWeapon?.weapon_id)
                ? await fetchToSellCraftedWeapon(String(weaponId))
                : await fetchToSellWeapon(String(weaponId))

            if (isQuicklySell) {
                setLatestCraftedIndex(0)
            }

            const targetIndex = (isQuicklySell && latestCraftedIndex) ? latestCraftedIndex : items.findIndex((item) => {
                const itemKey = item.uniqueId || item.id
                const targetKey = targetedWeapon?.uniqueId || targetedWeapon?.id
                return itemKey === targetKey
            })

            console.log(targetIndex)
            console.log(targetedWeapon)
            console.log(items)

            if (targetIndex === -1) {
                console.error('Weapon not found in items')
                return
            }

            const newSwiperData = [...swiperData]
            let newItems = [...items]

            const targetedIndex = newSwiperData.findIndex(
                (item) => (item.id ?? item.defaultId) === (targetedWeapon?.id || targetedWeapon?.defaultId)
            )

            if (targetedIndex !== -1) {
                const currentItem = newSwiperData[targetedIndex]

                if (currentItem.count > 1) {
                    newSwiperData[targetedIndex] = { ...currentItem, count: currentItem.count - 1 }
                } else {
                    newSwiperData.splice(targetedIndex, 1)
                }
            }

            newItems[targetIndex] = {} as ICaseResponse

            console.log(newSwiperData)

            setSwiperData(newSwiperData)
            setSelectedPopupActive(false)
            setItems(newItems)
            setCraftedWeaponSold(true)
            console.log('Sold weapon:', selledWeapon)
        } catch (error) {
            console.error('Error selling weapon:', error)
        } finally {
            setIsSaleFetching(false)
        }
    }

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.ready()
            window.Telegram?.WebApp.disableVerticalSwipes()
        }
    }, [window.Telegram?.WebApp])

    const handleMobileScroll = useCallback((event: TouchEvent) => {
        if (!selectedItem || Object.keys(selectedItem).length === 0) {
            document.body.style.touchAction = 'inherit'
            return
        }

        if (selectedItem) {
            event.preventDefault()
            document.body.style.touchAction = 'none'
        } else {
            document.body.style.touchAction = 'inherit'
        }
    }, [selectedItem])

    useEffect(() => {
        document.addEventListener('touchmove', handleMobileScroll, { passive: false })

        return () => {
            document.removeEventListener('touchmove', handleMobileScroll)
        }
    }, [handleMobileScroll])

    useEffect(() => {
        console.log(items)
        console.log(swiperData)
    }, [selectedItem])

    return (
        <div ref={containerRef}>
            <SelectedItemPopup isActive={isSelectedPopupActive} selectedItem={targetedWeapon!} closePopupHandler={handleCloseSelectedItemPopup} buttonClickHandler={handleSellWeapon} isButtonDisabled={isSaleFetching} />
            <div className={`flex align__end ${styles.gunsConnectionTextContainer}`}>
                <span className={styles.gunsConnectionTitle}>Макс. редкость</span>
                {
                    maxCurrentRarity && <span className={styles.gunsConnectionDescription}>{maxCurrentRarity.replace(/_/g, ' ')}</span>
                }
            </div>

            <div className={`flex flex__wrap ${styles.gunsConnectionCardsContainer}`}>
                {items && items.length > 0 ? items.map((item, index) => {
                    const isHidden = selectedItem && selectedItem.uniqueId === `${item.title}-${index}`

                    return (
                        <div key={`${item.uniqueId}-${index}-${item.title}`}
                            ref={(el) => (cardRefs.current[index] = el)} className={`flex align__center justify__center ${styles.gunsConnectionCard}`} style={{
                                'border': (item.rarityBorder && !isHidden) ? '2px solid transparent' : '2px solid #FFFFFF0D',
                                'boxShadow': (item.rarityBorder && !isHidden) ? 'none' : '4px 4px 7.1px 0px #3C3C3C40 inset, -4px -4px 7px 0px #3C3C3C40 inset'
                            }}>

                            <GunsConnectionCard
                                isFromInventory={false}
                                isHidden={isHidden}
                                itemCard={item}
                                handleTouchStart={handleTouchStart}
                                handleTouchMove={handleTouchMove}
                                handleTouchEnd={handleTouchEnd}
                                handleSelectItem={handleSelectItem}
                            />
                        </div>
                    )
                }) : <h3>Загрузка..</h3>}
            </div>

            <div ref={inventoryRef} className={`flex align__center ${styles.inventoryItemsContainer}`}>
                {swiperData && swiperData.length > 0 && swiperData.map((swiperElement, index) => {
                    const isHidden = swiperElement.count < 1 || (
                        swiperElement.count === 1 && selectedItem?.id === swiperElement.id && isfromInventory
                    )

                    return (
                        <div key={`${swiperElement.uniqueId}-${index}`} style={{ 'display': isHidden ? 'none' : 'block' }}>
                            <GunsSwiperCard
                                isFromInventory={true}
                                swiperElement={swiperElement}
                                handleTouchStart={handleTouchStart}
                                handleTouchMove={handleTouchMove}
                                handleTouchEnd={handleTouchEnd}
                            />
                        </div>
                    )
                })}
            </div>
            {
                (selectedItem && selectedItem.img_url) && (
                    <div className={styles.draggingItem} style={{ 'top': draggingItemPosition.y - 40, 'left': draggingItemPosition.x - 40 }}>
                        <img src={selectedItem.img_url} alt="Dragging item preview" />
                    </div>
                )
            }

            {
                (craftedWeaponData && !isCraftedWeaponSold) && (
                    <div className={`flex align__center ${styles.uiButtons}`}>
                        <button disabled={isSaleFetching} type='button' className={`flex align__center justify__space__between ${styles.sellItemButton}`} onClick={() => handleSellWeapon(undefined, true)}>
                            <span className={styles.buttonText}>Продать</span>
                            <div className={`flex align__center ${styles.sellItemPriceContainer}`}>
                                <span className={styles.buttonText}>{getFormattedNumber(craftedWeaponData.cost)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.74769 0.244054C7.70082 0.178673 7.64177 0.123794 7.57407 0.0826933C7.50637 0.0415927 7.43141 0.0151136 7.35366 0.00483701C7.27591 -0.00543955 7.19697 0.000697173 7.12155 0.0228809C7.04613 0.0450646 6.97578 0.0828404 6.91469 0.133952C5.42412 1.37954 4.44091 3.16551 4.16214 5.13388C3.65128 4.74828 3.20349 4.27946 2.83603 3.74546C2.78612 3.67285 2.72144 3.61258 2.64659 3.56896C2.57175 3.52534 2.48858 3.49943 2.40302 3.49309C2.31746 3.48675 2.2316 3.50013 2.15158 3.53228C2.07155 3.56443 1.99932 3.61455 1.94003 3.67908C0.912836 4.79755 0.25439 6.22736 0.060072 7.76138C-0.134246 9.29541 0.145654 10.854 0.859228 12.2114C1.5728 13.5688 2.68299 14.6544 4.02899 15.3112C5.37498 15.9679 6.88689 16.1615 8.34569 15.8641C9.80449 15.5666 11.1344 14.7935 12.1429 13.6567C13.1513 12.5199 13.7859 11.0784 13.9547 9.54115C14.1235 8.00386 13.8177 6.45054 13.0817 5.10622C12.3457 3.76189 11.2176 2.69636 9.86091 2.06398C9.0269 1.64184 8.30225 1.01776 7.74769 0.244054ZM9.91535 9.9298C9.91506 10.3689 9.82325 10.8028 9.64625 11.2014C9.46925 11.6 9.21127 11.9539 8.89012 12.2387C8.56896 12.5235 8.19228 12.7323 7.78605 12.8509C7.37982 12.9694 6.95372 12.9948 6.53715 12.9254C6.12058 12.8559 5.72344 12.6931 5.37315 12.4484C5.02286 12.2036 4.72775 11.8827 4.50817 11.5077C4.2886 11.1328 4.1498 10.7127 4.10134 10.2764C4.05287 9.8402 4.09591 9.39822 4.22747 8.98098C4.71592 9.35743 5.27747 9.63673 5.88647 9.79055C6.05158 8.68221 6.58069 7.6677 7.38369 6.9198C8.08447 7.01694 8.72751 7.3757 9.19319 7.92938C9.65888 8.48305 9.91551 9.19393 9.91535 9.9298Z" fill="white" />
                                </svg>
                            </div>
                        </button>

                        <button disabled={!craftedWeaponData.max_rare} type='button' className={`flex align__center justify__center ${styles.exportItemButton}`}>
                            <span className={styles.buttonText}>Забрать</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default GunsConnection