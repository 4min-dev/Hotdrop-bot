import React from 'react'
import styles from './SelectedEvent.module.scss'
import Popup from '../popup/Popup'
import IEventsData from '../../../../interfaces/IEventData'
import getImage from '../../../../assets/getImage'
import { useNotification } from '../../../../providers/notification/NotificationProvider'

type TSelectedEvent = {
    isSelectedEventActive: boolean,
    closeSelectedEventHandler: () => void,
    selectedEvent: IEventsData
}

const SelectedEvent: React.FC<TSelectedEvent> = ({ isSelectedEventActive, closeSelectedEventHandler, selectedEvent }) => {
    const { addNotification } = useNotification()

    function getFormattedReward() {
        const reward = selectedEvent.reward
        const formattedNumber = reward.toLocaleString()

        const parts = formattedNumber.split(',')

        const formattedParts = parts.map((part, index) => {
            if (index === 0) {
                return part
            } else {
                return (
                    <React.Fragment key={index}>
                        <span className={styles.symbol}>,</span>
                        {part}
                    </React.Fragment>
                )
            }
        })

        return (
            <span className={styles.rewardValue}>
                +{formattedParts}
            </span>
        )
    }

    function handleCopyLink() {
        addNotification('Ссылка успешно скопирована!')
        navigator.clipboard.writeText(selectedEvent.linkToEvent)
    }

    return (
        <Popup isActive={isSelectedEventActive} closePopupHandler={closeSelectedEventHandler}>
            <div className={styles.selectedEventPopup} onClick={(e) => e.stopPropagation()}>
                {
                    selectedEvent && (
                        <>
                            <button type='button' className={`flex align__center justify__center ${styles.closePopupButton}`} onClick={closeSelectedEventHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 12L12 2M2 2L12 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>

                            <div className={`flex column align__center ${styles.selectedEventHeading}`}>
                                <div className={`flex align__center ${styles.selectedEventPreview}`} style={{ "--background-color": selectedEvent.backgroundEffect }}>
                                    <img src={getImage(selectedEvent.img)} alt={selectedEvent.title} />
                                </div>

                                <span className={styles.selectedEventTitle}>
                                    {selectedEvent.title}
                                </span>

                                <span className={`flex align__center ${styles.selectedEventReward}`}>
                                    {getFormattedReward()} <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1749 0.396588C12.1013 0.290344 12.0085 0.201165 11.9021 0.134377C11.7957 0.0675881 11.6779 0.0245595 11.5557 0.00786014C11.4336 -0.00883927 11.3095 0.00113291 11.191 0.0371814C11.0725 0.0732299 10.9619 0.134616 10.8659 0.217673C8.52361 2.24175 6.97857 5.14395 6.5405 8.34256C5.73772 7.71596 5.03406 6.95412 4.45662 6.08638C4.37819 5.96837 4.27655 5.87044 4.15893 5.79956C4.04132 5.72867 3.91063 5.68658 3.77617 5.67628C3.64172 5.66597 3.5068 5.68772 3.38105 5.73996C3.25529 5.7922 3.14179 5.87364 3.04862 5.9785C1.43446 7.79602 0.399756 10.1195 0.0943988 12.6123C-0.210958 15.105 0.228885 17.6377 1.35021 19.8435C2.47154 22.0492 4.21613 23.8135 6.33127 24.8806C8.4464 25.9478 10.8222 26.2625 13.1147 25.7791C15.4071 25.2958 17.497 24.0395 19.0817 22.1921C20.6664 20.3448 21.6636 18.0025 21.9288 15.5044C22.1941 13.0063 21.7136 10.4821 20.557 8.2976C19.4004 6.11307 17.6277 4.38159 15.4957 3.35396C14.1851 2.66799 13.0464 1.65387 12.1749 0.396588ZM15.5813 16.1359C15.5808 16.8495 15.4365 17.5545 15.1584 18.2023C14.8802 18.85 14.4749 19.4251 13.9702 19.8879C13.4655 20.3507 12.8736 20.6901 12.2352 20.8827C11.5969 21.0753 10.9273 21.1166 10.2727 21.0037C9.61805 20.8908 8.99398 20.6263 8.44352 20.2286C7.89306 19.8309 7.42932 19.3094 7.08427 18.7001C6.73923 18.0907 6.52111 17.4081 6.44496 16.6992C6.3688 15.9903 6.43643 15.2721 6.64317 14.5941C7.41073 15.2058 8.29317 15.6597 9.25017 15.9096C9.50963 14.1086 10.3411 12.46 11.6029 11.2447C12.7042 11.4025 13.7147 11.9855 14.4464 12.8852C15.1782 13.7849 15.5815 14.9401 15.5813 16.1359Z" fill="#9E46F9" />
                                    </svg>
                                </span>
                            </div>

                            <div className={`flex column ${styles.selectedEventMainUi}`}>
                                <div className={`flex align__center ${styles.selectedEventCopyContainer}`}>
                                    <span className={styles.selectedEventLinkToCopy}>
                                        {selectedEvent.linkToEvent}
                                    </span>

                                    <button type='button' className={styles.selectedEventCopyLinkButton} onClick={handleCopyLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                            <path d="M6.125 2.53125C6.125 1.75425 6.755 1.125 7.53125 1.125H7.8125C8.55842 1.125 9.27379 1.42132 9.80124 1.94876C10.3287 2.47621 10.625 3.19158 10.625 3.9375V5.34375C10.625 6.12075 11.255 6.75 12.0312 6.75H13.4375C14.1834 6.75 14.8988 7.04632 15.4262 7.57376C15.9537 8.10121 16.25 8.81658 16.25 9.5625V12.0938C16.25 12.87 15.62 13.5 14.8438 13.5H7.53125C7.15829 13.5 6.8006 13.3518 6.53688 13.0881C6.27316 12.8244 6.125 12.4667 6.125 12.0938V2.53125Z" fill="white" />
                                            <path d="M11.75 3.93756C11.7513 2.99147 11.4106 2.07678 10.7907 1.36206C12.0457 1.69203 13.1905 2.34942 14.1081 3.26698C15.0256 4.18453 15.683 5.32934 16.013 6.58431C15.2983 5.96442 14.3836 5.62375 13.4375 5.62506H12.0312C11.9567 5.62506 11.8851 5.59543 11.8324 5.54268C11.7796 5.48994 11.75 5.4184 11.75 5.34381V3.93756ZM4.15625 4.50006H5V12.0938C5 12.7651 5.26668 13.409 5.74139 13.8837C6.21609 14.3584 6.85992 14.6251 7.53125 14.6251H12.875V15.4688C12.875 16.2451 12.245 16.8751 11.4688 16.8751H4.15625C3.78329 16.8751 3.4256 16.7269 3.16188 16.4632C2.89816 16.1995 2.75 15.8418 2.75 15.4688V5.90631C2.75 5.12931 3.38 4.50006 4.15625 4.50006Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`flex ${styles.hintContainer}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.375 10C2.375 5.5125 6.0125 1.875 10.5 1.875C14.9875 1.875 18.625 5.5125 18.625 10C18.625 14.4875 14.9875 18.125 10.5 18.125C6.0125 18.125 2.375 14.4875 2.375 10ZM9.63 8.79833C10.585 8.32083 11.6608 9.18417 11.4017 10.22L10.8108 12.5833L10.8458 12.5667C10.9927 12.5021 11.1587 12.4965 11.3096 12.551C11.4605 12.6054 11.5846 12.7158 11.6564 12.8593C11.7281 13.0028 11.7419 13.1684 11.695 13.3217C11.648 13.4751 11.5439 13.6046 11.4042 13.6833L11.3708 13.7017C10.415 14.1792 9.33917 13.3158 9.59833 12.28L10.19 9.91667L10.155 9.93333C10.0813 9.9743 10 9.99993 9.91615 10.0087C9.83226 10.0174 9.74748 10.0091 9.6669 9.98418C9.58632 9.95928 9.51161 9.91834 9.44727 9.86381C9.38294 9.80927 9.3303 9.74229 9.29254 9.66687C9.25478 9.59146 9.23267 9.50919 9.22754 9.425C9.22242 9.34082 9.23439 9.25647 9.26272 9.17704C9.29106 9.0976 9.33518 9.02472 9.39243 8.96279C9.44968 8.90086 9.51887 8.85115 9.59583 8.81667L9.63 8.79833ZM10.5 7.5C10.6658 7.5 10.8247 7.43415 10.9419 7.31694C11.0592 7.19973 11.125 7.04076 11.125 6.875C11.125 6.70924 11.0592 6.55027 10.9419 6.43306C10.8247 6.31585 10.6658 6.25 10.5 6.25C10.3342 6.25 10.1753 6.31585 10.0581 6.43306C9.94085 6.55027 9.875 6.70924 9.875 6.875C9.875 7.04076 9.94085 7.19973 10.0581 7.31694C10.1753 7.43415 10.3342 7.5 10.5 7.5Z" fill="white" />
                                    </svg>

                                    <span className={styles.hint}>
                                        {selectedEvent.hint}
                                    </span>
                                </div>

                                {
                                    selectedEvent.etaps.length > 0 && (
                                        <div className={`flex column ${styles.etapsContainer}`}>
                                            {
                                                selectedEvent.etaps.map((etap, i) => (
                                                    <div key={etap.id} className={`flex align__center ${styles.etapCard}`}>
                                                        <span className={`flex align__center justify__center ${styles.etapNumber}`}>
                                                            {i + 1}
                                                        </span>

                                                        <span className={styles.etapTitle}>
                                                            {etap.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }

                                <button type='button' className={styles.completeButton}>
                                    Выполнить задание
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </Popup>
    )
}

export default SelectedEvent
