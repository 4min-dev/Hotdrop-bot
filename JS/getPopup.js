import { applyFilter } from "./filterWrapper.js"

document.addEventListener("DOMContentLoaded", function () {
    const popupActivateButtons = document.querySelectorAll('.get__popup__button')
    const popupOverlays = document.querySelectorAll('.popup__overlay')
    const navbarButtons = document.querySelectorAll('.navbar__panel__button')
    const closeAllButtons = document.querySelectorAll('.close__all__button')
    const filterButtons = document.querySelectorAll('.events__filter__button')

    function getPopupHandler(event) {
        const getPopupButton = event.currentTarget
        const popupFilterDefault = event.currentTarget.getAttribute('data-filter-for')

        if(popupFilterDefault) {
            filterButtons.forEach((filterButton) => {
                if(filterButton.getAttribute('data-filter') === popupFilterDefault) {
                    filterButton.classList.add('active')
                } else {
                    filterButton.classList.remove('active')
                }
            })

            applyFilter(popupFilterDefault)
        }
        
        const popupId = getPopupButton.getAttribute('data-popup-id')

        disableScroll()

        const targetPopupOverlay = Array.from(popupOverlays).find(
            (popupOverlay) => popupOverlay.getAttribute('data-id') === popupId
        )

        if (!targetPopupOverlay) return

        if (targetPopupOverlay.classList.contains('visible')) {
            return
            // closePopupHandler(targetPopupOverlay)
            // makeFirstNavbarButtonActive()
        }

        const activeProfileOverlay = Array.from(popupOverlays).find(
            (popupOverlay) =>
                popupOverlay.classList.contains('visible') &&
                popupOverlay.classList.contains('profile__overlay') &&
                popupOverlay.classList.contains('without__close__overlay')
        )

        if (
            activeProfileOverlay &&
            popupId !== 'settings__popup__overlay' &&
            popupId !== 'change__username__popup__overlay' &&
            popupId !== 'delete__account__popup__overlay'
        ) {
            closePopupHandler(activeProfileOverlay)
            return
        }

        if (
            popupId !== 'about__events__popup' &&
            popupId !== 'settings__popup__overlay' &&
            popupId !== 'change__username__popup__overlay' &&
            popupId !== 'delete__account__popup__overlay'
        ) {
            const activePopup = Array.from(popupOverlays).find(
                (popupOverlay) => popupOverlay.classList.contains('visible')
            )
        console.log(targetPopupOverlay.classList)
            if (activePopup && activePopup !== targetPopupOverlay && !targetPopupOverlay.classList.contains('selected__store__card__overlay') && !targetPopupOverlay.classList.contains('selected__event__popup__overlay')) {
                if(Array.from(popupOverlays).some((popupOverlay) => !popupOverlay.classList.contains('visible'))) {
                    closePopupHandler(activePopup, true)
                } else {
                    closePopupHandler(activePopup, false)
                }
            }
        }

        targetPopupOverlay.classList.add('visible')
        disableScroll()

        makeButtonActive(getPopupButton)
    }

    function closePopupHandler(popupOverlay, isNotMakeFirst) {
        if (popupOverlay.classList.contains('visible') && !popupOverlay.classList.contains('bonsai__popup__overlay')) {
            popupOverlay.classList.remove('visible')
            enableScroll()
            resetInputsInPopup(popupOverlay)

            if (!Array.from(navbarButtons).some((btn) => btn.classList.contains('active')) && !isNotMakeFirst) {
                makeFirstNavbarButtonActive()
            }
        }
    }

    function resetInputsInPopup(popupOverlay) {
        const inputs = popupOverlay.querySelectorAll('input, textarea, select')
        inputs.forEach((input) => {
            switch (input.type) {
                case 'checkbox':
                case 'radio':
                    input.checked = false
                    break
                default:
                    input.value = ''
                    break
            }
        })

        document.querySelector('.save__username__button')?.setAttribute('disabled', 'true')
    }


    function disableScroll() {
        document.querySelector('#main__page').style.overflow = 'hidden'
    }

    function enableScroll() {
        document.querySelector('#main__page').style.overflow = 'hidden'
    }

    function makeButtonActive(button) {
        console.log(button)
        if(button.classList.contains('about__events__button') || button.classList.contains('home__page__events__card') || button.classList.contains('get__store__card__button')) return

        navbarButtons.forEach((btn) => btn.classList.remove('active'))
        button.classList.add('active')
    }

    function makeFirstNavbarButtonActive() {
        setTimeout(() => {
            navbarButtons.forEach((button) => button.classList.remove('active'))
            const firstNavbarButton = navbarButtons[0]
            if (firstNavbarButton) {
                firstNavbarButton.classList.add('active')
            }
        }, 20)
    }

    closeAllButtons.forEach((closeAllButton) => {
        closeAllButton.addEventListener('click', () => {
            popupOverlays.forEach((popupOverlay) => {
                if (popupOverlay.classList.contains('visible') && !popupOverlay.classList.contains('bonsai__popup__overlay')) {
                    closePopupHandler(popupOverlay)
                }
            })
        })
    })

    popupActivateButtons.forEach((popupActivateButton) => {
        popupActivateButton.addEventListener('click', getPopupHandler)
    })

    popupOverlays.forEach((popupOverlay) => {
        popupOverlay.addEventListener('click', (e) => {
            if (
                e.target === popupOverlay &&
                !popupOverlay.classList.contains('without__close__overlay')
            ) {
                closePopupHandler(popupOverlay)
            }
        })

        const closePopupButtons = popupOverlay.querySelectorAll('.close__popup__button')
        closePopupButtons.forEach((closePopupButton) => {
            closePopupButton.addEventListener('click', () => {
                closePopupHandler(popupOverlay)
            })
        })

        const popupContent = popupOverlay.querySelector('.popup')
        if (popupContent) {
            popupContent.addEventListener('click', (e) => {
                e.stopPropagation()
            })
        }
    })
})