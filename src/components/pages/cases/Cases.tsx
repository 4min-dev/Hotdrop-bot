import React, { useEffect, useState } from 'react'
import Filter from '../../UI/filter/Filter'
import IFilter from '../../../interfaces/IFilter'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import ItemCard from './ItemCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'
import ICaseResponse from '../../../interfaces/ICaseResponse'
import { useGetInventoryQuery } from '../../../redux/services/userService'
import { useSellWeaponMutation } from '../../../redux/services/weaponService'
import { useNotification } from '../../../providers/notification/NotificationProvider'
import getRarityStyles from '../../../assets/getRarityStyles'
import { usePurchaseInventoryItemMutation } from '../../../redux/services/shopService'
import { rarityOrder } from '../../../assets/rarityOrder'

const CasesPage: React.FC = () => {
    const { addNotification } = useNotification()

    const [purchaseItemFetch, { isLoading: isPurchaseProcess }] = usePurchaseInventoryItemMutation()
    const [fetchToSellItem, { isLoading: isSellProcess }] = useSellWeaponMutation()
    const { data: inventoryData, refetch: inventoryDataRefetch } = useGetInventoryQuery()

    const [isFetching, setIsFetching] = useState<boolean>(false)

    const [skinsData, setSkinsData] = useState<ICaseResponse[]>([])
    const [otherData, setOtherData] = useState<ICaseResponse[]>([])

    const [casesPageFilters, setCasesPageFilters] = useState<IFilter[]>([
        {
            id: 1,
            title: 'Скины',
            isActive: true,
            value: 'skins'
        },
        {
            id: 2,
            title: 'Кейсы и ключи',
            isActive: false,
            value: 'cases'
        }
    ])

    const [selectedItem, setSelectedItem] = useState<ICaseResponse | null>(null)
    const [isSelectedItemPopupActive, setIsSelectedItemPopupActive] = useState<boolean>(false)

    function caseClickHandler(item: ICaseResponse) {
        if (item) {
            setSelectedItem(item)
            setIsSelectedItemPopupActive(true)
        }
    }

    function closeSelectedItemPopupHandler() {
        setIsSelectedItemPopupActive(false)
    }

    useEffect(() => {
        if (!inventoryData) return

        const processWeapons = () => {
            if (!inventoryData.weapons) return

            const groupedWeapons = inventoryData.weapons.reduce((acc: { [key: string]: ICaseResponse }, weapon) => {
                const title = weapon.title || 'Unknown'
                acc[title] = acc[title]
                    ? { ...acc[title] }
                    : { ...weapon }
                return acc
            }, {})

            return Object.values(groupedWeapons).map(item => ({
                ...item,
                ...getRarityStyles(item)
            }))
        }

        const processCasesAndKeys = () => {
            if (!inventoryData.cases || !inventoryData.keys) return { cases: [], keys: [] }

            const groupItems = (
                items: any[],
                itemType: 'Case' | 'Key'
            ): Record<string, ICaseResponse> => {
                return items.reduce((acc, item) => {
                    const title = item.title || 'Unknown'
                    const baseItem = {
                        ...item,
                        itemType
                    }

                    acc[title] = acc[title]
                        ? {
                            ...acc[title],
                        }
                        : baseItem

                    return acc
                }, {} as Record<string, ICaseResponse>)
            }

            const groupedCases = groupItems(inventoryData.cases, 'Case')
            const groupedKeys = groupItems(inventoryData.keys, 'Key')

            return {
                cases: Object.values(groupedCases).map(item => ({
                    ...item,
                    ...getRarityStyles(item)
                })),
                keys: Object.values(groupedKeys).map(item => ({
                    ...item,
                    ...getRarityStyles(item)
                }))
            }
        }

        const weaponsData = processWeapons()
        const sortedWeapons = [...weaponsData!].sort((a, b) => {
            const indexA = rarityOrder.indexOf(a.rare!)
            const indexB = rarityOrder.indexOf(b.rare!)
            return indexA - indexB
        })

        if (weaponsData) setSkinsData(sortedWeapons)

        const casesAndKeysData = processCasesAndKeys()
        setOtherData([...casesAndKeysData.cases, ...casesAndKeysData.keys])

        console.log(inventoryData)
    }, [inventoryData])

    async function handleSellItem(valute?: 'donation_coins' | 'free_coins') {
        if (!selectedItem) return

        if (selectedItem.weapons) return window.location.href = `/opening/${selectedItem.id}`
        if (selectedItem.itemType === 'Key' && valute) return handlePurchaseItem(valute)

        try {
            setIsFetching(true)
            const sellResult = await fetchToSellItem(String(selectedItem?.id))

            if (sellResult.data?.success) {
                await inventoryDataRefetch()
                closeSelectedItemPopupHandler()
                addNotification(`Предмет был продан за ${sellResult.data.cost} токенов`)
                setIsFetching(false)
            }

        } catch (error) {
            console.log(error)
            setIsFetching(false)
        }
    }

    async function handlePurchaseItem(valute: 'donation_coins' | 'free_coins') {
        const itemId = selectedItem?.id

        if (itemId) {
            setIsFetching(true)
            const result = await purchaseItemFetch({ itemId: String(itemId), valute: valute })

            if (result.data && result.data.success) {
                inventoryDataRefetch()
                closeSelectedItemPopupHandler()
                addNotification('Предмет был успешно приобретен!')
            }

            setIsFetching(false)
        }
    }

    return (
        <div>
            <SelectedItemPopup isActive={isSelectedItemPopupActive} selectedItem={selectedItem!} closePopupHandler={closeSelectedItemPopupHandler} buttonClickHandler={handleSellItem} isCasePopup={selectedItem && selectedItem.weapons ? true : false} isBuyPopup={selectedItem?.itemType === 'Key' ? true : false} isButtonDisabled={isFetching} />
            <Filter filters={casesPageFilters} setFilters={setCasesPageFilters} />
            <FilterBlock title='Все скины' id='skins' withFilter={true}>
                {
                    skinsData && skinsData.length > 0 ? skinsData.map((skinItem) => (
                        <ItemCard key={skinItem.id ?? skinItem.defaultId} item={skinItem} clickHandler={() => caseClickHandler(skinItem)} />
                    )) : <h3>Загрузка..</h3>
                }
            </FilterBlock>

            <FilterBlock id='cases'>
                {
                    otherData && otherData.length > 0 ? otherData.map((skinItem) => (
                        <ItemCard key={skinItem.id ?? skinItem.defaultId} item={skinItem} clickHandler={() => caseClickHandler(skinItem)} />
                    )) : <h3>Загрузка..</h3>
                }
            </FilterBlock>
        </div>
    )
}

export default CasesPage
