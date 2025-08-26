import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";
import ICaseResponse from "../../interfaces/ICaseResponse";
import IDailyReward from "../../interfaces/IDailyReward";
import IUserFromRating from "../../interfaces/IUserFromRating";

type TCaseResponse = {
    success: boolean
    data: ICaseResponse[]
}

type TDailyRewardsResponse = {
    success: boolean,
    data: IDailyReward[]
}

type TUsersRatingResponse = {
    success: boolean,
    data: IUserFromRating[]
}

export const listService = createApi({
    reducerPath: 'listService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}list`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCaseList: builder.query<TCaseResponse, void>({
            query: () => ({
                url: '/case',
                method: 'GET'
            })
        }),

        getKeyList: builder.query<TCaseResponse, void>({
            query: () => ({
                url: '/key',
                method: 'GET'
            })
        }),

        getDailyRewards: builder.query<TDailyRewardsResponse, void>({
            query: () => ({
                url: '/daily_reward',
                method: 'GET'
            })
        }),

        getUsersRating: builder.query<TUsersRatingResponse, void>({
            query: () => ({
                url: '/rating',
                method: 'GET'
            })
        })
    })
})

export const { useGetCaseListQuery, useGetKeyListQuery, useGetDailyRewardsQuery, useGetUsersRatingQuery } = listService