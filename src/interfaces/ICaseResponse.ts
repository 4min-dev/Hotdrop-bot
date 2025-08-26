export default interface ICaseResponse {
    id: string | number,
    uniqueId?: string,
    defaultId?: string | number,
    weapon_id?: string,
    title: string
    img_url: string
    rare?: string
    key?: {
        id: string
        title: string
        img_url: string
    }
    weapons?: [
        {
            id: string
            title: string
            img_url: string
            rare: string
        }
    ],
    itemType?: string,
    model: string,
    type: string,
    cost?: number,
    donation_coins_price?: number
    free_coins_price: number
    rarityBackground?: string
    rarityShadow?: string
    popupRarityBorder?: string
    rarityBorder?: string
    topShadow?: string
    hint?: string
    rarityButton?: string
    rarityCategoryBackground?: string
    rarityCategoryShadow?: string,
    rarityPreviewBackground?: string,
    count: number,
    isCraftedWeapon?: boolean,
    success?: boolean
}