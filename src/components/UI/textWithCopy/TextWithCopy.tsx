import React from 'react'
import styles from './TextWithCopy.module.scss'
import { useNotification } from '../../../providers/notification/NotificationProvider'

const TextWithCopy: React.FC<{ text: string, linkValue: string, id?:string, isHeaderGray?:boolean, className?:string }> = ({ text, linkValue, id, isHeaderGray, className }) => {

    const { addNotification } = useNotification()

    function copyHandler() {
        addNotification('Скопировано в буфер обмена!')
        navigator.clipboard.writeText(linkValue)
    }

    return (
        <div className={`flex align__center ${styles.textWithCopyContainer} ${className}`}>
            <span className={`${styles.textToCopy} ${isHeaderGray ? "light" : ''} textToCopy`} id={id}>{text}</span>
            <button type='button' className={`${styles.copyButton} ${isHeaderGray ? "light" : ''} copyButton`} onClick={copyHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 2.25C5 1.55933 5.56 1 6.25 1H6.5C7.16304 1 7.79893 1.26339 8.26777 1.73223C8.73661 2.20107 9 2.83696 9 3.5V4.75C9 5.44067 9.56 6 10.25 6H11.5C12.163 6 12.7989 6.26339 13.2678 6.73223C13.7366 7.20107 14 7.83696 14 8.5V10.75C14 11.44 13.44 12 12.75 12H6.25C5.91848 12 5.60054 11.8683 5.36612 11.6339C5.1317 11.3995 5 11.0815 5 10.75V2.25Z" fill="#6E6E6E" />
                    <path d="M10 3.50003C10.0012 2.65906 9.69834 1.846 9.14733 1.21069C10.2629 1.504 11.2805 2.08834 12.0961 2.90395C12.9117 3.71956 13.496 4.73717 13.7893 5.85269C13.154 5.30168 12.341 4.99886 11.5 5.00003H10.25C10.1837 5.00003 10.1201 4.97369 10.0732 4.9268C10.0263 4.87992 10 4.81633 10 4.75003V3.50003ZM3.25 4.00003H4V10.75C4 11.3468 4.23705 11.9191 4.65901 12.341C5.08097 12.763 5.65326 13 6.25 13H11V13.75C11 14.44 10.44 15 9.75 15H3.25C2.91848 15 2.60054 14.8683 2.36612 14.6339C2.1317 14.3995 2 14.0815 2 13.75V5.25003C2 4.55936 2.56 4.00003 3.25 4.00003Z" fill="#6E6E6E" />
                </svg>
            </button>
        </div>
    )
}

export default TextWithCopy
