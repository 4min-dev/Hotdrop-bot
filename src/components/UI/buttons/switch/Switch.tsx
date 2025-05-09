import React from 'react'
import styles from './Switch.module.scss'

const Switch:React.FC = () => {
    return (
        <label className={styles.switch}>
            <input type="checkbox"/>
                <span className={styles.slider}></span>
        </label>
    )
}

export default Switch
