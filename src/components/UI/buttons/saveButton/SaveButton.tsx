import React from 'react'
import styles from './SaveButton.module.scss'

type TSaveButton = {
    handleSaveButton:() => void,
    buttonText:string,
    isDisabled:boolean
}

const SaveButton:React.FC<TSaveButton> = ({handleSaveButton, buttonText, isDisabled}) => {
  return (
    <button disabled={isDisabled} type='button' className={styles.saveButton} onClick={handleSaveButton}>
      {buttonText}
    </button>
  )
}

export default SaveButton
