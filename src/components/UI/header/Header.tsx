import React from 'react'
import styles from './Header.module.scss'
import TextWithCopy from '../textWithCopy/TextWithCopy'
import getImage from '../../../assets/getImage'
import { useLocation } from 'react-router-dom'

const Header: React.FC<{handleProfileClick: () => void, isProfileActive:boolean}> = ({handleProfileClick, isProfileActive}) => {

    const location = useLocation()

    const isHeaderVisible = !location.pathname.includes('gameMoney') && !location.pathname.includes('gameTap') && !location.pathname.includes('exchange')
    const isHeaderGray = location.pathname.includes('referal')

    return (
        isHeaderVisible && (
            <header className={`flex align__center justify__space__between ${styles.header} ${isProfileActive ? styles.profileActive : ''}`}>
                <div className={`flex align_center ${styles.aboutUserContainer}`}>
                    <div className={styles.userAvatar} onClick={handleProfileClick}>
                        <img src={getImage('avatar.png')} alt='Аватар' />
                    </div>

                    <div className={`flex column ${styles.userTextContainer}`}>
                        <span className={styles.username} onClick={handleProfileClick}>Grand Victorsha</span>
                        <TextWithCopy className='headerWalletContainer' id={styles.userWallet} text="1x..35vjgfj" linkValue="1x..35vjgfj" isHeaderGray={isHeaderGray}/>
                    </div>
                </div>

                <div className={`flex align__center ${styles.headerButtonsContainer}`}>
                    <a href='/notifications' type='button' className={`flex align__center justify__center headerNotificationButton ${isHeaderGray ? "lightButton" : ''} ${styles.headerButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14.857 17.082C16.7202 16.8614 18.5509 16.4217 20.311 15.772C18.8204 14.1208 17.9967 11.9745 18 9.75V9C18 7.4087 17.3678 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88257 3.63214 7.75735 4.75736C6.63213 5.88258 5.99999 7.4087 5.99999 9V9.75C6.00301 11.9746 5.17898 14.121 3.68799 15.772C5.42099 16.412 7.24799 16.857 9.14299 17.082M14.857 17.082C12.959 17.3071 11.041 17.3071 9.14299 17.082M14.857 17.082C15.0011 17.5319 15.0369 18.0094 14.9616 18.4757C14.8862 18.942 14.7018 19.384 14.4234 19.7656C14.1449 20.1472 13.7803 20.4576 13.3592 20.6716C12.9381 20.8856 12.4724 20.9972 12 20.9972C11.5276 20.9972 11.0619 20.8856 10.6408 20.6716C10.2197 20.4576 9.85506 20.1472 9.57661 19.7656C9.29816 19.384 9.11375 18.942 9.0384 18.4757C8.96305 18.0094 8.99889 17.5319 9.14299 17.082" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>

                    <a href='/settings' type='button' className={`flex align__center justify__center headerSettingsButton ${isHeaderGray ? "lightButton" : ''} ${styles.headerButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10.343 3.94C10.433 3.398 10.903 3 11.453 3H12.546C13.096 3 13.566 3.398 13.656 3.94L13.805 4.834C13.875 5.258 14.189 5.598 14.585 5.764C14.983 5.928 15.44 5.906 15.79 5.656L16.527 5.129C16.7438 4.97405 17.0085 4.90107 17.274 4.92305C17.5396 4.94502 17.7887 5.06053 17.977 5.249L18.75 6.023C19.14 6.412 19.19 7.025 18.87 7.473L18.343 8.21C18.093 8.56 18.071 9.016 18.236 9.414C18.401 9.811 18.741 10.124 19.166 10.194L20.059 10.344C20.602 10.434 20.999 10.903 20.999 11.453V12.547C20.999 13.097 20.602 13.567 20.059 13.657L19.165 13.806C18.741 13.876 18.401 14.189 18.236 14.586C18.071 14.984 18.093 15.44 18.343 15.79L18.87 16.528C19.19 16.975 19.139 17.588 18.75 17.978L17.976 18.751C17.7877 18.9392 17.5388 19.0546 17.2735 19.0765C17.0082 19.0985 16.7437 19.0257 16.527 18.871L15.789 18.344C15.439 18.094 14.983 18.072 14.586 18.237C14.188 18.402 13.876 18.742 13.805 19.166L13.656 20.06C13.566 20.602 13.096 21 12.546 21H11.452C10.902 21 10.433 20.602 10.342 20.06L10.194 19.166C10.123 18.742 9.81002 18.402 9.41302 18.236C9.01502 18.072 8.55902 18.094 8.20902 18.344L7.47102 18.871C7.02402 19.191 6.41102 19.14 6.02102 18.751L5.24802 17.977C5.05955 17.7887 4.94405 17.5395 4.92207 17.274C4.90009 17.0085 4.97308 16.7438 5.12802 16.527L5.65502 15.79C5.90502 15.44 5.92702 14.984 5.76302 14.586C5.59802 14.189 5.25702 13.876 4.83302 13.806L3.93902 13.656C3.39702 13.566 2.99902 13.096 2.99902 12.547V11.453C2.99902 10.903 3.39702 10.433 3.93902 10.343L4.83302 10.194C5.25702 10.124 5.59802 9.811 5.76302 9.414C5.92802 9.016 5.90602 8.56 5.65502 8.21L5.12902 7.472C4.97408 7.25524 4.90109 6.99053 4.92307 6.72499C4.94505 6.45945 5.06055 6.21034 5.24902 6.022L6.02202 5.249C6.21036 5.06053 6.45948 4.94502 6.72501 4.92305C6.99055 4.90107 7.25527 4.97405 7.47202 5.129L8.20902 5.656C8.55902 5.906 9.01602 5.928 9.41302 5.763C9.81002 5.598 10.123 5.258 10.193 4.834L10.343 3.94Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </header>
        )
    )
}

export default Header
