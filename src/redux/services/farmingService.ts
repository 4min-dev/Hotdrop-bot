import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";

type TStartFarmingResponse = {
    success: boolean,
    profit: number,
    max_profit: number,
    end: Date
}

type TCollectFarmResponse = {
    success: boolean,
    profit: number,
    max_profit: number
}

export const farmingService = createApi({
    reducerPath: 'farmingService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}farm`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        startFarming: builder.mutation<TStartFarmingResponse, void>({
            query: () => ({
                url: '',
                method: 'POST'
            })
        }),

        collectFarm: builder.mutation<TCollectFarmResponse, void>({
            query: () => ({
                url: '/get',
                method: 'POST'
            })
        })
    })
})

export const { useStartFarmingMutation, useCollectFarmMutation } = farmingService