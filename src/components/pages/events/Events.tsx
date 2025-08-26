import React, { useEffect, useState } from 'react'
import styles from './Events.module.scss'
import Filter from '../../UI/filter/Filter'
import IFilter from '../../../interfaces/IFilter'
import FilterBlock from '../../UI/filterBlock/FilterBlock'
import getImage from '../../../assets/getImage'
import ImagePreview from '../../UI/imagePreview/ImagePreview'
import Done from '../../svg/Done'
import SelectedEvent from '../../UI/popups/selectedEvent/SelectedEvent'
import { useNotification } from '../../../providers/notification/NotificationProvider'
import { useGetTasksQuery, useGetUserQuery } from '../../../redux/services/userService'
import ITask from '../../../interfaces/ITask'
import IDailyReward from '../../../interfaces/IDailyReward'
import { useGetDailyRewardsQuery } from '../../../redux/services/listService'
import { useClaimDailyRewardMutation } from '../../../redux/services/eventService'

const EventsPage: React.FC = () => {
    const { addNotification } = useNotification()
    const { data: eventsResponse } = useGetTasksQuery()
    const { data: userData, refetch: refetchUser } = useGetUserQuery()
    const { data: dailyRewardsList } = useGetDailyRewardsQuery()
    const [claimReward, { data: claimedRewardData }] = useClaimDailyRewardMutation()
    const [isSelectedEventActive, setSelectedEventActive] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<ITask | null>(null)
    const [events, setEvents] = useState<ITask[]>([])
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

    const [dailyRewards, setDailyAwards] = useState<IDailyReward[]>([])

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

    const handleClaimReward = async () => {
        try {
            const response = await claimReward()

            if (response.data?.success) {
                await refetchUser()
                addNotification('Награда успешно получена!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleGetReward() {
        addNotification('Награда успешно получена!')
    }

    function closeSelectedEventHandler() {
        setSelectedEventActive(false)

        setTimeout(() => {
            setSelectedEvent(null)
        }, 400)
    }

    function handleSelectEvent(event: ITask) {
        if (event.completed) return
        setSelectedEventActive(true)
        setSelectedEvent(event)
    }

    useEffect(() => {
        if (eventsResponse && eventsResponse.data) {

            eventsResponse.data.forEach((event) => setEvents((prev) => {
                if (event.data.channel_username) {
                    return [...prev, { ...event, linkToEvent: `https://t.me/${event.data.channel_username}` },]
                }

                return [...prev, event]
            }))
        }
    }, [eventsResponse])

    useEffect(() => {
        if (dailyRewardsList && dailyRewardsList.data) {
            setDailyAwards(dailyRewardsList.data)
        }

        console.log(userData)
    }, [dailyRewardsList, userData])

    useEffect(() => {
        const url = document.location.href

        if (url.includes('filter=daily')) {
            setEventFilters([
                {
                    id: 1,
                    isActive: false,
                    title: 'Задания',
                    value: 'events'
                },
                {
                    id: 2,
                    isActive: true,
                    title: 'Ежедневные',
                    value: 'daily'
                }
            ])
        }

    }, [])

    return (
        <div>
            <Filter filters={eventFilters} setFilters={setEventFilters} />
            <FilterBlock title='Все задания' id='events'>
                {events && events.length > 0 ? events.map((event) => (
                    <div className={`flex justify__space__between ${styles.eventCard}`} key={event.created_at} onClick={() => handleSelectEvent(event)}>
                        <div className={`flex ${styles.eventCardContent}`}>
                            <ImagePreview image={event.img_url} backgroundEffectColor={event.backgroundEffect} />

                            <div className={`flex column ${styles.eventCardAbout}`}>
                                <div className={`flex column ${styles.eventCardTextContainer}`}>
                                    <span className={styles.eventCardTitle}>{event.title}</span>
                                    <div className={`flex align__center ${styles.eventCardAward}`}>
                                        <div className={styles.tokenPreview}>
                                            <img src={getImage("fire.png")} alt='Токен' />
                                        </div>

                                        <span className={styles.eventCardAwardValue}>{getFormattedAward(event.free_coins_reward)}</span>
                                    </div>
                                </div>

                                {(event.currentProgress && event.totalProgress) &&
                                    <div className={`flex align__end justify__center ${styles.progressBarWrapper}`}>
                                        <div className={styles.progressBarIndicator} style={{ width: getIndicatorWidth(Number(event.currentProgress), Number(event.totalProgress)) }}></div>
                                        <span className={styles.progressBarValue}>
                                            {`${event.currentProgress}/${event.totalProgress}`}
                                        </span>
                                    </div>}
                            </div>
                        </div>

                        {
                            event.completed
                                ? <button type='button' className={styles.getAwardButton} onClick={() => handleGetReward()}>
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
                    (dailyRewards && dailyRewards.length > 0) ? dailyRewards.map((dailyReward, i) => (
                        <div key={`${dailyReward.day}=dailyReward.day?id=${i + 1}`} className={`flex column align__center justify__space__between ${styles.dailyRewardCard} ${userData && !userData.daily_reward.claimed && dailyReward.day === userData.daily_reward.day ? styles.achieved : ''}`} onClick={() => {
                            if (userData && !userData.daily_reward.claimed && dailyReward.day === userData.daily_reward.day) {
                                handleClaimReward()
                            } else {
                                console.log(userData)
                                console.log(dailyReward)
                            }
                        }}>
                            <div className={`flex align__center justify__center ${styles.dailyRewardCardDayValue}`}>{`Day ${dailyReward.day}`}</div>
                            <div className={styles.dailyRewardAwardPreview}>
                                <img src={getImage('fire.png')} alt='Токен' />
                            </div>
                            <div className={styles.dailyRewardContainer}>
                                {
                                    (userData && ((dailyReward.day < userData.daily_reward.day) || (dailyReward.day === userData.daily_reward.day && userData.daily_reward.claimed))) ? <Done /> : <span className={styles.dailyRewardValue}>{getFormattedDailyReward(dailyReward.reward)}</span>
                                }
                            </div>
                        </div>
                    )) : <h3>Загрузка..</h3>
                }
            </FilterBlock>

            <SelectedEvent isSelectedEventActive={isSelectedEventActive} closeSelectedEventHandler={closeSelectedEventHandler} selectedEvent={selectedEvent!} />
        </div>
    )
}

export default EventsPage
