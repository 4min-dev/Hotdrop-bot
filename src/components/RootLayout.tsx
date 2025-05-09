import React, { useEffect, useState } from 'react'
import styles from './RootLayout.module.scss'
import Header from './UI/header/Header'
import Navbar from './UI/navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Popup from './UI/popups/popup/Popup'
import getImage from '../assets/getImage'
import TextWithCopy from './UI/textWithCopy/TextWithCopy'
import getFormattedNumber from '../assets/getFormattedNumber'
import { IReferal } from '../interfaces/IReferal'
import { LevelProfileProvider } from '../context/levelProfile/LevelProfileContext'
import { NotificationProvider } from '../providers/notification/NotificationProvider'
import Notifications from './UI/notifications/Notifications'

const RootLayout: React.FC = () => {

    const [isProfileActive, setProfileActive] = useState<boolean>(false)
    const [isLevelProfileActive, setLevelProfileActive] = useState<boolean>(false)

    function handleProfileClick() {
        setProfileActive(true)
    }

    function closeProfilePopupHandler() {
        setProfileActive(false)
    }

    function handleLevelProfileClick() {
        setLevelProfileActive(true)
    }

    function closeLevelProfilePopupHandler() {
        setLevelProfileActive(false)
    }

    const [users, setUsers] = useState<IReferal[]>([
        {
            id: 1,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 2,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 2
        },

        {
            id: 3,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 3
        },

        {
            id: 4,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 4
        },

        {
            id: 5,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 5
        },

        {
            id: 6,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 6
        },
    ])

    function getFormattedTableNumericId(numbericId: number): JSX.Element {
        const paddedId = numbericId.toString().length === 1 ? `0${numbericId}` : `${numbericId}`
        return (
            <React.Fragment>
                <span className={styles.symbol}>#</span>
                {paddedId}
            </React.Fragment>
        )
    }

    const location = useLocation()

    useEffect(() => {
        const checkPopupsAndScroll = () => {
            const popupOverlays = Array.from(document.querySelectorAll('.popup__overlay'))
            const isAnyPopupVisible = popupOverlays.some((el) => el.classList.contains('visible'))
            const isGamesRoute = location.pathname === '/games'

            if (isAnyPopupVisible && isGamesRoute) {
                document.body.style.overflow = 'hidden'

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            } else {
                document.body.style.overflow = 'auto'
            }
        }

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class' &&
                    mutation.target instanceof Element
                ) {
                    checkPopupsAndScroll()
                }
            }
        })

        const popupOverlays = document.querySelectorAll('.popup__overlay')
        popupOverlays.forEach((popup) => {
            observer.observe(popup, { attributes: true })
        })

        checkPopupsAndScroll()

        return () => {
            observer.disconnect()
            document.body.style.overflow = 'auto'
        }
    }, [location.pathname])

    return (
        <NotificationProvider>
            <Notifications/>
            <LevelProfileProvider handleLevelProfileClick={handleLevelProfileClick}>
                <Popup isActive={isLevelProfileActive} closePopupHandler={closeLevelProfilePopupHandler}>
                    <div className={styles.profilePopup} onClick={(e) => e.stopPropagation()}>
                        <button type='button' className={`flex align__center justify__center ${styles.issueButton}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="16" viewBox="0 0 6 16" fill="none">
                                <path d="M1.81006 5.60634L1.87512 5.56876C2.07858 5.44839 2.30691 5.39959 2.53308 5.42813C2.75924 5.45668 2.97376 5.56137 3.15123 5.72981C3.3287 5.89826 3.4617 6.1234 3.53446 6.37857C3.60723 6.63375 3.61672 6.90828 3.56181 7.16964L2.4384 12.4984C2.3831 12.7599 2.39229 13.0347 2.46489 13.2902C2.53749 13.5457 2.67045 13.7712 2.848 13.9399C3.02555 14.1086 3.24023 14.2135 3.4666 14.2421C3.69296 14.2706 3.92149 14.2217 4.1251 14.1012L4.19015 14.0617M3.00011 1.7545V1.75" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <button type='button' className={`flex align__center justify__center ${styles.closePopupButton}`} onClick={closeLevelProfilePopupHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 12L12 2M2 2L12 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.userProfileContent}>
                            <div className={`flex column align__center ${styles.userProfileAvatarContainer}`}>
                                <div className={styles.userProfileAvatar}>
                                    <img src={getImage('thinkingDuck.png')} alt='Аватар' />
                                </div>
                                <span className={styles.userProfileLevel}>
                                    13 LVL
                                </span>
                            </div>

                            <div className={`flex column align__center ${styles.userProfilePersonalContent}`}>
                                <span className={styles.username}>Grand Victorsha</span>
                                <TextWithCopy linkValue='https//vfk1x849fh35vjgfj' text='https//vfk1x849fh35vjgfj' id={"user__link"} />
                            </div>

                            <div className={`flex column ${styles.userExperienceContainer}`}>
                                <div className={`flex align__center justify__space__between ${styles.userExperienceIndicatorWrapper}`}>
                                    <div className={styles.userExperienceIndicator} />
                                    <span className={styles.currentExperiencePercent}>10%</span>
                                    <span className={styles.totalExperienceValue}>2,234/70,000</span>
                                </div>
                                <div className={`flex align__center justify__space__between ${styles.userLevelContainer}`}>
                                    <span className={styles.currentUserLevel}><span className={styles.mono}>13</span> LVL</span>
                                    <span className={styles.nextUserLevel}><span className={styles.mono}>14</span> LVL</span>
                                </div>
                            </div>

                            <div className={`flex column ${styles.ratingCardsBlock}`}>
                                <span className={styles.ratingCardsBlockTitle}>Рейтинг игроков</span>

                                <div className={`flex column ${styles.ratingCardsContainer}`}>
                                    {users && users.length > 0 ? users.map((user) => (
                                        <div key={user.id} className={`flex align__center justify__space__between ${styles.userCard}`}>
                                            <div className={`flex align__center ${styles.aboutuserContainer}`}>
                                                <div className={`flex align__center justify__center ${styles.userAvatar}`}>
                                                    <img src={getImage(user.avatar)} alt='Аватар' />
                                                </div>

                                                <div className={`flex column ${styles.textContainer}`}>
                                                    <span className={styles.userUsername}>
                                                        {user.username}
                                                    </span>
                                                    <div className={`flex align__center ${styles.userNumericDataContainer}`}>
                                                        <div className={`flex align__center ${styles.userTotalAmount}`}>
                                                            <div className={styles.userTotalProfitPreview}>
                                                                <img src={getImage('fire.png')} alt='Токен' />
                                                            </div>
                                                            <span className={styles.userTotalProfit}>
                                                                {getFormattedNumber(user.totalProfit)}
                                                            </span>
                                                        </div>

                                                        <div className={`flex align__center justify__center ${styles.userLevel}`}>
                                                            <span className={styles.mono}>
                                                                {user.level.toString()[0]}{user.level.toString().slice(1)}
                                                            </span>
                                                            &nbsp;
                                                            {user.level.toString().slice(1) && (
                                                                <>
                                                                    LVL
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className={styles.userTableNumericId}>
                                                {getFormattedTableNumericId(user.tableNumericValue)}
                                            </span>
                                        </div>
                                    )) : <h3>Загрузка..</h3>}
                                </div>
                            </div>
                        </div>

                        <span className={styles.copyright}>
                            ©Hotdrop 2025
                        </span>
                    </div>
                </Popup>

                <Popup isActive={isProfileActive} closePopupHandler={closeProfilePopupHandler}>
                    <div className={styles.profilePopup} onClick={(e) => e.stopPropagation()}>
                        <button type='button' className={`flex align__center justify__center ${styles.closePopupButton}`} onClick={closeProfilePopupHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 12L12 2M2 2L12 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.userProfileContent}>
                            <div className={`flex column align__center ${styles.userProfileAvatarContainer}`}>
                                <a href='/profileNameSettings' type='button' className={`flex align__center justify__center ${styles.userProfileAvatarChangeDataButton}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M13.4875 0.512461C13.1594 0.184335 12.7143 0 12.2502 0C11.7861 0 11.341 0.184335 11.0129 0.512461L10.2415 1.2838L12.7162 3.75847L13.4875 2.98713C13.8157 2.65895 14 2.21388 14 1.7498C14 1.28572 13.8157 0.840642 13.4875 0.512461ZM12.0089 4.46581L9.53419 1.99113L1.43417 10.0912C1.02274 10.5024 0.72029 11.0097 0.554171 11.5672L0.0208365 13.3572C-0.00491286 13.4435 -0.00683331 13.5353 0.0152784 13.6227C0.03739 13.71 0.0827114 13.7898 0.146447 13.8536C0.210183 13.9173 0.289962 13.9626 0.377343 13.9847C0.464725 14.0068 0.556459 14.0049 0.642838 13.9792L2.43284 13.4458C2.99033 13.2797 3.49762 12.9773 3.90885 12.5658L12.0089 4.46581Z" fill="white" />
                                    </svg>
                                </a>
                                <div className={styles.userProfileAvatar}>
                                    <img src={getImage('thinkingDuck.png')} alt='Аватар' />
                                </div>
                                <span className={styles.userProfileLevel}>
                                    13 LVL
                                </span>
                            </div>

                            <div className={`flex column align__center ${styles.userProfilePersonalContent}`}>
                                <span className={styles.username}>Grand Victorsha</span>
                                <TextWithCopy linkValue='https//vfk1x849fh35vjgfj' text='https//vfk1x849fh35vjgfj' id={"user__link"} />
                            </div>

                            <div className={`flex column ${styles.userExperienceContainer}`}>
                                <div className={styles.userExperienceIndicatorWrapper}>
                                    <div className={styles.userExperienceIndicator} />
                                </div>
                                <div className={`flex align__center justify__space__between ${styles.userLevelContainer}`}>
                                    <span className={styles.currentUserLevel}><span className={styles.mono}>13</span> LVL</span>
                                    <span className={styles.nextUserLevel}><span className={styles.mono}>14</span> LVL</span>
                                </div>
                            </div>

                            <div className={`flex column ${styles.userPersonalLinksContainer}`}>
                                <a href='/profileNameSettings' className={`flex align__center justify__space__between ${styles.userPersonalLinkCard}`}>
                                    <div className={`flex column ${styles.userPersonalLinkTextContainer}`}>
                                        <span className={styles.userPersonalLinkTitle}>Личные данные</span>
                                        <span className={styles.userPersonalLinkDescription}>Управляйте вашим личным аккаунтом</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.2" />
                                        <g clip-path="url(#clip0_175_1476)">
                                            <path d="M14 21L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 16L14 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_175_1476">
                                                <rect width="24" height="24" fill="white" transform="translate(4 4)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>


                                <a href='/referal' className={`flex align__center justify__space__between ${styles.userPersonalLinkCard}`}>
                                    <div className={`flex column ${styles.userPersonalLinkTextContainer}`}>
                                        <span className={styles.userPersonalLinkTitle}>Реферальная система</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.2" />
                                        <g clip-path="url(#clip0_175_1476)">
                                            <path d="M14 21L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 16L14 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_175_1476">
                                                <rect width="24" height="24" fill="white" transform="translate(4 4)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>

                                <a href='/steamAccount' className={`flex align__center justify__space__between ${styles.userPersonalLinkCard}`}>
                                    <div className={`flex column ${styles.userPersonalLinkTextContainer}`}>
                                        <span className={styles.userPersonalLinkTitle}>Аккаунт Steam</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.2" />
                                        <g clip-path="url(#clip0_175_1476)">
                                            <path d="M14 21L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 16L14 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_175_1476">
                                                <rect width="24" height="24" fill="white" transform="translate(4 4)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>

                                <a href='/settings' className={`flex align__center justify__space__between ${styles.userPersonalLinkCard}`}>
                                    <div className={`flex column ${styles.userPersonalLinkTextContainer}`}>
                                        <span className={styles.userPersonalLinkTitle}>Настройки</span>
                                        <span className={styles.userPersonalLinkDescription}>Язык, анимация и вибрация</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.2" />
                                        <g clip-path="url(#clip0_175_1476)">
                                            <path d="M14 21L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 16L14 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_175_1476">
                                                <rect width="24" height="24" fill="white" transform="translate(4 4)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <span className={styles.copyright}>
                            ©Hotdrop 2025
                        </span>
                    </div>
                </Popup>

                <Header handleProfileClick={handleProfileClick} isProfileActive={isProfileActive || isLevelProfileActive} />
                <Outlet />
                <Navbar />
            </LevelProfileProvider>
        </NotificationProvider>
    )
}

export default RootLayout
