import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";

type TCurrenyResponse = {
    success: boolean,
    free_coin_to_donation_coin: number,
    donation_coin_to_free_coin: number
}

type TExchangeResponse = {
    success: boolean,
    sum: number
}

export const exchangeService = createApi({
    reducerPath: 'exchangeService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}exchange`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCurrency: builder.query<TCurrenyResponse, void>({
            query: () => ({
                url: '/currency',
                method: 'GET'
            })
        }),

        exchange: builder.mutation<TExchangeResponse, number>({
            query: (goldCoins) => ({
                url: `?donut_coins_count=${goldCoins}`,
                method: 'POST'
            })
        })
    })
})

export const { useGetCurrencyQuery, useExchangeMutation } = exchangeService