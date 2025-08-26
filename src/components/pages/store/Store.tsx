import React, { useEffect, useState } from 'react'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import StoreItemCard from './StoreItemCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'
import { useGetCaseListQuery, useGetKeyListQuery } from '../../../redux/services/listService'
import ICaseResponse from '../../../interfaces/ICaseResponse'
import { usePurchaseInventoryItemMutation } from '../../../redux/services/shopService'
import { useNotification } from '../../../providers/notification/NotificationProvider'

const StorePage: React.FC = () => {
    const { addNotification } = useNotification()
    const { data: casesFetchData, refetch: casesDataRefetch } = useGetCaseListQuery()
    const { data: keyFetchData, refetch: keysDataRefetch } = useGetKeyListQuery()
    const [purchaseItemFetch] = usePurchaseInventoryItemMutation()

    const [isSelectedItemPopupActive, setIsSelectedItemPopupActive] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<ICaseResponse | null>(null)
    const [casesData, setCasesData] = useState<ICaseResponse[]>([])

    const [keysData, setKeysData] = useState<ICaseResponse[]>([])

    function closeSelectedItemPopupHandler() {
        setIsSelectedItemPopupActive(false)
    }

    function selectItemHandler(item: ICaseResponse) {
        setIsSelectedItemPopupActive(true)
        setSelectedItem(item)
    }

    const addCaseItem = (item: ICaseResponse, itemType: string) => {
        const isPremium = item.type === 'premium'

        const enhancedItem: ICaseResponse = {
            ...item,
            ...(isPremium
                ? {
                    rarityBackground: 'rgba(197, 170, 46, 1)',
                    popupRarityBorder: 'rgba(197, 170, 46, 1)',
                    topShadow: 'rgba(33, 169, 227, 0.55)',
                    rarityShadow: `4px -4px 16.6px 0px rgba(223, 184, 10, 1) inset,
                  -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
                  0px 0px 15.1px 0px rgba(223, 184, 10, 0.5),
                  4px -4px 16.6px 0px rgba(223, 184, 10, 1) inset,
                  -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
                  0px 0px 15.1px 0px rgba(223, 184, 10, 0.5)`,
                    rarityButton: 'linear-gradient(90deg, #F9E27A 0%, #DFB80A 50%, #C2A008 100%)',
                    rarityCategoryBackground: 'rgba(223, 184, 10, 1)',
                    rarityCategoryShadow:
                        '0px 0px 13.4px 0px rgba(218, 193, 81, 0.5), 0px 4px 4.8px 0px rgba(255, 251, 234, 0.25) inset',
                }
                : {
                    rarityBackground: '#228BB8',
                    popupRarityBorder: '#21A9E3',
                    rarityButton: 'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
                    rarityShadow: `4px -4px 16.6px 0px rgba(33, 169, 227, 1) inset, 
                  -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
                  0px 0px 15.1px 0px rgba(33, 169, 227, 0.5),
                  4px -4px 16.6px 0px rgba(29, 164, 221, 1) inset,
                  -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
                  0px 0px 15.1px 0px rgba(33, 169, 227, 0.5)`,
                    rarityCategoryBackground: '#21A9E3',
                    rarityCategoryShadow:
                        '0px 0px 13.4px 0px rgba(33, 169, 227, 0.5), 0px 4px 4.8px 0px rgba(180, 221, 239, 0.25) inset',
                }),
        }

        if (itemType === 'case') {
            setCasesData((prevData) => [...prevData, enhancedItem])
        } else {
            setKeysData((prevData) => [...prevData, enhancedItem])
        }
    }

    useEffect(() => {
        if (casesFetchData) {
            console.log(casesFetchData)
            casesFetchData?.data.forEach((item: ICaseResponse) => addCaseItem(item, 'case'))
        }
    }, [casesFetchData])

    useEffect(() => {
        if (keyFetchData) {
            keyFetchData.data.forEach((item: ICaseResponse) => addCaseItem(item, 'key'))
        }
    }, [keyFetchData])

    async function handlePurchaseItem(priceValute?: 'donation_coins' | 'free_coins') {
        if (!priceValute) return

        const itemId = selectedItem?.id

        if (itemId) {
            const result = await purchaseItemFetch({ itemId: String(itemId), valute: priceValute })

            if (result.data && result.data.success) {
                addNotification('Предмет был успешно приобретен!')
                casesDataRefetch()
                keysDataRefetch()
                closeSelectedItemPopupHandler()
            }
        }
    }

    return (
        <div>
            <SelectedItemPopup isActive={isSelectedItemPopupActive} selectedItem={selectedItem!} closePopupHandler={closeSelectedItemPopupHandler} isBuyPopup={true} buttonClickHandler={handlePurchaseItem} />
            <FilterBlock title='Кейсы' id="store__cases">
                {
                    casesData && casesData.length > 0 ? casesData.map((caseData) => (
                        <StoreItemCard key={caseData.id} itemCard={caseData} clickHandler={selectItemHandler} />
                    )) : <h3>Загрузка..</h3>
                }
            </FilterBlock>

            <FilterBlock title='Ключи' id="store__keys">
                {
                    keysData && keysData.length > 0 ? keysData.map((keyData) => (
                        <StoreItemCard key={keyData.id} itemCard={keyData} clickHandler={selectItemHandler} />
                    )) : <h3>Загрузка..</h3>
                }
            </FilterBlock>
        </div>
    )
}

export default StorePage