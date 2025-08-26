export default interface ISessionUser {
    id: string,
    tg_id: number,
    tg_username: string,
    username: string,
    created_at: string,
    lvl: {
        lvl: number,
        points: number,
        next_lvl_points: number,
        lvl_percent_progress: number
    },
    steam: null | string,
    balance: {
        tickets: number,
        donation_coins: number,
        free_coins: number
    },
    daily_reward: {
        day: number,
        claimed: boolean
    },
    farm: {
        end: null | Date,
        max_actual_profit: number,
        max_profit: number,
        profit: number,
        start: null | Date,
        stopped: boolean
    },
    game_activity: {
        catching: {
            record: number,
            last_activity: null | number
        },

        clicker: {
            record: number,
            last_activity: null | number
        },

        craft: {
            record_cost: number,
            last_activity: null | number,
            img_url: null | string,
            title: null | string
        },
    },
    inventory: {
        keys: [],
        cases: [],
        weapons: []
    },
    notifies: [],
    referrals: [],
    tasks: []
}