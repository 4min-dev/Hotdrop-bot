import ICaseResponse from "../interfaces/ICaseResponse"
import ICaseWeapon from "../interfaces/ICaseWeapon"

export default function getRarityStyles(obj: ICaseResponse | ICaseWeapon) {
    if (!obj) return {}

    if ('rare' in obj && obj.rare) {
        const rare = obj.rare.toLowerCase()

        if (rare === 'consumer grade') {
            return {
                rarityBackground: '#4A4A4A',
                rarityBorder: '#737373',
            }
        }

        if (rare === 'rare') {
            return {
                rarityCategoryBackground: '#21A9E3',
                rarityBackground: '#228BB8',
                rarityBorder: '#21A9E3',
                rarityButton: 'linear-gradient(90deg, #8ED3F0 0%, #21A9E3 50%, #1476A0 100%)',
            }
        }

        if (rare === 'restricted') {
            return {
                rarityBackground: '#283D90',
                rarityBorder: '#2148E3',
                rarityCategoryBackground: '#21A9E3',
                rarityButton: '#21A9E3'
            }
        }

        if (rare === 'classified') {
            return {
                rarityBackground: '#54188F',
                rarityBorder: '#9D49F1',
            }
        }

        if (rare === 'covert') {
            return {
                rarityBackground: '#9B2EAB',
                rarityBorder: '#DB49F1',
            }
        }

        if (rare === 'legendary') {
            return {
                rarityBackground: '#AF2023',
                rarityBorder: '#EF2427',
            }
        }

        if (rare === 'exceedingly_rare') {
            return {
                rarityPreviewBackground: '#504929',
                rarityBackground: 'rgba(197, 170, 46, 1)',
                rarityBorder: '#C5AA2E',
                rarityCategoryBackground: '#DFB80A',
                rarityButton: '#DFB80A'
            }
        }

        return {
            rarityBackground: '#4A4A4A',
            rarityBorder: '#737373',
        }
    }

    else if ('type' in obj && obj.type) {
        if (obj.type === 'base') {
            return {
                rarityBackground: '#283D90',
                rarityBorder: '#2148E3',
                rarityCategoryBackground: '#21A9E3',
                rarityButton: '#21A9E3'
            }
        }

        if (obj.type === 'premium') {
            return {
                rarityPreviewBackground: '#504929',
                rarityBackground: 'rgba(197, 170, 46, 1)',
                rarityBorder: '#C5AA2E',
                rarityCategoryBackground: '#DFB80A',
                rarityButton: '#DFB80A'
            }
        }
    }

    return {}
}