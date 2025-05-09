import React, { useState } from 'react'
import styles from './Events.module.scss'
import Filter from '../../UI/filter/Filter'
import IFilter from '../../../interfaces/IFilter'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import getImage from '../../../assets/getImage'
import ImagePreview from '../../UI/imagePreview/ImagePreview'
import Done from '../../svg/Done'
import SelectedEvent from '../../UI/popups/selectedEvent/SelectedEvent'
import IEventsData from '../../../interfaces/IEventData'
import { useNotification } from '../../../providers/notification/NotificationProvider'

type TDailyReward = {
    id: number,
    day: number,
    isClaimed: boolean,
    reward: number
}

const EventsPage: React.FC = () => {
    const { addNotification, removeNotification  } = useNotification()
    const [isSelectedEventActive, setSelectedEventActive] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<IEventsData | null>(null)
    const [events, setEvents] = useState<IEventsData[]>([
        {
            id: 1,
            img: "case.png",
            tokenPreview: "fire.png",
            title: 'Открыть Free Case 5 раз',
            award: 10000,
            isCompleted: true,
            currentProgress: 2,
            totalProgress: 6,
            backgroundEffect: 'rgba(15, 97, 212, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },
        {
            id: 2,
            img: "case-2.png",
            tokenPreview: "fire.png",
            title: 'Открыть Elite Case 1 раз',
            award: 10000,
            isCompleted: true,
            backgroundEffect: 'rgba(238, 230, 17, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },
        {
            id: 3,
            img: "telegram.png",
            tokenPreview: "fire.png",
            title: 'Подписаться на TG канал',
            award: 1500,
            isCompleted: false,
            backgroundEffect: 'rgba(15, 97, 212, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },
        {
            id: 4,
            img: "wallet.png",
            tokenPreview: "fire.png",
            title: 'Пополнить баланс на 500р',
            award: 100500,
            isCompleted: false,
            backgroundEffect: 'rgba(227, 195, 95, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },
        {
            id: 5,
            img: "people.png",
            tokenPreview: "fire.png",
            title: 'Пригласить двух друзей',
            award: 4000,
            isCompleted: false,
            backgroundEffect: 'rgba(62, 61, 159, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },

        {
            id: 6,
            img: "improve.png",
            tokenPreview: "fire.png",
            title: 'Достигнуть 3 уровня',
            award: 7000,
            isCompleted: false,
            backgroundEffect: 'rgba(62, 61, 159, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },

        {
            id: 7,
            img: "hand.png",
            tokenPreview: "fire.png",
            title: 'Накопить 100 монет в ловле монет',
            award: 15000,
            isCompleted: false,
            backgroundEffect: 'rgba(62, 61, 159, 1)',
            etaps:[
                {
                    id:1,
                    title:'Перейти по ссылке выше'
                },
                {
                    id:2,
                    title:'Зарегистрироваться на платформе'
                },
                {
                    id:3,
                    title:'Купить депозит удобным для вас способом'
                }
            ],
            hint:'Тут будет примечание, его можно убрать или добавить через админку, в разделе добавления и редактирования заданий.',
            linkToEvent:'https://rt.pornhub.com/view_video.php?viewkey=6558ba16a1575#1',
            reward:1230
        },
    ])
    const [eventFilters, setEventFilters] = useState<IFilter[]>([
        {
            id: 1,
            isActive: true,
            title: 'Задания',
            value: 'events'
        },
        {
            id: 2,
            isActive: false,
            title: 'Ежедневные',
            value: 'daily'
        }
    ])

    const daysCombo = 2

    const [dailyRewards, setDailyAwards] = useState<TDailyReward[]>([
        {
            id: 1,
            day: 1,
            isClaimed: true,
            reward: 10000
        },

        {
            id: 2,
            day: 2,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 3,
            day: 3,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 4,
            day: 4,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 5,
            day: 5,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 6,
            day: 6,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 7,
            day: 7,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 8,
            day: 8,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 9,
            day: 9,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 10,
            day: 10,
            isClaimed: false,
            reward: 10000
        },

        {
            id: 11,
            day: 11,
            isClaimed: false,
            reward: 10000
        },
    ])

    function getFormattedAward(award: number): React.ReactNode[] {
        const formatted = award.toLocaleString('en-US')
        const parts: React.ReactNode[] = []

        let currentNumberPart = ''

        for (const char of formatted) {
            if (char === ',') {
                if (currentNumberPart) {
                    parts.push(<span key={parts.length}>{currentNumberPart}</span>)
                    currentNumberPart = ''
                }
                parts.push(<span key={parts.length} className={styles.symbol}>,</span>)
            } else {
                currentNumberPart += char
            }
        }

        if (currentNumberPart) {
            parts.push(<span key={parts.length}>{currentNumberPart}</span>)
        }

        return parts
    }

    function getFormattedDailyReward(reward: number): string {
        if (reward < 1000) {
            return reward.toString()
        }

        const thousands = Math.floor(reward / 1000)

        if (reward % 1000 === 0) {
            return `${thousands}K`
        } else {
            return `${(reward / 1000).toFixed(1)}K`
        }
    }


    function getIndicatorWidth(currentProgress: number, totalProgress: number): string {
        const indicatorWidth = (currentProgress / totalProgress) * 100
        return String(indicatorWidth) + '%'
    }

    const handleClaimReward = (id: number) => {
        addNotification('Награда успешно получена!')

        setDailyAwards((prevRewards) =>
            prevRewards.map((reward) =>
                reward.id === id && reward.day === daysCombo && !reward.isClaimed
                    ? { ...reward, isClaimed: true }
                    : reward
            )
        )
    }

    function handleGetReward(rewardId: number) {
        setEvents(events.filter((event) => event.id !== rewardId))
        addNotification('Награда успешно получена!')
    }

    function closeSelectedEventHandler() {
        setSelectedEventActive(false)

        setTimeout(() => {
            setSelectedEvent(null)
        }, 400)
    }

    function handleSelectEvent(event: IEventsData) {
        if (event.isCompleted) return
        setSelectedEventActive(true)
        setSelectedEvent(event)
    }

    return (
        <div>
            <Filter filters={eventFilters} setFilters={setEventFilters} />
            <FilterBlock title='Все задания' id='events'>
                {events && events.length > 0 ? events.map((event) => (
                    <div className={`flex justify__space__between ${styles.eventCard}`} key={event.id} onClick={() => handleSelectEvent(event)}>
                        <div className={`flex ${styles.eventCardContent}`}>
                            <ImagePreview image={getImage(event.img)} backgroundEffectColor={event.backgroundEffect} />

                            <div className={`flex column ${styles.eventCardAbout}`}>
                                <div className={`flex column ${styles.eventCardTextContainer}`}>
                                    <span className={styles.eventCardTitle}>{event.title}</span>
                                    <div className={`flex align__center ${styles.eventCardAward}`}>
                                        <div className={styles.tokenPreview}>
                                            <img src={getImage(event.tokenPreview)} alt='Токен' />
                                        </div>

                                        <span className={styles.eventCardAwardValue}>{getFormattedAward(event.award)}</span>
                                    </div>
                                </div>

                                {(event.currentProgress && event.totalProgress) &&
                                    <div className={`flex align__end justify__center ${styles.progressBarWrapper}`}>
                                        <div className={styles.progressBarIndicator} style={{ width: getIndicatorWidth(event.currentProgress, event.totalProgress) }}></div>
                                        <span className={styles.progressBarValue}>
                                            {`${event.currentProgress}/${event.totalProgress}`}
                                        </span>
                                    </div>}
                            </div>
                        </div>

                        {
                            event.isCompleted
                                ? <button type='button' className={styles.getAwardButton} onClick={() => handleGetReward(event.id)}>
                                    Получить
                                </button>
                                : <button type='button' className={styles.getEventButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <g opacity="0.5" clip-path="url(#clip0_175_495)">
                                            <path d="M13.3333 22.6666L20 16" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20 16L13.3333 9.33333" stroke="white" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_175_495">
                                                <rect width="32" height="32" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                        }
                    </div>
                )) : <h3>Загрузка..</h3>}
            </FilterBlock>

            <FilterBlock title='Ежедневная награда' id='daily'>
                {
                    (dailyRewards && dailyRewards.length > 0) ? dailyRewards.map((dailyReward) => (
                        <div className={`flex column align__center justify__space__between ${styles.dailyRewardCard} ${dailyReward.day <= daysCombo && !dailyReward.isClaimed ? styles.achieved : ''}`} onClick={() => handleClaimReward(dailyReward.id)}>
                            <div className={`flex align__center justify__center ${styles.dailyRewardCardDayValue}`}>{`Day ${dailyReward.day}`}</div>
                            <div className={styles.dailyRewardAwardPreview}>
                                <img src={getImage('fire.png')} alt='Токен' />
                            </div>
                            <div className={styles.dailyRewardContainer}>
                                {
                                    dailyReward.isClaimed ? <Done /> : <span className={styles.dailyRewardValue}>{getFormattedDailyReward(dailyReward.reward)}</span>
                                }
                            </div>
                        </div>
                    )) : <h3>Загрука..</h3>
                }
            </FilterBlock>

            <SelectedEvent isSelectedEventActive={isSelectedEventActive} closeSelectedEventHandler={closeSelectedEventHandler} selectedEvent={selectedEvent!} />
        </div>
    )
}

export default EventsPage
