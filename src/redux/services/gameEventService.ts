import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";
import ICraftedWeapon from "../../interfaces/ICraftedWeapon";

type TStartCraftResponse = {
    success: boolean,
    inventory_weapons: ICraftedWeapon[],
    crafted_weapons: ICraftedWeapon[]
}

type TCraftedWeaponResponse = {
    success: boolean,
    id: string,
    weapon_id: string,
    img_url: string,
    title: string,
    model: string,
    cost: number,
    count: number,
    type: string,
    free_coins_price: number,
    rare: "consumer_grade" | "restricted" | 'rare' | 'classified' | 'cover' | 'legendary' | 'exceedingly_rare',
    max_rare: boolean
}

type TCraftWeaponBody = {
    first_weapon: {
        source: "inventory" | "crafted_weapons",
        weapon_id: string,
    },

    second_weapon: {
        source: "inventory" | "crafted_weapons",
        weapon_id: string,
    }
}

type TGameEnd = {
    success: boolean,
    reward: boolean
}

type TSelledWeapon = {
    success: boolean,
    reward: number
}

export const gameEventService = createApi({
    reducerPath: 'gameEventService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}game_event`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        startCraftGame: builder.mutation<TStartCraftResponse, void>({
            query: () => ({
                url: '/start_weapon_craft',
                method: 'POST'
            })
        }),

        startCraftWeapon: builder.mutation<TCraftedWeaponResponse, TCraftWeaponBody>({
            query: ({ first_weapon, second_weapon }) => ({
                url: '/weapon_crafted',
                method: 'POST',
                body: {
                    first_weapon,
                    second_weapon
                }
            })
        }),

        coinCaught: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: '/caught',
                method: 'POST'
            })
        }),

        catchingEnd: builder.mutation<TGameEnd, void>({
            query: () => ({
                url: '/catching_end',
                method: 'POST'
            })
        }),

        coinClick: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: '/click',
                method: 'POST'
            })
        }),

        coinClickerEnd: builder.mutation<TGameEnd, void>({
            query: () => ({
                url: '/clicker_end',
                method: 'POST'
            })
        }),

        sellCraftedWeapon: builder.mutation<TSelledWeapon, string>({
            query: (weaponId) => ({
                url: `/sell_weapon/${weaponId}`,
                method: 'POST'
            })
        })
    })
})

export const { useStartCraftGameMutation, useStartCraftWeaponMutation, useCoinCaughtMutation, useCatchingEndMutation, useCoinClickMutation, useCoinClickerEndMutation, useSellCraftedWeaponMutation } = gameEventService