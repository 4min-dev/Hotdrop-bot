import React, { useState } from 'react'
import styles from './Cases.module.scss'
import Filter from '../../UI/filter/Filter'
import IFilter from '../../../interfaces/IFilter'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import getImage from '../../../assets/getImage'
import ItemCard from './ItemCard'
import { IItemCard } from '../../../interfaces/IItemCard'
import SelectedItemPopup from '../../UI/popups/SelectedItem/SelectedItemPopup'

const CasesPage: React.FC = () => {

    const [skinsData, setSkinsData] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'ump-46.png',
            type: 'UMP-46',
            amount: 23,
            title: 'Masturbek Gold',
            rarity: 'Consumer Grade',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityBackground: '#4A4A4A',
            rarityBorder: '#737373'
        },

        {
            id: 2,
            img: 'scorpion.png',
            type: 'UMP-46',
            amount: 23,
            title: 'Masturbek Gold',
            rarity: 'Consumer Grade',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityCategoryBackground: '#21A9E3',
            rarityBackground: '#228BB8',
            rarityBorder: '#21A9E3',
            rarityButton: 'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            rarityShadow: `4px -4px 16.6px 0px rgba(33, 169, 227, 1) inset, -4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5),
4px -4px 16.6px 0px rgba(29, 164, 221, 1) inset,
-4px 4px 19px 0px rgba(255, 255, 255, 0.25) inset,
0px 0px 15.1px 0px rgba(33, 169, 227, 0.5)`,
            rarityCategoryShadow: `0px 0px 13.4px 0px rgba(33, 169, 227, 0.5), 0px 4px 4.8px 0px rgba(180, 221, 239, 0.25) inset`

        },
    ])
    const [otherData, setOtherData] = useState<IItemCard[]>([
        {
            id: 1,
            img: 'case-3.png',
            type: 'Case',
            amount: 12,
            title: 'Обычный кейс',
            rarity: 'Restricted',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityBackground: '#283D90',
            rarityBorder: '#2148E3'
        },

        {
            id: 2,
            img: 'case-4.png',
            type: 'Case',
            amount: 1,
            title: 'Gold кейс',
            rarity: 'Exceedingly Rare',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityBackground: '#504929',
            rarityBorder: '#C5AA2E'
        },

        {
            id: 3,
            img: 'key.png',
            type: 'Key',
            amount: 1,
            title: 'Обычный Key',
            rarity: 'Restricted',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityBackground: '#283D90',
            rarityBorder: '#2148E3'
        },

        {
            id: 4,
            img: 'key-2.png',
            type: 'Key',
            amount: 3,
            title: 'Gold Key',
            rarity: 'Exceedingly Rare',
            hint: 'Шанс выпадения скина редкости выше чем Restricted равен 13%',
            price: 1230,
            rarityBackground: '#504929',
            rarityBorder: '#C5AA2E'
        },
    ])

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

    const [selectedItem, setSelectedItem] = useState<IItemCard | null>(null)
    const [isSelectedItemPopupActive, setIsSelectedItemPopupActive] = useState<boolean>(false)

    function caseClickHandler(item: IItemCard) {
        if (item) {
            setSelectedItem(item)
            setIsSelectedItemPopupActive(true)
        }
    }

    function closeSelectedItemPopupHandler() {
        setIsSelectedItemPopupActive(false)
    }

    return (
        <div>
            <SelectedItemPopup isActive={isSelectedItemPopupActive} selectedItem={selectedItem!} closePopupHandler={closeSelectedItemPopupHandler} />
            <Filter filters={casesPageFilters} setFilters={setCasesPageFilters} />
            <FilterBlock title='Все скины' id='skins' withFilter={true}>
                {
                    skinsData && skinsData.length > 0 ? skinsData.map((skinItem) => (
                        <ItemCard item={skinItem} clickHandler={() => caseClickHandler(skinItem)} />
                    ))
                        : <h3>Загрузка..</h3>
                }
            </FilterBlock>

            <FilterBlock id='cases'>
                {
                    otherData && otherData.length > 0 ? otherData.map((skinItem) => (
                        <ItemCard item={skinItem} clickHandler={() => caseClickHandler(skinItem)} />
                    ))
                        : <h3>Загрузка..</h3>
                }
            </FilterBlock>
        </div>
    )
}

export default CasesPage
