import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";

type TReferralsReward = {
    success: boolean,
    sum: number
}

type TAddedReferral = {
    success: boolean
}

export const referralService = createApi({
    reducerPath: 'referralService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}referral`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getReferralsReward: builder.mutation<TReferralsReward, void>({
            query: () => ({
                url: '/reward',
                method: 'POST'
            }),
        }),

        addReferral: builder.mutation<TAddedReferral, string>({
            query: (referralId) => ({
                url: `/${referralId}`,
                method: 'POST'
            })
        })
    })
})

export const { useGetReferralsRewardMutation, useAddReferralMutation } = referralService