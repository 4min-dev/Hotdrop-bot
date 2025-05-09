import React, { useState } from 'react'
import styles from './SteamAccount.module.scss'
import NamedInput from '../../UI/namedInput/NamedInput'
import SaveButton from '../../UI/buttons/saveButton/SaveButton'

const SteamAccount: React.FC = () => {

    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [steamTradeLinkValue, setSteamTradeLinkValue] = useState<string>('')
    const [steamTradeLinkChangeValue, setSteamTradeLinkChangeValue] = useState<string>('')

    function saveTradeLinkHandler() {
        setSteamTradeLinkValue(steamTradeLinkChangeValue)
        setIsDisabledButton(true)
    }

    function handleTradeLinkInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setIsDisabledButton(true)
        } else if (steamTradeLinkValue === event.target.value) {
            setIsDisabledButton(true)
        } else {
            setIsDisabledButton(false)
        }

        setSteamTradeLinkChangeValue(event.target.value)
    }

    return (
        <div className={styles.steamAccountPage}>
            <span className={styles.pageTitle}>Аккаунт Steam</span>

            <div className={`flex column ${styles.steamAccountPageMainUi}`}>
                <NamedInput inputName='TradeURL' inputPlaceholder='TradeURL' inputType='text' defaultInputValue={steamTradeLinkValue} onChangeHandler={handleTradeLinkInput} />
                <div className={`flex align__center justify__space__between ${styles.steamConnectLink}`}>
                    <div className={`flex align__center ${styles.steamConnectLinkUi}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <g clip-path="url(#clip0_517_1344)" filter="url(#filter0_d_517_1344)">
                                <path d="M17.9793 6.00037C11.6644 6.00037 6.49125 10.857 6 17.0285L12.4429 19.6855C13.0055 19.3006 13.6736 19.0948 14.3578 19.0956C14.4218 19.0956 14.4849 19.0974 14.5472 19.1008L17.4128 14.9579V14.8999C17.4128 12.407 19.4462 10.3783 21.9458 10.3783C24.4454 10.3783 26.4788 12.407 26.4788 14.8999C26.4788 17.3927 24.4454 19.4222 21.9458 19.4222C21.9112 19.4222 21.8774 19.4213 21.8429 19.4205L17.7561 22.328C17.7587 22.3819 17.7604 22.4357 17.7604 22.4887C17.7604 24.3609 16.2338 25.8835 14.3578 25.8835C12.711 25.8835 11.3332 24.7106 11.0218 23.1581L6.41344 21.2576C7.84059 26.2904 12.4765 29.9801 17.9793 29.9801C24.6185 29.9801 30 24.6114 30 17.9902C30 11.3683 24.6185 6.00037 17.9793 6.00037ZM13.533 24.193L12.0565 23.5844C12.3178 24.128 12.771 24.5828 13.3721 24.8325C14.6712 25.3728 16.1693 24.7581 16.7108 23.4612C16.9729 22.8376 16.9745 22.1368 16.7151 21.5121C16.4556 20.8829 15.9652 20.3921 15.3364 20.1306C14.7111 19.8716 14.0416 19.8809 13.4534 20.1024L14.9792 20.7316C15.9375 21.13 16.3907 22.2276 15.9911 23.1834C15.5924 24.1391 14.4913 24.5914 13.533 24.193ZM24.9665 14.8999C24.9665 13.2389 23.6111 11.8865 21.9461 11.8865C20.2803 11.8865 18.9249 13.2389 18.9249 14.8999C18.9249 16.5609 20.2803 17.9125 21.9461 17.9125C23.6111 17.9125 24.9665 16.5609 24.9665 14.8999ZM19.6818 14.8948C19.6818 13.6449 20.698 12.6319 21.9505 12.6319C23.2038 12.6319 24.22 13.6449 24.22 14.8948C24.22 16.1446 23.2038 17.1577 21.9504 17.1577C20.698 17.1577 19.6817 16.1446 19.6817 14.8949L19.6818 14.8948Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_517_1344" x="0.3" y="0.3" width="35.4" height="35.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="2.85" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_517_1344" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_517_1344" result="shape" />
                                </filter>
                                <clipPath id="clip0_517_1344">
                                    <rect width="24" height="24" fill="white" transform="translate(6 6)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className={styles.steamConnectLinkTitle}>Профиль Steam</span>
                    </div>

                    {
                        isConnected ? <span className={`flex align__center justify__center ${styles.steamConnectLinkStatus} ${styles.connectedStatus}`}>Connected</span>
                            : <a href='#' className={`flex align__center justify__center ${styles.steamConnectLinkStatus} ${styles.notConnectedStatus}`}>Подключить</a>
                    }
                </div>

                <SaveButton handleSaveButton={saveTradeLinkHandler} buttonText='Сохранить' isDisabled={isDisabledButton} />
            </div>

            <div className={styles.copyright}>
                ©Bonsai Casino 2025
            </div>
        </div>
    )
}

export default SteamAccount
