function useDebounce({ callback, delay }) {
    let timer = null

    return function debouncedCallback(...args) {
        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

function isMobileDevice() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const waterCountElement = document.querySelector('.current__water__count')
    const totalWaterCountElement = document.querySelector('.total__wtaer__count')
    const balanceValueElement = document.querySelector('.balance-value')
    const coinContainer = document.querySelector('.coin-container')
    const addButton = document.querySelector('.bonsai__image__container')
    const getBonsaiPopupContainer = document.querySelector('.get__bonsai__popup__container')
    const getBonsaiButton = document.querySelector('.get__bonsai__token__button')
    const timeoutBonsaiBlockPopup = document.querySelector('.timeout__block__popup__overlay')
    const trimTimeoutBonsaiValue = document.querySelector('.trim__timeout__value')

    let currentBalance = 0
    let waterAmount
    let totalWaterAmount

    const debouncedLog = useDebounce({
        callback: async () => {
            try {
                const response = await fetch(`https://tapalka.wizardstech.ru:8443/api/game/water?count=${totalWaterAmount - waterAmount}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })

                console.log(await response.json())
                return response
            } catch (error) {
                console.log(error)
            }
        },
        delay: 200,
    })

    addButton.addEventListener('click', () => {
        debouncedLog()
    })

    function createCoin() {
        const coin = document.createElement('div')
        coin.classList.add('coin')
        const randomX = Math.random() * (window.innerWidth - 20)
        coin.style.left = `${randomX}px`
        coinContainer.appendChild(coin)

    }

    function updateBalance(amount) {
        const newBalance = Number(balanceValueElement.textContent.replace(/\s/g, "")) + amount

        const formattedBalance = newBalance.toLocaleString('ru-RU')

        balanceValueElement.textContent = formattedBalance
        waterAmount = waterAmount - 1
        updateWaterValue()
    }

    if (isMobileDevice()) {
        addButton.addEventListener('touchstart', () => {
            const amountToAdd = 1
            const newBalance = currentBalance + amountToAdd
            updateBalance(newBalance)
            createCoin()
        })
    } else {
        addButton.addEventListener('click', () => {
            const amountToAdd = 1
            const newBalance = currentBalance + amountToAdd
            updateBalance(newBalance)
            createCoin()
        })
    }

    async function trimBonsai() {
        getBonsaiPopupContainer.classList.remove('visible')
        timeoutBonsaiBlockPopup.classList.add('visible')

        trimTimeoutBonsaiValue.setAttribute('data-timeout', '11:27')
    }

    async function getTrimStatus() {
        try {
            const response = await fetch('https://tapalka.wizardstech.ru:8443/api/game/trim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP err Status: ${response.status}`)
            }

            const data = await response.json()
        } catch (error) {
            console.log(error)
            getBonsaiButton.addEventListener('click', trimBonsai)
        }
    }

    async function getUserWater() {
        try {
            const response = await fetch('https://tapalka.wizardstech.ru:8443/api/users/me', {
                method: 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })

            if (!response.ok) {
                throw new Error(`HTTP err Status: ${response.status}`)
            }

            const data = await response.json()
            const userWaterAmount = data.water_count
            const userWaterAmountTotal = data.total_water_count

            waterAmount = userWaterAmount
            totalWaterAmount = userWaterAmountTotal

            updateWaterValue()
            totalWaterCountElement.textContent = totalWaterAmount
        } catch (error) {
            console.log(error)
        }
    }

    getUserWater()

    function updateWaterValue() {
        if (waterAmount <= 0) {
            waterCountElement.textContent = 0
            getBonsaiPopupContainer.classList.add('visible')

            getTrimStatus()
        } else {
            waterCountElement.textContent = waterAmount
        }
    }
})