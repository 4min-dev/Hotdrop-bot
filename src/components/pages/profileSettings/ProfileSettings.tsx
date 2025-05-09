import React, { useState } from 'react'
import styles from './ProfileSettings.module.scss'
import NamedInput from '../../UI/namedInput/NamedInput'
import SaveButton from '../../UI/buttons/saveButton/SaveButton'

const ProfileSettings: React.FC = () => {

    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
    const [profileNameValue, setProfileNameValue] = useState<string>('')
    const [profileNameChangeValue, setProfileNameChangeValue] = useState<string>('')

    function handleSaveProfileName() {
        setProfileNameValue(profileNameChangeValue)
        setIsDisabledButton(true)
    }

    function handleTradeLinkInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value) {
            setIsDisabledButton(true)
        } else if (profileNameValue === event.target.value) {
            setIsDisabledButton(true)
        } else {
            setIsDisabledButton(false)
        }

        setProfileNameChangeValue(event.target.value)
    }

    return (
        <div className={styles.profileSettingsPage}>
            <span className={styles.pageTitle}>Настройка профиля</span>
            <div className={`flex column ${styles.profileSettingsMainUi}`}>
                <NamedInput inputName='Никнейм' inputPlaceholder='Grand Victorsha' inputType='text' onChangeHandler={handleTradeLinkInput} />
                <SaveButton buttonText='Сохранить' handleSaveButton={handleSaveProfileName} isDisabled={isDisabledButton} />
            </div>

            <div className={styles.copyright}>
                ©Bonsai Casino 2025
            </div>
        </div>
    )
}

export default ProfileSettings
