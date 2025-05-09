import React, { useState } from 'react'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import { IItemCard } from '../../../interfaces/IItemCard'
import StoreItemCard from './StoreItemCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'

const StorePage: React.FC = () => {
    const [isSelectedItemPopupActive, setIsSelectedItemPopupActive] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<IItemCard | null>(null)
    const [casesData, setCasesData] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'case-3.png',
            type: 'caseData',
            typeName: 'Кейс',
            amount: 12,
            title: 'Обычный кейс',
            rarity: 'Restricted',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 5000,
            rarityBackground: '#228BB8',
            rarityCategoryBackground: '#21A9E3',
            popupRarityBorder: '#21A9E3',
            rarityButton: 'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityShadow: `4px -4px 16.6px 0px rgba(33, 169, 227, 1) inset, -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5),
4px -4px 16.6px 0px rgba(29, 164, 221, 1) inset,
-4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5)`,
            rarityCategoryShadow: `0px 0px 13.4px 0px rgba(33, 169, 227, 0.5), 0px 4px 4.8px 0px rgba(180, 221, 239, 0.25) inset`
        },

        {
            id: 2,
            img: 'case-4.png',
            type: 'caseData',
            typeName: 'Кейс',
            amount: 1,
            title: 'Gold кейс',
            rarity: 'Exceedingly',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 5000,
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
            rarityCategoryShadow: '0px 0px 13.4px 0px rgba(218, 193, 81, 0.5), 0px 4px 4.8px 0px rgba(255, 251, 234, 0.25) inset'
        },
    ])

    const [keysData, setKeysData] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'key.png',
            type: 'Key',
            typeName: 'Ключ',
            amount: 1,
            title: 'Обычный Key',
            rarity: 'Restricted',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 2200,
            rarityBackground: '#228BB8',
            rarityCategoryBackground: '#21A9E3',
            popupRarityBorder: '#21A9E3',
            rarityButton: 'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityShadow: `4px -4px 16.6px 0px rgba(33, 169, 227, 1) inset, -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5),
4px -4px 16.6px 0px rgba(29, 164, 221, 1) inset,
-4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5)`,
            rarityCategoryShadow: `0px 0px 13.4px 0px rgba(33, 169, 227, 0.5), 0px 4px 4.8px 0px rgba(180, 221, 239, 0.25) inset`
        },

        {
            id: 2,
            img: 'key-2.png',
            type: 'Key',
            typeName: 'Ключ',
            amount: 3,
            title: 'Gold Key',
            rarity: 'Exceedingly',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 7200,
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
            rarityCategoryShadow: '0px 0px 13.4px 0px rgba(218, 193, 81, 0.5), 0px 4px 4.8px 0px rgba(255, 251, 234, 0.25) inset'
        },
    ])

    function closeSelectedItemPopupHandler() {
        setIsSelectedItemPopupActive(false)
    }

    function selectItemHandler(item: IItemCard) {
        setIsSelectedItemPopupActive(true)
        setSelectedItem(item)
    }

    return (
        <div>
            <SelectedItemPopup isActive={isSelectedItemPopupActive} selectedItem={selectedItem!} closePopupHandler={closeSelectedItemPopupHandler} isBuyPopup={true} buyType={selectedItem?.typeName} />
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