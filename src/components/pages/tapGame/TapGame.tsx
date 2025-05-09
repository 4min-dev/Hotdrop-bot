import React, { useState, useEffect } from 'react'
import styles from './TapGame.module.scss'
import getImage from '../../../assets/getImage'

const TapGame: React.FC = () => {
    const [timer, setTimer] = useState<{ minutes: number, seconds: number }>({ minutes: 0, seconds: 27 })
    const [gameBalance, setGameBalance] = useState<number>(110)
    const [isGameActive, setIsGameActive] = useState<boolean>(true)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)

    useEffect(() => {
        document.body.classList.add('inGame')
        
        return () => document.body.classList.remove('inGame')
    },[])

    const [tokens, setTokens] = useState<
        Array<{
            id: number,
            top: string,
            left: string,
            width: number,
            height: number,
            timeoutId: NodeJS.Timeout | null
        }>
    >([])

    const getRandomNumber = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min

    const createToken = () => {
        if (!isGameActive || tokens.length >= 3) return

        const id = Date.now()
        const top = `${getRandomNumber(10, 90)}%`
        const left = `${getRandomNumber(10, 90)}%`
        const width = getRandomNumber(30, 70)
        const height = width

        const timeoutId = setTimeout(() => {
            removeToken(id)
        }, getRandomNumber(2000, 4000))

        setTokens((prevTokens) => [
            ...prevTokens,
            { id, top, left, width, height, timeoutId },
        ])
    }

    const removeToken = (id: number) => {
        setTokens((prevTokens) =>
            prevTokens.filter((token) => token.id !== id)
        )
    }

    const handleTokenClick = (id: number) => {
        setGameBalance((prevBalance) => prevBalance + 10)
        removeToken(id)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined
        let tokenInterval:NodeJS.Timeout | undefined

        if (isGameActive && timer.seconds > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => ({
                    ...prevTimer,
                    seconds: prevTimer.seconds - 1,
                }))
            }, 1000)

            tokenInterval = setInterval(() => {
                createToken()
            }, getRandomNumber(2000, 4000))
        }

        if (timer.seconds === 0) {
            clearInterval(interval)
            
            setIsGameActive(false)
            setIsGameOver(true)
        }

        return () => {
            clearInterval(interval)
          
        }
    }, [timer.seconds, isGameActive])

    return (
        <div className={`${styles.gameContainer} ${!isGameOver ? styles.gameActive : ''}`}>
            {!isGameOver && (
                <div className={`flex align__center justify__space__between ${styles.gameHeading}`}>
                    <div className={`flex align__center ${styles.gameTimer}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM12.75 6C12.75 5.80109 12.671 5.61032 12.5303 5.46967C12.3897 5.32902 12.1989 5.25 12 5.25C11.8011 5.25 11.6103 5.32902 11.4697 5.46967C11.329 5.61032 11.25 5.80109 11.25 6V12C11.25 12.414 11.586 12.75 12 12.75H16.5C16.6989 12.75 16.8897 12.671 17.0303 12.5303C17.171 12.3897 17.25 12.1989 17.25 12C17.25 11.8011 17.171 11.6103 17.0303 11.4697C16.8897 11.329 16.6989 11.25 16.5 11.25H12.75V6Z"
                                fill="white"
                            />
                        </svg>
                        <span className={styles.timerValue}>
                            {`${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`}
                        </span>
                    </div>
                    <div className={`flex align__center ${styles.currentGameBalance}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="43"
                            viewBox="0 0 40 43"
                            fill="none"
                        >
                            <g filter="url(#filter0_d_224_13358)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21.2842 9.04794C21.2039 8.94026 21.1026 8.84988 20.9866 8.78219C20.8705 8.7145 20.742 8.67089 20.6087 8.65396C20.4754 8.63704 20.3401 8.64714 20.2108 8.68368C20.0815 8.72022 19.9609 8.78243 19.8562 8.86661C17.3009 10.918 15.6154 13.8595 15.1375 17.1013C14.2618 16.4662 13.4941 15.6941 12.8642 14.8146C12.7787 14.695 12.6678 14.5958 12.5395 14.5239C12.4112 14.4521 12.2686 14.4094 12.1219 14.399C11.9752 14.3885 11.828 14.4106 11.6909 14.4635C11.5537 14.5165 11.4298 14.599 11.3282 14.7053C9.5673 16.5474 8.43854 18.9022 8.10542 21.4287C7.7723 23.9551 8.25213 26.5221 9.4754 28.7576C10.6987 30.9931 12.6019 32.7812 14.9093 33.8628C17.2167 34.9444 19.8085 35.2634 22.3094 34.7735C24.8102 34.2836 27.0901 33.0103 28.8189 31.138C30.5476 29.2657 31.6355 26.8917 31.9248 24.3599C32.2142 21.828 31.69 19.2698 30.4283 17.0557C29.1665 14.8417 27.2327 13.0868 24.9069 12.0453C23.4771 11.35 22.2349 10.3222 21.2842 9.04794ZM25.0002 24.9999C24.9997 25.7232 24.8423 26.4377 24.5389 27.0942C24.2355 27.7507 23.7932 28.3336 23.2427 28.8026C22.6921 29.2716 22.0464 29.6156 21.35 29.8109C20.6536 30.0061 19.9231 30.0479 19.209 29.9335C18.4949 29.819 17.8141 29.551 17.2136 29.148C16.6131 28.7449 16.1072 28.2163 15.7307 27.5987C15.3543 26.9812 15.1164 26.2893 15.0333 25.5708C14.9502 24.8524 15.024 24.1245 15.2495 23.4373C16.0869 24.0573 17.0495 24.5173 18.0935 24.7706C18.3766 22.9452 19.2836 21.2744 20.6602 20.0426C21.8616 20.2026 22.9639 20.7935 23.7622 21.7053C24.5605 22.6172 25.0005 23.788 25.0002 24.9999Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_224_13358"
                                    x="-3.76"
                                    y="-1.76"
                                    width="47.52"
                                    height="47.52"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.88" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_224_13358" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_224_13358" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                        <span className={styles.currentGameBalanceValue}>{gameBalance}</span>
                    </div>
                </div>
            )}
            {isGameActive && (
                <div className={styles.gameOverlay}>
                    {tokens.map((token) => (
                        <div
                            key={token.id}
                            className={styles.gameOverlayTapToken}
                            style={{
                                top: token.top,
                                left: token.left,
                                width: `${token.width}px`,
                                height: `${token.height}px`,
                            }}
                            onClick={() => handleTokenClick(token.id)}
                        >
                            <img src={getImage('fire.png')} alt="Эффект" />
                        </div>
                    ))}
                </div>
            )}
            {isGameOver && (
                <div className={`flex column align__center ${styles.gameOver}`}>
                    <div className={styles.gameOverAnimatedGif}>
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
                        <img
                            src={getImage('touchUp.gif')}
                            alt="Эффект"
                            style={{ filter: "url(#outline-filter)" }}
                        />
                        <img
                            src={getImage('touchUp.gif')}
                            alt="Эффект"
                            style={{ filter: "url(#fill-filter)" }}
                        />
                    </div>
                    <span className={styles.gameOverTitle}>
                        Дальше - больше!
                        <br />
                        Попробуй ещё раз
                    </span>
                    <div className={`flex column align__center ${styles.gameResults}`}>
                        <div className={`flex align__center ${styles.gameResultsContainer}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.4447 3.429C19.3543 3.30786 19.2404 3.20618 19.1098 3.13002C18.9793 3.05387 18.8347 3.00481 18.6848 2.98577C18.5348 2.96673 18.3826 2.9781 18.2371 3.0192C18.0917 3.0603 17.956 3.1303 17.8382 3.225C14.9635 5.53286 13.0673 8.84195 12.5297 12.489C11.5444 11.7745 10.6809 10.9059 9.97218 9.9165C9.87592 9.78195 9.75118 9.67029 9.60684 9.58946C9.46249 9.50864 9.3021 9.46065 9.13708 9.4489C8.97207 9.43715 8.8065 9.46195 8.65216 9.52151C8.49782 9.58107 8.35852 9.67394 8.24418 9.7935C6.26316 11.8658 4.9933 14.515 4.61854 17.3573C4.24378 20.1996 4.78359 23.0874 6.15977 25.6024C7.53595 28.1174 9.67704 30.1289 12.2729 31.3457C14.8687 32.5625 17.7846 32.9213 20.598 32.3702C23.4114 31.8191 25.9763 30.3866 27.9212 28.2803C29.866 26.174 31.0899 23.5032 31.4154 20.6549C31.7409 17.8066 31.1512 14.9285 29.7317 12.4377C28.3123 9.94694 26.1367 7.9727 23.5202 6.801C21.9117 6.01885 20.5142 4.86255 19.4447 3.429ZM23.6252 21.375C23.6246 22.1886 23.4475 22.9925 23.1062 23.7311C22.7648 24.4696 22.2673 25.1254 21.6479 25.653C21.0286 26.1806 20.3021 26.5676 19.5187 26.7873C18.7352 27.0069 17.9135 27.054 17.1101 26.9252C16.3067 26.7965 15.5408 26.495 14.8652 26.0415C14.1896 25.588 13.6205 24.9934 13.197 24.2986C12.7736 23.6039 12.5059 22.8255 12.4124 22.0172C12.319 21.209 12.4019 20.3901 12.6557 19.617C13.5977 20.3145 14.6807 20.832 15.8552 21.117C16.1736 19.0634 17.194 17.1837 18.7427 15.798C20.0942 15.978 21.3343 16.6427 22.2324 17.6686C23.1305 18.6944 23.6255 20.0116 23.6252 21.375Z"
                                    fill="white"
                                />
                            </svg>
                            <span className={styles.gameResultsValue}>{gameBalance}</span>
                        </div>
                        <span className={styles.gameResultsTitle}>Заработано</span>
                    </div>
                    <a href="/games" type="button" className={`flex align__center justify__center ${styles.continueButtonAfterGame}`}>
                        Продолжить
                    </a>
                </div>
            )}
        </div>
    )
}

export default TapGame