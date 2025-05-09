import React from 'react'
import styles from './NamedInput.module.scss'

type TNamedInput = {
    inputName:string,
    defaultInputValue?:string,
    inputType:string,
    inputPlaceholder:string,
    onChangeHandler:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const NamedInput:React.FC<TNamedInput> = ({inputName, inputType, inputPlaceholder, defaultInputValue, onChangeHandler}) => {

  return (
    <div className={`flex column ${styles.namedInputContainer}`}>
        <span className={styles.inputName}>{inputName}</span>
        <input defaultValue={defaultInputValue} type={inputType} placeholder={inputPlaceholder} className={styles.namedInput} onChange={onChangeHandler}/>
    </div>
  )
}

export default NamedInput
