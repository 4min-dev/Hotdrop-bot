document.addEventListener('DOMContentLoaded', () => {
    const bonsaiElement = document.querySelector('#bonsai__main')

    const bonsaiData = [
        {
            id:1,
            value:'seed',
            img:'/static/img/bonsai-1.png'
        },

        {
            id:2,
            value:'sprout',
            img:'/static/img/bonsai-2.png'
        },

        {
            id:3,
            value:'young',
            img:'/static/img/bonsai-3.png'
        },

        {
            id:4,
            value:'mature',
            img:'/static/img/bonsai-4.png'
        }
    ]

    let bonsaiStage
    let waterCount

    async function plantBonsai() {
        try {
            const response = await fetch('https://tapalka.wizardstech.ru:8443/api/game/plant', {
                method:'POST',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            return response.json()
        } catch (error) {
            console.log(`Plant error ${error}`)
        }
    }

    const getUserBonsai = async () => {
        try {
            const response = await fetch('https://tapalka.wizardstech.ru:8443/api/game/bonsai', {
                method: 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })

            if (!response.ok) {
                console.log(`HTTP err Status: ${response.status}`)
            }

            const data = await response.json()
            bonsaiStage = data.stage
            waterCount = data.water_count

            const currentBonsai = bonsaiData.find((bonsai) => bonsai.value === bonsaiStage)
        
            if(currentBonsai) {
                bonsaiElement.setAttribute('src', currentBonsai.img)
            } else {
                plantBonsai()
            }

            console.log(data)
        } catch (error) {
            console.error('Err fetching:', error)
        }
    }

    getUserBonsai()
})