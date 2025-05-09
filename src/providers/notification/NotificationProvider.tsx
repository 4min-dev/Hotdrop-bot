import React, { useState, createContext, useContext } from 'react'

interface INotification {
    id: number,
    notification: string,
    isExiting: boolean
}

interface INotificationContext {
    notifications: INotification[],
    addNotification: (message: string) => void,
    removeNotification: (id: number) => void
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<INotification[]>([])

    const addNotification = (message: string) => {
        const newNotification = { id: Date.now(), notification: message, isExiting: false }
        setNotifications((prev) => [...prev, newNotification])

        setTimeout(() => {
            removeNotification(newNotification.id)
        }, 3500)
    };

    const removeNotification = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isExiting: true } : n))
        )

        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}