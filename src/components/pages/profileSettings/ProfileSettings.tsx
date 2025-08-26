import React, { useState } from 'react'
import styles from './ProfileSettings.module.scss'
import NamedInput from '../../UI/namedInput/NamedInput'
import SaveButton from '../../UI/buttons/saveButton/SaveButton'
import { useUpdateUsernameMutation } from '../../../redux/services/userService'
import { useNotification } from '../../../providers/notification/NotificationProvider'

const ProfileSettings: React.FC = () => {

    const { addNotification } = useNotification()
    const [fetchToChangeUsername] = useUpdateUsernameMutation()
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
    const [profileNameValue, setProfileNameValue] = useState<string>('')
    const [profileNameChangeValue, setProfileNameChangeValue] = useState<string>('')

    async function handleSaveProfileName() {
        try {
            const result = await fetchToChangeUsername(profileNameChangeValue)
            console.log(result)

            if (result.data?.success) {
                setProfileNameValue(profileNameChangeValue)
                setIsDisabledButton(true)
                addNotification('Никнейм был обновлён')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleTradeLinkInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.value || profileNameValue === event.target.value || event.target.value.length < 3) {
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
