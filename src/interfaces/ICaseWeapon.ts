export default interface ICaseWeapon {
    id: string,
    weapon_id: string,
    title: string,
    img_url: string,
    rare: "consumer_grade" | "restricted" | 'rare' | 'classified' | 'cover' | 'legendary' | 'exceedingly_rare',
    donation_coins_price?: number,
    free_coins_price: number,
    cost: number,
    hint?: string,
    model: string,
    rarityBackground?: string,
    rarityBorder?: string,
    rarityCategoryBackground?: string,
    rarityButton?: string
}