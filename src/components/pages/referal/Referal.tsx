import React, { useState } from 'react'
import styles from './Referal.module.scss'
import getImage from '../../../assets/getImage'
import FilterButton from '../../UI/buttons/filter/FilterButton'
import { IReferal } from '../../../interfaces/IReferal'
import getFormattedNumber from '../../../assets/getFormattedNumber'

const ReferalPage: React.FC = () => {

    const [referals, setReferals] = useState<IReferal[]>([
        {
            id: 1,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 2,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 3,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 4,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 5,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },

        {
            id: 6,
            avatar: 'moon.png',
            username: 'Ahmad Kanabawi',
            totalProfit: 3724947,
            level: 14,
            tableNumericValue: 1
        },
    ])
    const [isHintShowable, setHintShowable] = useState(true)

    function getFormattedTableNumericId(numbericId: number): JSX.Element {
        const paddedId = numbericId.toString().length === 1 ? `0${numbericId}` : `${numbericId}`
        return (
            <React.Fragment>
                <span className={styles.symbol}>#</span>
                {paddedId}
            </React.Fragment>
        )
    }

    function handleCloseHint() {
        setHintShowable(false)
    }

    return (
        <div className={styles.referalPageContainer}>
            <div className={`flex column ${styles.referalPageHeading}`}>
                <span className={styles.referalPageTitle}>Реферальный счёт</span>
                <div className={`flex align__end ${styles.referalPageAmountContainer}`}>
                    <span className={styles.referalPageAmount}>200 000<span className={styles.opacity}>,00</span></span>
                    <div className={`flex align__center justify__center ${styles.referalAmountPreview}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.963 2.28596C12.9027 2.2052 12.8268 2.13741 12.7397 2.08664C12.6527 2.03587 12.5563 2.00317 12.4564 1.99047C12.3564 1.97778 12.2549 1.98536 12.1579 2.01276C12.061 2.04016 11.9705 2.08682 11.892 2.14996C9.97552 3.68853 8.71139 5.89459 8.35298 8.32596C7.69615 7.84966 7.12043 7.27056 6.64798 6.61096C6.58381 6.52126 6.50064 6.44682 6.40442 6.39294C6.30819 6.33905 6.20126 6.30706 6.09125 6.29923C5.98124 6.2914 5.87085 6.30792 5.76796 6.34763C5.66507 6.38734 5.5722 6.44925 5.49598 6.52896C4.1753 7.91052 3.32872 9.67664 3.07888 11.5715C2.82905 13.4664 3.18892 15.3915 4.10637 17.0682C5.02382 18.7449 6.45122 20.0859 8.18178 20.8971C9.91235 21.7083 11.8562 21.9475 13.7318 21.5801C15.6074 21.2127 17.3174 20.2577 18.614 18.8535C19.9105 17.4493 20.7264 15.6688 20.9435 13.7699C21.1605 11.871 20.7673 9.95232 19.821 8.29179C18.8747 6.63125 17.4243 5.31509 15.68 4.53396C14.6077 4.01253 13.676 3.24166 12.963 2.28596ZM15.75 14.25C15.7496 14.7924 15.6316 15.3283 15.404 15.8207C15.1764 16.313 14.8447 16.7502 14.4318 17.102C14.0189 17.4537 13.5346 17.7117 13.0123 17.8581C12.49 18.0046 11.9422 18.036 11.4066 17.9501C10.871 17.8643 10.3604 17.6633 9.90999 17.361C9.45962 17.0587 9.08019 16.6622 8.79788 16.1991C8.51557 15.7359 8.33711 15.217 8.2748 14.6781C8.21249 14.1393 8.26782 13.5933 8.43698 13.078C9.06498 13.543 9.78698 13.888 10.57 14.078C10.7823 12.7089 11.4625 11.4558 12.495 10.532C13.396 10.6519 14.2227 11.0951 14.8215 11.779C15.4202 12.4629 15.7502 13.341 15.75 14.25Z" fill="white" />
                        </svg>
                    </div>
                </div>

                <button type='button' className={styles.getReferalWalletButton}>
                    Забрать прибыль
                </button>
            </div>

            {
                isHintShowable && (
                    <div className={`flex justify__space__between ${styles.referalPageHint}`}>
                        <div className={`flex column ${styles.referalPageTextContainer}`}>
                            <span className={styles.referalPageTitle}>Пригласите друга!</span>
                            <span className={styles.referalPageDescription}>Получите <span className={styles.tokensValue}>50,000</span> токенов за каждого приглашенного реферала</span>
                        </div>

                        <button type='button' className={`flex align__center justify__center ${styles.closeButtonHint}`} onClick={handleCloseHint}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path opacity="0.5" d="M1 9L9 1M1 1L9 9" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                )
            }

            <div className={`flex column ${styles.referalsBlock}`}>
                <div className={`flex align__center justify__space__between ${styles.referalsBlockTitleContainer}`}>
                    <span className={styles.referalsBlockTitle}><span className={styles.amount}>130</span> Друзей</span>
                    <FilterButton/>
                </div>

                <div className={`flex column ${styles.referalCardsContainer}`}>
                    {referals && referals.length > 0 ? referals.map((referal) => (
                        <div key={referal.id} className={`flex align__center justify__space__between ${styles.referalCard}`}>
                            <div className={`flex align__center ${styles.aboutReferalContainer}`}>
                                <div className={`flex align__center justify__center ${styles.referalAvatar}`}>
                                    <img src={getImage(referal.avatar)} alt='Аватар' />
                                </div>

                                <div className={`flex column ${styles.textContainer}`}>
                                    <span className={styles.referalUsername}>
                                        {referal.username}
                                    </span>
                                    <div className={`flex align__center ${styles.referalNumericDataContainer}`}>
                                        <div className={`flex align__center ${styles.referalTotalAmount}`}>
                                            <div className={styles.referalTotalProfitPreview}>
                                                <img src={getImage('fire.png')} alt='Токен' />
                                            </div>
                                            <span className={styles.referalTotalProfit}>
                                                {getFormattedNumber(referal.totalProfit)}
                                            </span>
                                        </div>

                                        <div className={`flex align__center justify__center ${styles.referalLevel}`}>
                                            <span className={styles.mono}>
                                                {referal.level.toString()[0]}{referal.level.toString().slice(1)}
                                            </span>
                                            &nbsp;
                                            {referal.level.toString().slice(1) && (
                                                <>
                                                    LVL
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <span className={styles.referalTableNumericId}>
                                {getFormattedTableNumericId(referal.tableNumericValue)}
                            </span>
                        </div>
                    )) : <h3>Загрузка..</h3>}
                </div>
            </div>
        </div>
    )
}

export default ReferalPage
