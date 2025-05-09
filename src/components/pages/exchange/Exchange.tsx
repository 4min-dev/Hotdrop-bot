import React, { useState } from 'react'
import styles from './Exhcange.module.scss'
import getImage from '../../../assets/getImage'

type TCalculateButton = {
    value: number | 'remove' | 'clear',
    name: number | React.ReactNode | 'C'
}

const Exchange: React.FC = () => {
    const [isCalculatePanel, setIsCalculatePanel] = useState<boolean>(false)
    const [goldCoinValue, setGoldCoinValue] = useState<number | string>('')
    const [gameTokensValue, setGameTokensValue] = useState<number | string>('')
    const [isSuccessExchanged, setIsSuccessExchanged] = useState(false)
    const [calculateButtons, setCalculateButtons] = useState<TCalculateButton[]>([
        {
            value: 1,
            name: 1
        },
        {
            value: 2,
            name: 2
        },
        {
            value: 3,
            name: 3
        },
        {
            value: 4,
            name: 4
        },
        {
            value: 5,
            name: 5
        },
        {
            value: 6,
            name: 6
        },
        {
            value: 7,
            name: 7
        },
        {
            value: 8,
            name: 8
        },
        {
            value: 9,
            name: 9
        },
        {
            value: 'clear',
            name: 'C'
        },
        {
            value: 0,
            name: 0
        },
        {
            value: 'remove',
            name: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.35332 14.732C3.1211 14.9642 2.93689 15.2398 2.81121 15.5431C2.68554 15.8465 2.62085 16.1716 2.62085 16.5C2.62085 16.8284 2.68554 17.1535 2.81121 17.4569C2.93689 17.7602 3.1211 18.0358 3.35332 18.268L11.8533 26.7667C12.3226 27.2347 12.9586 27.4987 13.6213 27.4987H26C27.0608 27.4987 28.0783 27.0772 28.8284 26.3271C29.5786 25.577 30 24.5595 30 23.4987V9.5C30 8.43913 29.5786 7.42172 28.8284 6.67157C28.0783 5.92143 27.0608 5.5 26 5.5H13.6213C12.9586 5.5 12.3226 5.764 11.8533 6.23333L3.35332 14.732ZM16.7066 12.7933C16.6151 12.6951 16.5047 12.6163 16.382 12.5616C16.2594 12.507 16.1269 12.4776 15.9927 12.4752C15.8584 12.4728 15.725 12.4975 15.6005 12.5478C15.476 12.5981 15.3629 12.673 15.2679 12.7679C15.173 12.8629 15.0981 12.976 15.0478 13.1005C14.9975 13.2251 14.9728 13.3584 14.9752 13.4927C14.9776 13.627 15.007 13.7594 15.0616 13.8821C15.1163 14.0047 15.1951 14.1151 15.2933 14.2067L17.5866 16.5L15.2933 18.7933C15.1951 18.8849 15.1163 18.9953 15.0616 19.1179C15.007 19.2406 14.9776 19.373 14.9752 19.5073C14.9728 19.6416 14.9975 19.7749 15.0478 19.8995C15.0981 20.024 15.173 20.1371 15.2679 20.2321C15.3629 20.327 15.476 20.4019 15.6005 20.4522C15.725 20.5025 15.8584 20.5272 15.9927 20.5248C16.1269 20.5224 16.2594 20.493 16.382 20.4384C16.5047 20.3837 16.6151 20.3049 16.7066 20.2067L19 17.9133L21.2933 20.2067C21.3849 20.3049 21.4953 20.3837 21.6179 20.4384C21.7406 20.493 21.873 20.5224 22.0073 20.5248C22.1416 20.5272 22.2749 20.5025 22.3994 20.4522C22.524 20.4019 22.6371 20.327 22.732 20.2321C22.827 20.1371 22.9019 20.024 22.9521 19.8995C23.0024 19.7749 23.0271 19.6416 23.0248 19.5073C23.0224 19.373 22.993 19.2406 22.9384 19.1179C22.8837 18.9953 22.8049 18.8849 22.7066 18.7933L20.4133 16.5L22.7066 14.2067C22.8049 14.1151 22.8837 14.0047 22.9384 13.8821C22.993 13.7594 23.0224 13.627 23.0248 13.4927C23.0271 13.3584 23.0024 13.2251 22.9521 13.1005C22.9019 12.976 22.827 12.8629 22.732 12.7679C22.6371 12.673 22.524 12.5981 22.3994 12.5478C22.2749 12.4975 22.1416 12.4728 22.0073 12.4752C21.873 12.4776 21.7406 12.507 21.6179 12.5616C21.4953 12.6163 21.3849 12.6951 21.2933 12.7933L19 15.0867L16.7066 12.7933Z" fill="white" />
            </svg>
        },
    ])

    const [isReversed, setIsReversed] = useState(false)

    const conversionRate = isReversed ? 1 / 228 : 228

    const handleGoldCoinChange = (number: number | 'remove' | 'clear') => {
        setGoldCoinValue((prevValue) => {
            let newValue = prevValue.toString()

            if (number === 'clear') {
                newValue = ''
            } else if (number === 'remove') {
                newValue = newValue.slice(0, -1)
            } else {
                newValue += number.toString()
            }

            const numericValue = parseFloat(newValue)
            if (!isNaN(numericValue)) {
                setGameTokensValue(numericValue * conversionRate)
            } else {
                setGameTokensValue('')
            }

            return newValue
        })
    }

    const handleGameTokensChange = (number: number | 'remove' | 'clear') => {
        setGameTokensValue((prevValue) => {
            let newValue = prevValue.toString()

            if (number === 'clear') {
                newValue = ''
            } else if (number === 'remove') {
                newValue = newValue.slice(0, -1)
            } else {
                newValue += number.toString()
            }

            const numericValue = parseFloat(newValue)
            if (!isNaN(numericValue)) {
                setGoldCoinValue(numericValue / conversionRate)
            } else {
                setGoldCoinValue('')
            }

            return newValue
        })
    }

    const handleChangeTokensButton = () => {

        setIsReversed(!isReversed)

        if (!isReversed) {
            setGoldCoinValue('')
        } else {
            setGameTokensValue('')
        }

        setGameTokensValue('')
        setGoldCoinValue('')
    }

    const formatValue = (value: number | string): string => {
        return value.toString()
    }

    const getConversionText = () => {
        const arrowUp = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64186 1.52422C8.60169 1.47038 8.55107 1.42518 8.49304 1.39134C8.43502 1.35749 8.37076 1.33569 8.30412 1.32723C8.23748 1.31876 8.16981 1.32382 8.10517 1.34208C8.04052 1.36035 7.98022 1.39146 7.92786 1.43355C6.65023 2.45926 5.80747 3.92997 5.56853 5.55088C5.13065 5.23335 4.74683 4.84728 4.43186 4.40755C4.38908 4.34775 4.33364 4.29812 4.26949 4.2622C4.20533 4.22628 4.13405 4.20495 4.06071 4.19973C3.98737 4.19451 3.91378 4.20553 3.84519 4.232C3.77659 4.25847 3.71468 4.29975 3.66386 4.35288C2.78341 5.27392 2.21903 6.45134 2.05247 7.71457C1.88591 8.97781 2.12582 10.2613 2.73746 11.379C3.34909 12.4968 4.30069 13.3909 5.4544 13.9317C6.60811 14.4725 7.90403 14.6319 9.15443 14.387C10.4048 14.142 11.5448 13.5054 12.4092 12.5692C13.2736 11.6331 13.8175 10.4461 13.9622 9.18017C14.1069 7.91424 13.8448 6.63512 13.2139 5.5281C12.583 4.42108 11.6161 3.54364 10.4532 3.02288C9.73832 2.67526 9.11719 2.16135 8.64186 1.52422ZM10.4999 9.50022C10.4996 9.86184 10.4209 10.2191 10.2692 10.5474C10.1175 10.8756 9.89636 11.167 9.62108 11.4016C9.34581 11.6361 9.02294 11.8081 8.67474 11.9057C8.32655 12.0033 7.96132 12.0242 7.60425 11.967C7.24719 11.9098 6.90679 11.7758 6.60654 11.5742C6.30629 11.3727 6.05333 11.1084 5.86513 10.7996C5.67692 10.4908 5.55795 10.1449 5.51641 9.78566C5.47487 9.42643 5.51176 9.06247 5.62453 8.71888C6.0432 9.02888 6.52453 9.25888 7.04653 9.38555C7.18805 8.47285 7.64157 7.63743 8.32986 7.02155C8.93053 7.10154 9.48171 7.39698 9.88086 7.85291C10.28 8.30885 10.5 8.89424 10.4999 9.50022Z" fill="white"/>
        </svg>`;
        const arrowDown = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
            <path d="M10.6206 6.05176L9.65509 7.98279H0.965433L-8.39233e-05 6.05176H10.6206Z" fill="white"/>
            <rect x="8.6897" y="11.3621" width="1.93103" height="6.75862" transform="rotate(90 8.6897 11.3621)" fill="white"/>
            <rect x="10.6206" y="0.741455" width="1.93103" height="10.6207" transform="rotate(90 10.6206 0.741455)" fill="white"/>
            <rect x="4.34473" y="2.1897" width="1.93103" height="11.1034" fill="white"/>
        </svg>`;

        return isReversed
            ? `<span class="flex align__center ${styles.exchangeValueCardGap}">228 ${arrowDown} = 1 ${arrowUp}</span>`
            : `<span class="flex align__center ${styles.exchangeValueCardGap}">1 ${arrowUp} = 228 ${arrowDown}</span>`
    }

    function handleCalculatePanel() {
        setIsCalculatePanel((prev) => !prev)
    }

    return (
        <div>
            {isSuccessExchanged ? (
                <div className={`flex align__center column ${styles.exchangedContainer}`}>
                    <div className={styles.exchangedPreview}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
                            <defs>

                                <filter id="outline-filter" x="-50%" y="-50%" width="200%" height="200%">
                                    <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="thickened" />
                                    <feComposite in="thickened" in2="SourceAlpha" operator="out" result="outline" />
                                    <feFlood flood-color="#8B2EE9" result="purple-color" />
                                    <feComposite in="purple-color" in2="outline" operator="in" result="colored-outline" />
                                </filter>

                                <filter id="fill-filter" x="-50%" y="-50%" width="200%" height="200%">
                                    <feColorMatrix type="matrix" values="0.40 0.50 0.50 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0" result="grayscale" />
                                    <feColorMatrix in="grayscale" type="matrix" values="0.73 0 0 0 0.1 0 0.47 0 0 0.1 0 0 0.98 0 0.1 0 0 0 1 0" result="colored-fill" />
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blurred" />
                                    <feOffset in="blurred" dx="0" dy="0" result="offset-blur" />
                                    <feFlood flood-color="#8B2EE9" result="shadow-color" />
                                    <feComposite in="shadow-color" in2="offset-blur" operator="in" result="colored-shadow" />
                                    <feMerge>
                                        <feMergeNode in="colored-shadow" />
                                        <feMergeNode in="colored-fill" />
                                    </feMerge>
                                </filter>
                            </defs>
                        </svg>

                        <img src={getImage('ok.gif')} alt='Успешно' style={{ filter: "url(#outline-filter)" }} />
                        <img
                            src={getImage('ok.gif')} alt='Успешно'
                            style={{ filter: "url(#fill-filter)" }}
                        />
                    </div>

                    <div className={`text__center ${styles.exchangedTitle}`}>
                        Операция<br />проведена успешно!
                    </div>

                    <div className={`flex align__center ${styles.exchangedTokensContainer}`}>
                        <span className={`flex align__center ${styles.exchangedTokenContainer}`}>
                            {
                                isReversed ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28" fill="none">
                                    <path d="M19.9998 11.2727L18.1816 14.9091H1.81801L-0.000160217 11.2727H19.9998Z" fill="white" />
                                    <rect x="16.3638" y="21.2727" width="3.63635" height="12.7272" transform="rotate(90 16.3638 21.2727)" fill="white" />
                                    <rect x="19.9998" y="1.27295" width="3.63635" height="19.9999" transform="rotate(90 19.9998 1.27295)" fill="white" />
                                    <rect x="8.18164" y="4" width="3.63635" height="20.909" fill="white" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.4447 3.429C19.3543 3.30786 19.2404 3.20618 19.1098 3.13002C18.9793 3.05387 18.8347 3.00481 18.6848 2.98577C18.5348 2.96673 18.3826 2.9781 18.2371 3.0192C18.0917 3.0603 17.956 3.1303 17.8382 3.225C14.9635 5.53286 13.0673 8.84195 12.5297 12.489C11.5444 11.7745 10.6809 10.9059 9.97218 9.9165C9.87592 9.78195 9.75118 9.67029 9.60684 9.58946C9.46249 9.50864 9.3021 9.46065 9.13708 9.4489C8.97207 9.43715 8.8065 9.46195 8.65216 9.52151C8.49782 9.58107 8.35852 9.67394 8.24418 9.7935C6.26316 11.8658 4.9933 14.515 4.61854 17.3573C4.24378 20.1996 4.78359 23.0874 6.15977 25.6024C7.53595 28.1174 9.67704 30.1289 12.2729 31.3457C14.8687 32.5625 17.7846 32.9213 20.598 32.3702C23.4114 31.8191 25.9763 30.3866 27.9212 28.2803C29.866 26.174 31.0899 23.5032 31.4154 20.6549C31.7409 17.8066 31.1512 14.9285 29.7317 12.4377C28.3123 9.94694 26.1367 7.9727 23.5202 6.801C21.9117 6.01885 20.5142 4.86255 19.4447 3.429ZM23.6252 21.375C23.6246 22.1886 23.4475 22.9925 23.1062 23.7311C22.7648 24.4696 22.2673 25.1254 21.6479 25.653C21.0286 26.1806 20.3021 26.5676 19.5187 26.7873C18.7352 27.0069 17.9135 27.054 17.1101 26.9252C16.3067 26.7965 15.5408 26.495 14.8652 26.0415C14.1896 25.588 13.6205 24.9934 13.197 24.2986C12.7736 23.6039 12.5059 22.8255 12.4124 22.0172C12.319 21.209 12.4019 20.3901 12.6557 19.617C13.5977 20.3145 14.6807 20.832 15.8552 21.117C16.1736 19.0634 17.194 17.1837 18.7427 15.798C20.0942 15.978 21.3343 16.6427 22.2324 17.6686C23.1305 18.6944 23.6255 20.0116 23.6252 21.375Z"
                                        fill="white"
                                    />
                                </svg>
                            }


                            <span className={styles.exchangedTokenValue}>
                                {formatValue(isReversed ? gameTokensValue : goldCoinValue)}
                            </span>
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_247_1380)">
                                <path
                                    d="M19 12L5 12"
                                    stroke="white"
                                    stroke-width="2.3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M12 19L19 12L12 5"
                                    stroke="white"
                                    stroke-width="2.3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_247_1380">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className={`flex align__center ${styles.exchangedTokenContainer}`}>
                            {
                                !isReversed ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28" fill="none">
                                    <path d="M19.9998 11.2727L18.1816 14.9091H1.81801L-0.000160217 11.2727H19.9998Z" fill="white" />
                                    <rect x="16.3638" y="21.2727" width="3.63635" height="12.7272" transform="rotate(90 16.3638 21.2727)" fill="white" />
                                    <rect x="19.9998" y="1.27295" width="3.63635" height="19.9999" transform="rotate(90 19.9998 1.27295)" fill="white" />
                                    <rect x="8.18164" y="4" width="3.63635" height="20.909" fill="white" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M19.4447 3.429C19.3543 3.30786 19.2404 3.20618 19.1098 3.13002C18.9793 3.05387 18.8347 3.00481 18.6848 2.98577C18.5348 2.96673 18.3826 2.9781 18.2371 3.0192C18.0917 3.0603 17.956 3.1303 17.8382 3.225C14.9635 5.53286 13.0673 8.84195 12.5297 12.489C11.5444 11.7745 10.6809 10.9059 9.97218 9.9165C9.87592 9.78195 9.75118 9.67029 9.60684 9.58946C9.46249 9.50864 9.3021 9.46065 9.13708 9.4489C8.97207 9.43715 8.8065 9.46195 8.65216 9.52151C8.49782 9.58107 8.35852 9.67394 8.24418 9.7935C6.26316 11.8658 4.9933 14.515 4.61854 17.3573C4.24378 20.1996 4.78359 23.0874 6.15977 25.6024C7.53595 28.1174 9.67704 30.1289 12.2729 31.3457C14.8687 32.5625 17.7846 32.9213 20.598 32.3702C23.4114 31.8191 25.9763 30.3866 27.9212 28.2803C29.866 26.174 31.0899 23.5032 31.4154 20.6549C31.7409 17.8066 31.1512 14.9285 29.7317 12.4377C28.3123 9.94694 26.1367 7.9727 23.5202 6.801C21.9117 6.01885 20.5142 4.86255 19.4447 3.429ZM23.6252 21.375C23.6246 22.1886 23.4475 22.9925 23.1062 23.7311C22.7648 24.4696 22.2673 25.1254 21.6479 25.653C21.0286 26.1806 20.3021 26.5676 19.5187 26.7873C18.7352 27.0069 17.9135 27.054 17.1101 26.9252C16.3067 26.7965 15.5408 26.495 14.8652 26.0415C14.1896 25.588 13.6205 24.9934 13.197 24.2986C12.7736 23.6039 12.5059 22.8255 12.4124 22.0172C12.319 21.209 12.4019 20.3901 12.6557 19.617C13.5977 20.3145 14.6807 20.832 15.8552 21.117C16.1736 19.0634 17.194 17.1837 18.7427 15.798C20.0942 15.978 21.3343 16.6427 22.2324 17.6686C23.1305 18.6944 23.6255 20.0116 23.6252 21.375Z"
                                        fill="white"
                                    />
                                </svg>
                            }

                            <span className={styles.exchangedTokenValue}>
                                {formatValue(isReversed ? goldCoinValue : gameTokensValue)}
                            </span>
                        </span>
                    </div>

                    <a href='/exchange' type='button' className={`flex align__center justify__center ${styles.continueButton}`}>
                        Хорошо
                    </a>
                </div>
            ) : (
                <>
                    <div className={`flex justify__space__between ${styles.exchangeTokenCard}`}>
                        <div className={`flex column ${styles.exchangeAboutTokenContainer}`}>
                            <div className={`flex ${styles.exchangeAboutTokenTitleContainer}`}>
                                <span className={styles.exchangeAboutTokenTitle}>
                                    {isReversed ? 'Free Coin' : 'Gold Coin'}
                                </span>

                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <g opacity="0.5" clip-path="url(#clip0_247_701)">
                                        <path d="M8.16675 11.6667L14.0001 17.5" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 17.5L19.8333 11.6667" stroke="white" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_247_701">
                                            <rect width="28" height="28" fill="white" transform="matrix(0 1 -1 0 28 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            <div className={`flex align__end ${styles.exchangeCardBalanceContainer}`}>
                                <span className={styles.exchangeCardBalanceTitle}>Balance</span>
                                <div className={`flex align__center ${styles.exchangeCardBalanceDescriptionContainer}`}>
                                    {
                                        isReversed ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
                                            <g opacity="0.5">
                                                <path d="M10.6206 6.05176L9.65509 7.98279H0.965433L-8.39233e-05 6.05176H10.6206Z" fill="white" />
                                                <rect x="8.6897" y="11.3621" width="1.93103" height="6.75862" transform="rotate(90 8.6897 11.3621)" fill="white" />
                                                <rect x="10.6206" y="0.741455" width="1.93103" height="10.6207" transform="rotate(90 10.6206 0.741455)" fill="white" />
                                                <rect x="4.34473" y="2.1897" width="1.93103" height="11.1034" fill="white" />
                                            </g>
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.64186 0.524216C6.60169 0.470376 6.55107 0.425184 6.49304 0.391338C6.43502 0.357493 6.37076 0.335688 6.30412 0.327225C6.23748 0.318763 6.16981 0.323816 6.10517 0.342084C6.04052 0.360352 5.98022 0.391459 5.92786 0.433549C4.65023 1.45926 3.80747 2.92997 3.56853 4.55088C3.13065 4.23335 2.74683 3.84728 2.43186 3.40755C2.38908 3.34775 2.33364 3.29812 2.26949 3.2622C2.20533 3.22628 2.13405 3.20495 2.06071 3.19973C1.98737 3.19451 1.91378 3.20553 1.84519 3.232C1.77659 3.25847 1.71468 3.29975 1.66386 3.35288C0.783408 4.27392 0.219025 5.45134 0.0524669 6.71457C-0.114092 7.97781 0.125823 9.26128 0.737458 10.379C1.34909 11.4968 2.30069 12.3909 3.4544 12.9317C4.60811 13.4725 5.90403 13.6319 7.15443 13.387C8.40484 13.142 9.5448 12.5054 10.4092 11.5692C11.2736 10.6331 11.8175 9.4461 11.9622 8.18017C12.1069 6.91424 11.8448 5.63512 11.2139 4.5281C10.583 3.42108 9.61609 2.54364 8.45319 2.02288C7.73832 1.67526 7.11719 1.16135 6.64186 0.524216ZM8.49986 8.50022C8.49961 8.86184 8.42091 9.2191 8.2692 9.54735C8.11748 9.87561 7.89636 10.167 7.62108 10.4016C7.34581 10.6361 7.02294 10.8081 6.67474 10.9057C6.32655 11.0033 5.96132 11.0242 5.60425 10.967C5.24719 10.9098 4.90679 10.7758 4.60654 10.5742C4.30629 10.3727 4.05333 10.1084 3.86513 9.79961C3.67692 9.49083 3.55795 9.14489 3.51641 8.78566C3.47487 8.42643 3.51176 8.06247 3.62453 7.71888C4.0432 8.02888 4.52453 8.25888 5.04653 8.38555C5.18805 7.47285 5.64157 6.63743 6.32986 6.02155C6.93053 6.10154 7.48171 6.39698 7.88086 6.85291C8.28002 7.30885 8.49999 7.89424 8.49986 8.50022Z" fill="white" />
                                        </svg>
                                    }
                                    <span className={styles.exchangeCardBalanceDescription}>36 000,00</span>
                                </div>
                            </div>
                        </div>

                        <input
                            readOnly
                            type="number"
                            step="0.01"
                            className={styles.exchangeValueInput}
                            placeholder={isReversed ? '228' : '001'}
                            value={isReversed ? gameTokensValue : goldCoinValue}
                            onClick={handleCalculatePanel}
                        />
                    </div>

                    <div className={`flex align__center ${styles.mainExchangeUi}`}>
                        <button
                            type="button"
                            className={`flex align__center justify__center ${styles.changeTokensButton}`}
                            onClick={handleChangeTokensButton}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7.5L7.5 3M7.5 3L12 7.5M7.5 3V16.5M21 16.5L16.5 21M16.5 21L12 16.5M16.5 21V7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>

                        <div className={`flex align__end ${styles.exchangeValues}`}>
                            <span
                                className={`flex align__end ${styles.exchangeValueCard}`}
                                dangerouslySetInnerHTML={{ __html: getConversionText() }}
                            />
                        </div>
                    </div>

                    <div className={`flex justify__space__between ${styles.exchangeTokenCard}`}>
                        <div className={`flex column ${styles.exchangeAboutTokenContainer}`}>
                            <div className={`flex ${styles.exchangeAboutTokenTitleContainer}`}>
                                <span className={styles.exchangeAboutTokenTitle}>
                                    {isReversed ? 'Gold Coin' : 'Free Coin'}
                                </span>
                            </div>

                            <div className={`flex align__end ${styles.exchangeCardBalanceContainer}`}>
                                <span className={styles.exchangeCardBalanceTitle}>Balance</span>
                                <div className={`flex align__center ${styles.exchangeCardBalanceDescriptionContainer}`}>
                                    {
                                        !isReversed ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
                                            <g opacity="0.5">
                                                <path d="M10.6206 6.05176L9.65509 7.98279H0.965433L-8.39233e-05 6.05176H10.6206Z" fill="white" />
                                                <rect x="8.6897" y="11.3621" width="1.93103" height="6.75862" transform="rotate(90 8.6897 11.3621)" fill="white" />
                                                <rect x="10.6206" y="0.741455" width="1.93103" height="10.6207" transform="rotate(90 10.6206 0.741455)" fill="white" />
                                                <rect x="4.34473" y="2.1897" width="1.93103" height="11.1034" fill="white" />
                                            </g>
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.64186 0.524216C6.60169 0.470376 6.55107 0.425184 6.49304 0.391338C6.43502 0.357493 6.37076 0.335688 6.30412 0.327225C6.23748 0.318763 6.16981 0.323816 6.10517 0.342084C6.04052 0.360352 5.98022 0.391459 5.92786 0.433549C4.65023 1.45926 3.80747 2.92997 3.56853 4.55088C3.13065 4.23335 2.74683 3.84728 2.43186 3.40755C2.38908 3.34775 2.33364 3.29812 2.26949 3.2622C2.20533 3.22628 2.13405 3.20495 2.06071 3.19973C1.98737 3.19451 1.91378 3.20553 1.84519 3.232C1.77659 3.25847 1.71468 3.29975 1.66386 3.35288C0.783408 4.27392 0.219025 5.45134 0.0524669 6.71457C-0.114092 7.97781 0.125823 9.26128 0.737458 10.379C1.34909 11.4968 2.30069 12.3909 3.4544 12.9317C4.60811 13.4725 5.90403 13.6319 7.15443 13.387C8.40484 13.142 9.5448 12.5054 10.4092 11.5692C11.2736 10.6331 11.8175 9.4461 11.9622 8.18017C12.1069 6.91424 11.8448 5.63512 11.2139 4.5281C10.583 3.42108 9.61609 2.54364 8.45319 2.02288C7.73832 1.67526 7.11719 1.16135 6.64186 0.524216ZM8.49986 8.50022C8.49961 8.86184 8.42091 9.2191 8.2692 9.54735C8.11748 9.87561 7.89636 10.167 7.62108 10.4016C7.34581 10.6361 7.02294 10.8081 6.67474 10.9057C6.32655 11.0033 5.96132 11.0242 5.60425 10.967C5.24719 10.9098 4.90679 10.7758 4.60654 10.5742C4.30629 10.3727 4.05333 10.1084 3.86513 9.79961C3.67692 9.49083 3.55795 9.14489 3.51641 8.78566C3.47487 8.42643 3.51176 8.06247 3.62453 7.71888C4.0432 8.02888 4.52453 8.25888 5.04653 8.38555C5.18805 7.47285 5.64157 6.63743 6.32986 6.02155C6.93053 6.10154 7.48171 6.39698 7.88086 6.85291C8.28002 7.30885 8.49999 7.89424 8.49986 8.50022Z" fill="white" />
                                        </svg>
                                    }
                                    <span className={styles.exchangeCardBalanceDescription}>36 000,00</span>
                                </div>
                            </div>
                        </div>

                        <input
                            readOnly
                            type="number"
                            step="0.01"
                            className={styles.exchangeValueInput}
                            placeholder={isReversed ? '1' : '228'}
                            value={isReversed ? goldCoinValue : gameTokensValue}
                        />

                        <button type="button" className={`flex align__center ${styles.exchangeTokensButton}`} onClick={() => {
                            if (goldCoinValue || gameTokensValue) {
                                setIsCalculatePanel(false)
                                setIsSuccessExchanged(true)
                            }
                        }}>
                            <span className={styles.buttonText}>Обменять</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M10 17L15 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 12L10 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            <div className={`flex flex__wrap justify__center align__center ${styles.calculatePanel} ${isCalculatePanel ? styles.active : ''}`}>
                {
                    calculateButtons.length > 0 && calculateButtons.map((calculateButton) => (
                        <button type='button' className={`flex align__center justify__center ${styles.calculateButton}`} key={calculateButton.value} onClick={() => {
                            isReversed ? handleGameTokensChange(calculateButton.value) : handleGoldCoinChange(calculateButton.value)
                        }}>
                            {
                                calculateButton.name
                            }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Exchange