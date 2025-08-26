import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import initData from "../../assets/initData";
import { baseServiceURL } from "../baseServiceURL";
import ICaseWeapon from "../../interfaces/ICaseWeapon";

type TCaseResponse = {
    id: string,
    title: string,
    img_url: string,
    key: {
        id: string,
        title: string,
        img_url: string,
        type: 'base' | 'premium',
        donation_coins_price: number,
        free_coins_price: number
    },
    type: 'base' | 'premium',
    donation_coins_price: number,
    free_coins_price: number,
    weapons: ICaseWeapon[]
}

type TOpenCaseResponse = {
    success: boolean
} & ICaseWeapon

export const caseService = createApi({
    reducerPath: 'caseService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}case`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCase: builder.query<TCaseResponse, string>({
            query: (caseId) => ({
                url: `/${caseId}`,
                method: 'GET'
            })
        }),

        openCase: builder.mutation<TOpenCaseResponse, string>({
            query: (caseId) => ({
                url: `/${caseId}/open`,
                method: 'POST'
            })
        })
    })
})

export const { useGetCaseQuery, useOpenCaseMutation } = caseService