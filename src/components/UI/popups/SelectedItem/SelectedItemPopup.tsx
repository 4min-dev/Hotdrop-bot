import React, { useEffect, useState } from 'react'
import styles from './SelectedItemPopup.module.scss'
import Popup from '../popup/Popup'
import getFormattedNumber from '../../../../assets/getFormattedNumber'
import ICaseResponse from '../../../../interfaces/ICaseResponse'
import ICaseWeapon from '../../../../interfaces/ICaseWeapon'
import getRarityStyles from '../../../../assets/getRarityStyles'

type TSelectedItemPopup = {
    selectedItem: ICaseResponse | ICaseWeapon
    isActive: boolean
    closePopupHandler: () => void
    isBuyPopup?: boolean,
    isCasePopup?: boolean,
    buttonClickHandler?: (coinsPrice?: 'free_coins' | 'donation_coins', isQuicklySell?: boolean) => void,
    handleImportButton?: () => void,
    isButtonDisabled?: boolean
}

const SelectedItemPopup: React.FC<TSelectedItemPopup> = ({ selectedItem, isActive, closePopupHandler, isBuyPopup, isCasePopup, buttonClickHandler, handleImportButton, isButtonDisabled }) => {
    const rarityStyles = getRarityStyles(selectedItem)

    const gradientBackground = selectedItem
        ? `linear-gradient(180deg, #FFFFFF -7%, ${rarityStyles.rarityBackground} 40%, #171719 100%)`
        : ''

    const [itemRare, setItemRare] = useState<null | string>(null)

    useEffect(() => {
        if (!selectedItem) {
            setItemRare('')
            return
        }

        setItemRare(
            'rare' in selectedItem && selectedItem.rare
                ? selectedItem.rare
                : 'type' in selectedItem && selectedItem.type
                    ? selectedItem.type
                    : selectedItem.model
        )
    }, [selectedItem])

    return (
        <Popup isActive={isActive} closePopupHandler={closePopupHandler}>
            {selectedItem ? (
                <div
                    className={`flex align__center column justify__space__between ${styles.selectedItemPopup}`}
                    style={{
                        '--background-color': rarityStyles.rarityBackground,
                        backgroundImage: gradientBackground,
                        borderColor: rarityStyles.rarityBorder,
                        boxShadow: `0px -4px 15.8px 0px ${rarityStyles.rarityBorder || 'rgba(33, 169, 227, 0.55)'}`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.blackElem1}></div>
                    <div className={styles.blackElem2}></div>
                    <button
                        type="button"
                        className={`flex align__center justify__center ${styles.closePopupButton}`}
                        onClick={closePopupHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <path
                                d="M2 12L12 2M2 2L12 12"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div className={`flex align__center column ${styles.selectedItemPopupContainer}`}>
                        <div className={styles.selectedItemPreview}>
                            <img src={selectedItem.img_url} alt={selectedItem.title} />
                        </div>

                        <div className={`flex align__center column ${styles.aboutSelectedItem}`}>
                            <span className={styles.selectedItemTitle}>{selectedItem.title}</span>
                            <div className={`flex align__center ${styles.selectedItemTags}`}>
                                <span
                                    className={`flex align__center justify__center ${styles.selectedItemRarity}`}
                                    style={{
                                        background:
                                            rarityStyles.rarityCategoryBackground ||
                                            `linear-gradient(40deg, white 0%, ${rarityStyles.rarityBorder} 3%, #737373 122%)`,
                                        boxShadow: rarityStyles.rarityBackground
                                            ? `${rarityStyles.rarityBackground} 0px 0px 13.4px 0px, #FFFBEA40 0px 4px 4.8px 0px inset`
                                            : undefined,
                                    }}
                                >
                                    {itemRare?.replace(/_/g, ' ')}
                                </span>
                                {'count' in selectedItem && !isBuyPopup && selectedItem.count && (
                                    <span
                                        className={`flex align__center justify__center ${styles.selectedItemAmount}`}
                                    >
                                        {selectedItem.count}{' '}
                                        <span className={`flex align__center justify__center ${styles.text}`}>
                                            шт
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {'hint' in selectedItem && selectedItem.hint && (
                            <div className={`flex ${styles.selectedItemHint}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.375 10C2.375 5.5125 6.0125 1.875 10.5 1.875C14.9875 1.875 18.625 5.5125 18.625 10C18.625 14.4875 14.9875 18.125 10.5 18.125C6.0125 18.125 2.375 14.4875 2.375 10ZM9.63 8.79833C10.585 8.32083 11.6608 9.18417 11.4017 10.22L10.8108 12.5833L10.8458 12.5667C10.9927 12.5021 11.1587 12.4965 11.3096 12.551C11.4605 12.6054 11.5846 12.7158 11.6564 12.8593C11.7281 13.0028 11.7419 13.1684 11.695 13.3217C11.648 13.4751 11.5439 13.6046 11.4042 13.6833L11.3708 13.7017C10.415 14.1792 9.33917 13.3158 9.59833 12.28L10.19 9.91667L10.155 9.93333C10.0813 9.9743 10 9.99993 9.91615 10.0087C9.83226 10.0174 9.74748 10.0091 9.6669 9.98418C9.58632 9.95928 9.51161 9.91834 9.44727 9.86381C9.38294 9.80927 9.3303 9.74229 9.29254 9.66687C9.25478 9.59146 9.23267 9.50919 9.22754 9.425C9.22242 9.34082 9.23439 9.25647 9.26272 9.17704C9.29106 9.0976 9.33518 9.02472 9.39243 8.96279C9.44968 8.90086 9.51887 8.85115 9.59583 8.81667L9.63 8.79833ZM10.5 7.5C10.6658 7.5 10.8247 7.43415 10.9419 7.31694C11.0592 7.19973 11.125 7.04076 11.125 6.875C11.125 6.70924 11.0592 6.55027 10.9419 6.43306C10.8247 6.31585 10.6658 6.25 10.5 6.25C10.3342 6.25 10.1753 6.31585 10.0581 6.43306C9.94085 6.55027 9.875 6.70924 9.875 6.875C9.875 7.04076 9.94085 7.19973 10.0581 7.31694C10.1753 7.43415 10.3342 7.5 10.5 7.5Z"
                                        fill="white"
                                    />
                                </svg>
                                <span className={styles.selectedItemHintValue}>{selectedItem.hint}</span>
                            </div>
                        )}
                    </div>

                    <div className={`flex align__center justify__center ${styles.selectedItemUiButtons}`}>
                        {
                            (isBuyPopup && selectedItem.free_coins_price && selectedItem.donation_coins_price) ?
                                <>
                                    <button
                                        type="button"
                                        className={`flex align__center justify__space__between ${styles.sellItemButton} ${(isBuyPopup || isCasePopup) ? styles.buyButton : ''
                                            }`}
                                        style={{
                                            background:
                                                rarityStyles.rarityButton ||
                                                `linear-gradient(40deg, white 0%, ${rarityStyles.rarityBorder} 3%, #737373 122%)`,
                                            boxShadow: `0px -4px 15.8px 0px ${rarityStyles.rarityBorder}, -4px 4px 19px 0px #FFFFFF40 inset`,
                                        }}
                                        onClick={() => buttonClickHandler?.('donation_coins')}
                                    >
                                        <span className={styles.buttonText}>Купить</span>
                                        <div className={`flex align__center ${styles.sellItemPriceContainer}`}>
                                            <span className={styles.buttonText}>
                                                {getFormattedNumber(selectedItem.donation_coins_price)}
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74769 0.244054C7.70082 0.178673 7.64177 0.123794 7.57407 0.0826933C7.50637 0.0415927 7.43141 0.0151136 7.35366 0.00483701C7.27591 -0.00543955 7.19697 0.000697173 7.12155 0.0228809C7.04613 0.0450646 6.97578 0.0828404 6.91469 0.133952C5.42412 1.37954 4.44091 3.16551 4.16214 5.13388C3.65128 4.74828 3.20349 4.27946 2.83603 3.74546C2.78612 3.67285 2.72144 3.61258 2.64659 3.56896C2.57175 3.52534 2.48858 3.49943 2.40302 3.49309C2.31746 3.48675 2.2316 3.50013 2.15158 3.53228C2.07155 3.56443 1.99932 3.61455 1.94003 3.67908C0.912836 4.79755 0.25439 6.22736 0.060072 7.76138C-0.134246 9.29541 0.145654 10.854 0.859228 12.2114C1.5728 13.5688 2.68299 14.6544 4.02899 15.3112C5.37498 15.9679 6.88689 16.1615 8.34569 15.8641C9.80449 15.5666 11.1344 14.7935 12.1429 13.6567C13.1513 12.5199 13.7859 11.0784 13.9547 9.54115C14.1235 8.00386 13.8177 6.45054 13.0817 5.10622C12.3457 3.76189 11.2176 2.69636 9.86091 2.06398C9.0269 1.64184 8.30225 1.01776 7.74769 0.244054ZM9.91535 9.9298C9.91506 10.3689 9.82325 10.8028 9.64625 11.2014C9.46925 11.6 9.21127 11.9539 8.89012 12.2387C8.56896 12.5235 8.19228 12.7323 7.78605 12.8509C7.37982 12.9694 6.95372 12.9948 6.53715 12.9254C6.12058 12.8559 5.72344 12.6931 5.37315 12.4484C5.02286 12.2036 4.72775 11.8827 4.50817 11.5077C4.2886 11.1328 4.1498 10.7127 4.10134 10.2764C4.05287 9.8402 4.09591 9.39822 4.22747 8.98098C4.71592 9.35743 5.27747 9.63673 5.88647 9.79055C6.05158 8.68221 6.58069 7.6677 7.38369 6.9198C8.08447 7.01694 8.72751 7.3757 9.19319 7.92938C9.65888 8.48305 9.91551 9.19393 9.91535 9.9298Z" fill="white" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className={`flex align__center justify__space__between ${styles.sellItemButton} ${styles.exportItemButton} ${(isBuyPopup || isCasePopup) ? styles.buyButton : ''
                                            }`}
                                        onClick={() => buttonClickHandler?.('free_coins')}
                                    >
                                        <span className={styles.buttonText}>Купить</span>
                                        <div className={`flex align__center ${styles.sellItemPriceContainer}`}>
                                            <span className={styles.buttonText}>
                                                {getFormattedNumber(selectedItem.free_coins_price)}
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ width: '12px', height: '12px' }}>
                                                <path d="M12 6.36353L10.9091 8.54534H1.09091L0 6.36353H12Z" fill="white" />
                                                <rect x="9.81818" y="12.3635" width="2.18182" height="7.63636" transform="rotate(90 9.81818 12.3635)" fill="white" />
                                                <rect x="12" y="0.363525" width="2.18182" height="12" transform="rotate(90 12 0.363525)" fill="white" />
                                                <rect x="4.90909" y="2" width="2.18182" height="12.5455" fill="white" />
                                            </svg>
                                        </div>
                                    </button>

                                </> : <button
                                    disabled={isButtonDisabled}
                                    type="button"
                                    className={`flex align__center justify__space__between ${styles.sellItemButton} ${(isBuyPopup || isCasePopup) ? styles.buyButton : ''
                                        }`}
                                    style={{
                                        background:
                                            rarityStyles.rarityButton ||
                                            `linear-gradient(40deg, white 0%, ${rarityStyles.rarityBorder} 3%, #737373 122%)`,
                                        boxShadow: `0px -4px 15.8px 0px ${rarityStyles.rarityBorder}`,
                                    }}
                                    onClick={() => buttonClickHandler?.(isBuyPopup && selectedItem.donation_coins_price ? 'donation_coins' : 'free_coins')}
                                >
                                    {isCasePopup ? <span className={styles.buttonText}>Открыть кейс</span>
                                        : !isBuyPopup ? (
                                            <span className={styles.buttonText}>Продать</span>
                                        ) : (
                                            <span className={styles.buttonText}>{
                                                'itemType' in selectedItem && selectedItem.itemType === 'Key' ? 'Купить ключ' : 'Купить'
                                            }</span>
                                        )}
                                    <div className={`flex align__center ${styles.sellItemPriceContainer}`}>
                                        {
                                            isCasePopup
                                                ? <>
                                                    <span className={styles.buttonText}>1</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.125 1.25C12.3047 1.24991 11.4943 1.42923 10.7507 1.77539C10.007 2.12154 9.34804 2.62616 8.81998 3.25387C8.29191 3.88157 7.90753 4.61718 7.69376 5.40912C7.47999 6.20106 7.44202 7.03017 7.5825 7.83833C7.63833 8.16333 7.55583 8.43583 7.39833 8.59333L1.98167 14.0092C1.5131 14.478 1.24992 15.1138 1.25 15.7767V18.125C1.25 18.47 1.53 18.75 1.875 18.75H5C5.16576 18.75 5.32473 18.6842 5.44194 18.5669C5.55915 18.4497 5.625 18.2908 5.625 18.125V16.875H6.875C7.04076 16.875 7.19973 16.8092 7.31694 16.6919C7.43415 16.5747 7.5 16.4158 7.5 16.25V15H8.75C8.9157 14.9999 9.07457 14.9339 9.19167 14.8167L11.4067 12.6017C11.565 12.4442 11.8375 12.3617 12.1617 12.4183C12.9291 12.5505 13.7156 12.522 14.4714 12.3344C15.2272 12.1469 15.9358 11.8044 16.5524 11.3288C17.169 10.8531 17.6801 10.2546 18.0534 9.57118C18.4266 8.88774 18.6539 8.13423 18.7209 7.35839C18.7878 6.58254 18.6929 5.80125 18.4422 5.06398C18.1914 4.32672 17.7904 3.64954 17.2643 3.07534C16.7383 2.50113 16.0988 2.0424 15.3863 1.72819C14.6737 1.41399 13.9037 1.25115 13.125 1.25ZM13.125 3.75C12.9592 3.75 12.8003 3.81585 12.6831 3.93306C12.5658 4.05027 12.5 4.20924 12.5 4.375C12.5 4.54076 12.5658 4.69973 12.6831 4.81694C12.8003 4.93415 12.9592 5 13.125 5C13.6223 5 14.0992 5.19754 14.4508 5.54917C14.8025 5.90081 15 6.37772 15 6.875C15 7.04076 15.0658 7.19973 15.1831 7.31694C15.3003 7.43415 15.4592 7.5 15.625 7.5C15.7908 7.5 15.9497 7.43415 16.0669 7.31694C16.1842 7.19973 16.25 7.04076 16.25 6.875C16.25 6.0462 15.9208 5.25134 15.3347 4.66529C14.7487 4.07924 13.9538 3.75 13.125 3.75Z" fill="white" />
                                                    </svg>
                                                </>
                                                :
                                                <>
                                                    <span className={styles.buttonText}>
                                                        {getFormattedNumber(
                                                            'cost' in selectedItem && selectedItem.cost
                                                                ? selectedItem.cost
                                                                : 'free_coins_price' in selectedItem
                                                                    ? selectedItem.free_coins_price
                                                                    : 0
                                                        )}
                                                    </span>
                                                    {selectedItem.donation_coins_price ? <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="14"
                                                        height="16"
                                                        viewBox="0 0 14 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.74769 0.244054C7.70082 0.178673 7.64177 0.123794 7.57407 0.0826933C7.50637 0.0415927 7.43141 0.0151136 7.35366 0.00483701C7.27591 -0.00543955 7.19697 0.000697173 7.12155 0.0228809C7.04613 0.0450646 6.97578 0.0828404 6.91469 0.133952C5.42412 1.37954 4.44091 3.16551 4.16214 5.13388C3.65128 4.74828 3.20349 4.27946 2.83603 3.74546C2.78612 3.67285 2.72144 3.61258 2.64659 3.56896C2.57175 3.52534 2.48858 3.49943 2.40302 3.49309C2.31746 3.48675 2.2316 3.50013 2.15158 3.53228C2.07155 3.56443 1.99932 3.61455 1.94003 3.67908C0.912836 4.79755 0.25439 6.22736 0.060072 7.76138C-0.134246 9.29541 0.145654 10.854 0.859228 12.2114C1.5728 13.5688 2.68299 14.6544 4.02899 15.3112C5.37498 15.9679 6.88689 16.1615 8.34569 15.8641C9.80449 15.5666 11.1344 14.7935 12.1429 13.6567C13.1513 12.5199 13.7859 11.0784 13.9547 9.54115C14.1235 8.00386 13.8177 6.45054 13.0817 5.10622C12.3457 3.76189 11.2176 2.69636 9.86091 2.06398C9.0269 1.64184 8.30225 1.01776 7.74769 0.244054ZM9.91535 9.9298C9.91506 10.3689 9.82325 10.8028 9.64625 11.2014C9.46925 11.6 9.21127 11.9539 8.89012 12.2387C8.56896 12.5235 8.19228 12.7323 7.78605 12.8509C7.37982 12.9694 6.95372 12.9948 6.53715 12.9254C6.12058 12.8559 5.72344 12.6931 5.37315 12.4484C5.02286 12.2036 4.72775 11.8827 4.50817 11.5077C4.2886 11.1328 4.1498 10.7127 4.10134 10.2764C4.05287 9.8402 4.09591 9.39822 4.22747 8.98098C4.71592 9.35743 5.27747 9.63673 5.88647 9.79055C6.05158 8.68221 6.58069 7.6677 7.38369 6.9198C8.08447 7.01694 8.72751 7.3757 9.19319 7.92938C9.65888 8.48305 9.91551 8.19393 9.91535 9.9298Z"
                                                            fill="white"
                                                        />
                                                    </svg>

                                                        : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ width: '12px', height: '12px' }}>
                                                            <path d="M12 6.36353L10.9091 8.54534H1.09091L0 6.36353H12Z" fill="white" />
                                                            <rect x="9.81818" y="12.3635" width="2.18182" height="7.63636" transform="rotate(90 9.81818 12.3635)" fill="white" />
                                                            <rect x="12" y="0.363525" width="2.18182" height="12" transform="rotate(90 12 0.363525)" fill="white" />
                                                            <rect x="4.90909" y="2" width="2.18182" height="12.5455" fill="white" />
                                                        </svg>}
                                                </>
                                        }
                                    </div>
                                </button>
                        }

                        {(!isBuyPopup && !isCasePopup) && (
                            <button
                                onClick={handleImportButton}
                                type="button"
                                className={`flex align__center justify__center ${styles.exportItemButton}`}
                            >
                                <span className={styles.buttonText}>Вывести в CS</span>
                            </button>
                        )}
                    </div>
                </div>
            ) : null}
        </Popup>
    )
}

export default SelectedItemPopup