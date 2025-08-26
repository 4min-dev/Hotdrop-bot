import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import initData from "../../assets/initData";
import { baseServiceURL } from "../baseServiceURL";

type TDailyRewardResponse = {
    success: boolean,
    reward: number
}

export const eventService = createApi({
    reducerPath: 'eventService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}event`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        claimDailyReward: builder.mutation<TDailyRewardResponse, void>({
            query: () => ({
                url: '/daily_reward_claimed',
                method: 'POST'
            })
        })
    })
})

export const { useClaimDailyRewardMutation } = eventService