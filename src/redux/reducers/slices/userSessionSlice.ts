import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISessionUser from "../../../interfaces/ISessionUser";

type TSessionUser = {
    user: ISessionUser
}

const initialState: TSessionUser = {
    user: {
        id: "",
        tg_id: 0,
        tg_username: "",
        username: "",
        created_at: "",
        lvl: {
            lvl: 0,
            lvl_percent_progress: 0,
            next_lvl_points: 0,
            points: 0
        },
        steam: null,
        balance: {
            tickets: 0,
            donation_coins: 0,
            free_coins: 0
        },
        daily_reward: {
            day: 0,
            claimed: false
        },
        farm: {
            end: null,
            max_actual_profit: 0,
            max_profit: 0,
            profit: 0,
            start: null,
            stopped: false
        },
        game_activity: {
            catching: {
                record: 0,
                last_activity: null
            },
            clicker: {
                record: 0,
                last_activity: null
            },
            craft: {
                record_cost: 0,
                last_activity: null,
                img_url: null,
                title: null
            }
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
}

const userSessionSlice = createSlice({
    name: 'userSessionSlice',
    initialState,
    reducers: {
        newUserSession(state, action: PayloadAction<ISessionUser>) {
            state.user = action.payload
        }
    }
})