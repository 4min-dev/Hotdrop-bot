import React from 'react'
import styles from './Switch.module.scss'

type TSwitchProps = {
    isActive: 'false' | 'true',
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch: React.FC<TSwitchProps> = ({ isActive, handleChange }) => {
    return (
        <label className={styles.switch}>
            <input checked={isActive === 'false' ? false : true} type="checkbox" onChange={handleChange} />
            <span className={styles.slider}></span>
        </label>
    )
}

export default Switch
