export default interface ICraftedWeapon {
    id: string,
    weapon_id: string,
    defaultId?: string,
    uniqueId: string,
    title: string,
    img_url: string,
    rare: "consumer_grade" | "restricted" | 'rare' | 'classified' | 'cover' | 'legendary' | 'exceedingly_rare',
    cost: number,
    model: string,
    count: number
}