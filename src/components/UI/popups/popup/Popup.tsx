import React from 'react'
import styles from './Popup.module.scss'

type TPopup = {
    isActive:boolean,
    closePopupHandler?:() => void,
    id?:string,
    className?:string,
    children:React.ReactNode
}

const Popup:React.FC<TPopup> = ({isActive, closePopupHandler, id, className, children}) => {
  return (
    <div className={`popup__overlay ${styles.popupOverlay} ${isActive ? `visible ${styles.visible}` : ''} ${className}`} onClick={closePopupHandler} id={id}>
      {children}
    </div>
  )
}

export default Popup
