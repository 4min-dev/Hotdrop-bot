import React from 'react'
import styles from './SelectedGame.module.scss'
import Popup from '../popup/Popup'
import getImage from '../../../../assets/getImage'
import { IGameData } from '../../../../interfaces/IGameData'

const SelectedGamePopup: React.FC<{ selectedGame: IGameData, isActive: boolean, id?:string }> = ({ selectedGame, isActive, id }) => {
    return (
        <Popup isActive={isActive} id={styles.selectedGamePopupOverlay} className={id}>
            {
                selectedGame && (
                    <div className={`flex column ${styles.selectedGamePopup}`}>
                        <div className={styles.selectedGamePreview} style={{ backgroundImage: selectedGame.backgroundColor }}>
                            <img src={getImage(selectedGame.preview)} alt={selectedGame.title} />
                        </div>

                        <div className={`flex align__center justify__space__between ${styles.selectedGamePopupHeading}`}>
                            <div className={`flex align__center ${styles.userRecordCard}`}>
                                <div className={styles.previewRecord}>
                                    <img src={getImage(selectedGame.recordPreview)} alt='Рекорд' />
                                </div>
                                <div className={`flex column ${styles.selectedGameCardTextContainer}`}>
                                    <span className={styles.selectedGameHeadingCardTitle}>
                                        Лучший результат
                                    </span>

                                    <span className={styles.selectedGameHeadingCardDescription}>
                                        {selectedGame.record}
                                    </span>
                                </div>
                            </div>

                            <div className={`flex align__center justify__center ${styles.avaliableTicketsCard}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 5.3125C1.25 4.44917 1.95 3.75 2.8125 3.75H17.1875C18.05 3.75 18.75 4.45 18.75 5.3125V7.83417C18.7501 7.94394 18.7212 8.05181 18.6664 8.14689C18.6115 8.24198 18.5326 8.32094 18.4375 8.37583C18.1521 8.54018 17.915 8.77684 17.7502 9.06197C17.5853 9.34711 17.4985 9.67064 17.4985 10C17.4985 10.3294 17.5853 10.6529 17.7502 10.938C17.915 11.2232 18.1521 11.4598 18.4375 11.6242C18.5326 11.6791 18.6115 11.758 18.6664 11.8531C18.7212 11.9482 18.7501 12.0561 18.75 12.1658V14.6875C18.75 15.55 18.05 16.25 17.1875 16.25H2.8125C2.3981 16.25 2.00067 16.0854 1.70765 15.7924C1.41462 15.4993 1.25 15.1019 1.25 14.6875V12.1658C1.24985 12.0561 1.27857 11.9483 1.33327 11.8532C1.38798 11.7582 1.46675 11.6792 1.56167 11.6242C1.84709 11.4598 2.08416 11.2232 2.24901 10.938C2.41385 10.6529 2.50064 10.3294 2.50064 10C2.50064 9.67064 2.41385 9.34711 2.24901 9.06197C2.08416 8.77684 1.84709 8.54018 1.56167 8.37583C1.46675 8.32084 1.38798 8.24183 1.33327 8.14675C1.27857 8.05167 1.24985 7.94386 1.25 7.83417V5.3125ZM13.75 4.375C13.9158 4.375 14.0747 4.44085 14.1919 4.55806C14.3092 4.67527 14.375 4.83424 14.375 5V5.625C14.375 5.79076 14.3092 5.94973 14.1919 6.06694C14.0747 6.18415 13.9158 6.25 13.75 6.25C13.5842 6.25 13.4253 6.18415 13.3081 6.06694C13.1908 5.94973 13.125 5.79076 13.125 5.625V5C13.125 4.83424 13.1908 4.67527 13.3081 4.55806C13.4253 4.44085 13.5842 4.375 13.75 4.375ZM14.375 8.125C14.375 7.95924 14.3092 7.80027 14.1919 7.68306C14.0747 7.56585 13.9158 7.5 13.75 7.5C13.5842 7.5 13.4253 7.56585 13.3081 7.68306C13.1908 7.80027 13.125 7.95924 13.125 8.125V8.75C13.125 8.91576 13.1908 9.07473 13.3081 9.19194C13.4253 9.30915 13.5842 9.375 13.75 9.375C13.9158 9.375 14.0747 9.30915 14.1919 9.19194C14.3092 9.07473 14.375 8.91576 14.375 8.75V8.125ZM13.75 10.625C13.9158 10.625 14.0747 10.6908 14.1919 10.8081C14.3092 10.9253 14.375 11.0842 14.375 11.25V11.875C14.375 12.0408 14.3092 12.1997 14.1919 12.3169C14.0747 12.4342 13.9158 12.5 13.75 12.5C13.5842 12.5 13.4253 12.4342 13.3081 12.3169C13.1908 12.1997 13.125 12.0408 13.125 11.875V11.25C13.125 11.0842 13.1908 10.9253 13.3081 10.8081C13.4253 10.6908 13.5842 10.625 13.75 10.625ZM14.375 14.375C14.375 14.2092 14.3092 14.0503 14.1919 13.9331C14.0747 13.8158 13.9158 13.75 13.75 13.75C13.5842 13.75 13.4253 13.8158 13.3081 13.9331C13.1908 14.0503 13.125 14.2092 13.125 14.375V15C13.125 15.1658 13.1908 15.3247 13.3081 15.4419C13.4253 15.5592 13.5842 15.625 13.75 15.625C13.9158 15.625 14.0747 15.5592 14.1919 15.4419C14.3092 15.3247 14.375 15.1658 14.375 15V14.375ZM5 10C5 9.83424 5.06585 9.67527 5.18306 9.55806C5.30027 9.44085 5.45924 9.375 5.625 9.375H10C10.1658 9.375 10.3247 9.44085 10.4419 9.55806C10.5592 9.67527 10.625 9.83424 10.625 10C10.625 10.1658 10.5592 10.3247 10.4419 10.4419C10.3247 10.5592 10.1658 10.625 10 10.625H5.625C5.45924 10.625 5.30027 10.5592 5.18306 10.4419C5.06585 10.3247 5 10.1658 5 10ZM5.625 11.875C5.45924 11.875 5.30027 11.9408 5.18306 12.0581C5.06585 12.1753 5 12.3342 5 12.5C5 12.6658 5.06585 12.8247 5.18306 12.9419C5.30027 13.0592 5.45924 13.125 5.625 13.125H8.125C8.29076 13.125 8.44973 13.0592 8.56694 12.9419C8.68415 12.8247 8.75 12.6658 8.75 12.5C8.75 12.3342 8.68415 12.1753 8.56694 12.0581C8.44973 11.9408 8.29076 11.875 8.125 11.875H5.625Z" fill="white" />
                                </svg>

                                <span className={`${styles.avaliableTicketsContainer}`}>
                                    {`${selectedGame.currentTickets}`}{`/${selectedGame.totalTickets}`}
                                </span>
                            </div>
                        </div>

                        <div className={`flex column ${styles.selectedGamePopupContent}`}>
                            <div className={`flex align__center justify__space__between ${styles.selectedGameUserResults}`}>
                                <div className={`flex align__center ${styles.selectedGameResultsCard}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM12.75 6C12.75 5.80109 12.671 5.61032 12.5303 5.46967C12.3897 5.32902 12.1989 5.25 12 5.25C11.8011 5.25 11.6103 5.32902 11.4697 5.46967C11.329 5.61032 11.25 5.80109 11.25 6V12C11.25 12.414 11.586 12.75 12 12.75H16.5C16.6989 12.75 16.8897 12.671 17.0303 12.5303C17.171 12.3897 17.25 12.1989 17.25 12C17.25 11.8011 17.171 11.6103 17.0303 11.4697C16.8897 11.329 16.6989 11.25 16.5 11.25H12.75V6Z" fill="white" />
                                    </svg>

                                    <div className={`flex column ${styles.selectedGameResultsCardTextContainer}`}>
                                        <span className={styles.selectedGameResultsCardTitle}>Активность</span>
                                        <span className={styles.selectedGameResultsCardDescription}>{selectedGame.lastActivity}</span>
                                    </div>
                                </div>

                                <div className={`flex align__center ${styles.selectedGameResultsCard}`}>
                                    <div className={styles.recordPreview}>
                                        <img src={getImage(selectedGame.recordPreview)} alt={selectedGame.title} />
                                    </div>

                                    <div className={`flex column ${styles.selectedGameResultsCardTextContainer}`}>
                                        <span className={styles.selectedGameResultsCardTitle}>Лучший резуль.</span>
                                        <span className={styles.selectedGameResultsCardDescription}>{selectedGame.record}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex column ${styles.selectedGameResultsPopupBlocksContainer}`}>
                                <div className={`flex column ${styles.selectedGameResultsPopupBlock}`}>
                                    <span className={styles.selectedGameResultsPopupBlockType}>
                                        Игровой режим
                                    </span>

                                    <div className={`flex column ${styles.selectedGameResultsPopupBlockTitleContainer}`}>
                                        <span className={styles.selectedGameResultsPopupBlockTitle}>
                                            Соединение оружия
                                        </span>

                                        <span className={styles.selectedGameResultsPopupBlockDescription}>
                                            В этом режиме игрок получает возможность объединять оружие, повышая его уровень. Начав с базовых скинов, игрок соединяет два одинаковых предмета, чтобы получить оружие более высокого класса. С каждым уровнем редкость и ценность оружия увеличивается, а на финальном этапе можно либо продать скин за внутриигровую валюту, либо сохранить его в инвентаре для дальнейшего вывода через Steam.
                                        </span>
                                    </div>
                                </div>

                                <div className={`flex column ${styles.selectedGameResultsPopupBlock}`}>
                                    <div className={`flex column ${styles.selectedGameResultsPopupBlockTitleContainer}`}>
                                        <span className={styles.selectedGameResultsPopupBlockTitle}>
                                            Как играть
                                        </span>
                                    </div>

                                    <ul className={`flex column ${styles.selectedGameHowToPlay}`}>
                                        {selectedGame.howPlay &&
                                            selectedGame.howPlay.map((item, index) => (
                                                <li key={index} className={styles.howPlayElement} dangerouslySetInnerHTML={{ __html: item }} />
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <a href={`/${selectedGame.href}`} className={`flex align__center justify__space__between ${styles.startGameButton}`}>
                            <span className={styles.buttonText}>Начать игру</span>
                            <div className={`flex align__center ${styles.gamePriceContainer}`}>
                                <span className={styles.gamePrice}>1</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6001 2.3999C13.0775 2.3999 13.5353 2.58954 13.8729 2.92711C14.2105 3.26468 14.4001 3.72251 14.4001 4.1999V5.1711C14.4001 5.5095 14.1785 5.8015 13.8937 5.9863C13.5578 6.20398 13.2818 6.50229 13.0908 6.854C12.8998 7.20572 12.7998 7.59966 12.8001 7.9999C12.8001 8.8439 13.2353 9.5855 13.8937 10.0135C14.1785 10.1983 14.4001 10.4903 14.4001 10.8295V11.7999C14.4001 12.2773 14.2105 12.7351 13.8729 13.0727C13.5353 13.4103 13.0775 13.5999 12.6001 13.5999H3.4001C2.92271 13.5999 2.46487 13.4103 2.12731 13.0727C1.78974 12.7351 1.6001 12.2773 1.6001 11.7999V10.8295C1.6001 10.4903 1.8217 10.1983 2.1065 10.0135C2.44232 9.79577 2.71831 9.49745 2.90932 9.14575C3.10033 8.79404 3.2003 8.40013 3.2001 7.9999C3.20037 7.59966 3.10044 7.20572 2.90942 6.854C2.7184 6.50229 2.44237 6.20398 2.1065 5.9863C1.8217 5.8015 1.6001 5.5095 1.6001 5.1703V4.1999C1.6001 3.72251 1.78974 3.26468 2.12731 2.92711C2.46487 2.58954 2.92271 2.3999 3.4001 2.3999H12.6001ZM10.8001 5.9167C10.8001 5.75757 10.7369 5.60496 10.6244 5.49244C10.5118 5.37992 10.3592 5.3167 10.2001 5.3167C10.041 5.3167 9.88836 5.37992 9.77583 5.49244C9.66331 5.60496 9.6001 5.75757 9.6001 5.9167V6.7503C9.6001 6.90943 9.66331 7.06205 9.77583 7.17457C9.88836 7.28709 10.041 7.3503 10.2001 7.3503C10.3592 7.3503 10.5118 7.28709 10.6244 7.17457C10.7369 7.06205 10.8001 6.90943 10.8001 6.7503V5.9167ZM10.8001 9.2503C10.8001 9.09117 10.7369 8.93856 10.6244 8.82604C10.5118 8.71352 10.3592 8.6503 10.2001 8.6503C10.041 8.6503 9.88836 8.71352 9.77583 8.82604C9.66331 8.93856 9.6001 9.09117 9.6001 9.2503V10.0831C9.6001 10.2422 9.66331 10.3948 9.77583 10.5074C9.88836 10.6199 10.041 10.6831 10.2001 10.6831C10.3592 10.6831 10.5118 10.6199 10.6244 10.5074C10.7369 10.3948 10.8001 10.2422 10.8001 10.0831V9.2503Z" fill="white" />
                                </svg>
                            </div>
                        </a>
                    </div>
                )
            }
        </Popup>
    )
}

export default SelectedGamePopup
