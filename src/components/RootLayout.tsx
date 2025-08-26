import React, { useEffect, useState } from 'react'
import styles from './RootLayout.module.scss'
import Header from './UI/header/Header'
import Navbar from './UI/navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Popup from './UI/popups/popup/Popup'
import getImage from '../assets/getImage'
import TextWithCopy from './UI/textWithCopy/TextWithCopy'
import getFormattedNumber from '../assets/getFormattedNumber'
import { LevelProfileProvider } from '../context/levelProfile/LevelProfileContext'
import { NotificationProvider } from '../providers/notification/NotificationProvider'
import Notifications from './UI/notifications/Notifications'
import { useGetUserQuery } from '../redux/services/userService'
import { domain } from '../assets/domain'
import { getUserAvatar } from '../assets/initData'
import { useGetUsersRatingQuery } from '../redux/services/listService'
import { useAddReferralMutation } from '../redux/services/referralService'
const backButton = window.Telegram.WebApp.BackButton

const RootLayout: React.FC = () => {
    const [loader, setLoader] = useState({ status: true, percentage: 20 })
    const [userAvatar, setUserAvatar] = useState<string>('')
    const { data: usersRatingData } = useGetUsersRatingQuery()
    const { data: userData } = useGetUserQuery()
    const [handleAddReferral] = useAddReferralMutation()
    const [referral, setReferral] = useState<{ cryptedLink: string, uncryptedLink: string }>({ cryptedLink: 'Загрузка..', uncryptedLink: '' })
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

    useEffect(() => {
        const userId = userData?.id

        if (userId) {
            const start = userId.slice(0, 3)
            const end = userId.slice(-8)
            const cryptedReferralLink = `${start}..${end}`
            const referralLink = `${domain}?referrer=${userId}`

            setReferral({ ...referral, cryptedLink: cryptedReferralLink, uncryptedLink: referralLink })
        }

    }, [userData])

    useEffect(() => {
        if (location.pathname !== '/') {
            backButton.show()
        } else {
            backButton.hide()
        }

        backButton.onClick(() => {
            window.history.back()
        })

        return () => {
            backButton.offClick()
            backButton.hide()
        }
    }, [location.pathname])

    const isSelectedGamePage = window.location.href.includes('games/')

    useEffect(() => {
        if (!localStorage.getItem('isAnimation')) {
            localStorage.setItem('isAnimation', 'true')
        }
        if (!localStorage.getItem('isVibration')) {
            localStorage.setItem('isVibration', 'true')
        }

        const isAnimation = localStorage.getItem('isAnimation')
        if (isAnimation === 'false') {
            document.body.id = 'noAnimations'
        } else {
            document.body.removeAttribute('id')
        }


    }, [])

    async function addNewReferral(userId: string) {
        try {
            const response = await handleAddReferral(userId)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const avatar = getUserAvatar()
        setUserAvatar(avatar)
    }, [])

    useEffect(() => {
        const startappParam = window.Telegram?.WebApp?.initDataUnsafe.start_param

        if (startappParam) {
            console.log('Add new referral')
            addNewReferral(startappParam)
        } else {
            console.log("No startapp param")
        }
    }, [])

    return (
        <NotificationProvider>
            <Notifications />
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
                                    <img src={userAvatar} alt='Аватар' />
                                </div>
                                <span className={styles.userProfileLevel}>
                                    {`${userData?.lvl.lvl || '0'} LVL`}
                                </span>
                            </div>

                            <div className={`flex column align__center ${styles.userProfilePersonalContent}`}>
                                <span className={styles.username}>{userData?.username || 'Загрузка..'}</span>
                                <TextWithCopy linkValue={referral.uncryptedLink} text={referral.cryptedLink} id={"user__link"} />
                            </div>

                            <div className={`flex column ${styles.userExperienceContainer}`}>
                                <div className={`flex align__center justify__space__between ${styles.userExperienceIndicatorWrapper}`}>
                                    <div className={styles.userExperienceIndicator} style={{ 'width': userData?.lvl!.lvl_percent_progress! >= 10 ? userData?.lvl.lvl_percent_progress : '10%' }} />
                                    <span className={styles.currentExperiencePercent}>{`${userData?.lvl.lvl_percent_progress || '0'}%`}</span>
                                    <span className={styles.totalExperienceValue}>
                                        {
                                            `
                                            ${userData?.lvl.points.toLocaleString('en-US') || '0'}/${userData?.lvl.next_lvl_points.toLocaleString('en-US') || '0'}
                                            `
                                        }
                                    </span>
                                </div>
                                <div className={`flex align__center justify__space__between ${styles.userLevelContainer}`}>
                                    <span className={styles.currentUserLevel}><span className={styles.mono}>{userData?.lvl.lvl || '0'}</span> LVL</span>
                                    <span className={styles.nextUserLevel}><span className={styles.mono}>{userData?.lvl.lvl! + 1 || '0'}</span> LVL</span>
                                </div>
                            </div>

                            <div className={`flex column ${styles.ratingCardsBlock}`}>
                                <span className={styles.ratingCardsBlockTitle}>Рейтинг игроков</span>

                                <div className={`flex column ${styles.ratingCardsContainer}`}>
                                    {usersRatingData && usersRatingData.data.length > 0 && usersRatingData.data.map((user, index) => (
                                        <div key={index} className={`flex align__center justify__space__between ${styles.userCard}`}>
                                            <div className={`flex align__center ${styles.aboutuserContainer}`}>
                                                <div className={`flex align__center justify__center ${styles.userAvatar}`}>
                                                    <img src={user.avatar_url} alt='Аватар' />
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
                                                                {getFormattedNumber(user.free_tokens_balance)}
                                                            </span>
                                                        </div>

                                                        <div className={`flex align__center justify__center ${styles.userLevel}`}>
                                                            <span className={styles.mono}>
                                                                {user.lvl.toString()[0]}{user.lvl.toString().slice(1)}
                                                            </span>
                                                            &nbsp;
                                                            {user.lvl.toString() && (
                                                                <>
                                                                    LVL
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className={styles.userTableNumericId}>
                                                {getFormattedTableNumericId(index + 1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <span className={styles.copyright}>
                                ©Hotdrop 2025
                            </span>
                        </div>
                    </div>
                </Popup>

                <Popup isActive={isProfileActive} closePopupHandler={closeProfilePopupHandler}>
                    <div className={styles.profilePopup} id={styles.personalProfilePopup} onClick={(e) => e.stopPropagation()}>
                        <button type='button' className={`flex align__center justify__center ${styles.closePopupButton}`} onClick={closeProfilePopupHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 12L12 2M2 2L12 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.userProfileContent}>
                            <div className={`flex column align__center ${styles.userProfileAvatarContainer}`}>
                                <div className={styles.userProfileAvatar}>
                                    <img src={userAvatar} alt='Аватар' />
                                </div>
                                <span className={styles.userProfileLevel}>
                                    {`${userData?.lvl.lvl} LVL`}
                                </span>
                            </div>

                            <div className={`flex column align__center ${styles.userProfilePersonalContent}`}>
                                <span className={styles.username}>{userData?.username || 'Загрузка..'}</span>
                                <TextWithCopy linkValue={referral.uncryptedLink} text={referral.cryptedLink} id={"user__settings__popup__link"} />
                            </div>

                            <div className={`flex column ${styles.userExperienceContainer}`}>
                                <div className={styles.userExperienceIndicatorWrapper}>
                                    <div className={styles.userExperienceIndicator} style={{ 'width': userData?.lvl!.lvl_percent_progress! >= 10 ? userData?.lvl.lvl_percent_progress : '10%' }} />
                                </div>
                                <div className={`flex align__center justify__space__between ${styles.userLevelContainer}`}>
                                    <span className={styles.currentUserLevel}><span className={styles.mono}>{userData?.lvl.lvl || '0'}</span> LVL</span>
                                    <span className={styles.nextUserLevel}><span className={styles.mono}>{userData?.lvl.lvl! + 1 || '0'}</span> LVL</span>
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


                                <a href='/referral' className={`flex align__center justify__space__between ${styles.userPersonalLinkCard}`}>
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
                            <span className={styles.copyright}>
                                ©Hotdrop 2025
                            </span>
                        </div>
                    </div>
                </Popup>

                <Header handleProfileClick={handleProfileClick} isProfileActive={isProfileActive || isLevelProfileActive} isSelectedGamePage={isSelectedGamePage} />
                <Outlet />
                <Navbar />
            </LevelProfileProvider>
        </NotificationProvider>
    )
}

export default RootLayout