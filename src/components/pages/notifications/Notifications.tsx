import React, { useEffect, useState } from 'react'
import styles from './Notifications.module.scss'
import getImage from '../../../assets/getImage'
import INotification from '../../../interfaces/INotification'
import { useGetNotificationsQuery } from '../../../redux/services/userService'

const Notifications: React.FC = () => {
    const { data: notificationsFetch } = useGetNotificationsQuery()
    const [notifications, setNotifications] = useState<INotification[] | []>([])

    function getTypeBackground(type: 'system' | 'private' | 'important') {
        if (
            type === 'system'
        ) {
            return 'rgba(33, 169, 227, 1)'
        } else if (
            type === 'private'
        ) {
            return 'rgba(218, 187, 16, 1)'
        } else if (type === 'important') {
            return 'rgba(206, 17, 51, 1)'
        }
    }
    function getTypeShadow(type: 'system' | 'private' | 'important') {
        if (
            type === 'system'
        ) {
            return `0px 0px 13.4px 0px rgba(33, 169, 227, 0.5), 0px 4px 4.8px 0px rgba(180, 221, 239, 0.25) inset`
        } else if (
            type === 'private'
        ) {
            return `0px 0px 13.4px 0px rgba(235, 201, 19, 0.5), 0px 4px 4.8px 0px rgba(234, 221, 153, 0.25) inset`
        } else if (type === 'important') {
            return `0px 0px 13.4px 0px rgba(206, 17, 51, 0.5), 0px 4px 4.8px 0px rgba(255, 107, 134, 0.25) inset`
        }
    }

    function getTranslatedType(type: 'system' | 'private' | 'important'): string {

        if (type === 'system') {
            return 'Системные'
        } else if (type === 'private') {
            return 'Личные'
        } else if (type === 'important') {
            return 'Важное'
        }

        return ''
    }

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    useEffect(() => {
        if (notificationsFetch && notificationsFetch.data) {
            setNotifications(notificationsFetch.data)
        }
    }, [notificationsFetch])

    return (
        <div className={styles.notificationsPage}>
            <span className={styles.pageTitle}>Уведомления</span>

            <div className={`flex column ${styles.notificationCardsContainer}`}>
                {
                    notifications.length > 0
                        ? notifications
                            .map((notification) => (
                                <div key={notification.id} className={`flex column justify__space__between ${styles.notificationCard}`}>
                                    <div className={`flex align__center ${styles.notificationHeading}`}>
                                        <span className={styles.notificationTitle}>{notification.title}</span>
                                        <span className={`flex align__center justify__center ${styles.notificationType}`} style={{ background: getTypeBackground(notification.type), boxShadow: getTypeShadow(notification.type) }}>
                                            <span className={styles.firstLetter}>{getTranslatedType(notification.type)[0]}</span>
                                            {getTranslatedType(notification.type).slice(1)}
                                        </span>
                                    </div>
                                    <span className={styles.notificationDescription}>
                                        {notification.description}
                                    </span>
                                    <div className={`flex align__center justify__space__between ${styles.notificationFooter}`}>
                                        <span className={styles.notificationDate}>{formatDate(new Date(notification.created_at))}</span>

                                        <div className={`flex align__center ${styles.isReadValue}`}>
                                            <span className={styles.isReadTitle}>Прочитано</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M4.66671 7.99998L7.96654 11.2998L15.0382 4.22882M1.36658 8.03351L4.66641 11.3333M11.7374 4.26235L8.20186 7.79788" stroke="#6E6E6E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            ))
                        : <div className={`flex column align__center ${styles.noFoundContainer}`}>
                            <img src={getImage('duck.gif')} alt='Не найдено' />
                            <span className={`text__center ${styles.noFoundTitle}`}>Тут пока пусто, проверьте позже</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default Notifications
