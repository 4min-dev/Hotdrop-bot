import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import ISessionUser from "../../interfaces/ISessionUser";
import initData from "../../assets/initData";
import IGameActivity from "../../interfaces/IGameActivity";
import ITask from "../../interfaces/ITask";
import ICaseResponse from "../../interfaces/ICaseResponse";
import INotification from "../../interfaces/INotification";
import { IReferral } from "../../interfaces/IReferral";

type TTasksResponse = {
    success: boolean,
    data: ITask[]
}

type TInventoryResponse = {
    success: boolean,
    keys: { id: string, title: string, img_url: string, count: number }[],
    cases: ICaseResponse[],
    weapons: ICaseResponse[]
}

type TNotificationsResponse = {
    success: boolean,
    data: INotification[]
}

type IReferralsResponse = {
    collected_reward: number,
    collectible_reward: number,
    success: boolean,
    data: IReferral[]
}

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}user`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),

    tagTypes: ['PATCH'],
    endpoints: (builder) => ({
        getUser: builder.query<ISessionUser, void>({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            providesTags: ['PATCH']
        }),

        deleteUser: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: '',
                method: 'DELETE'
            })
        }),

        getReferrals: builder.query<IReferralsResponse, void>({
            query: () => ({
                url: '/referrals',
                method: 'GET'
            }),
        }),

        updateUserSteam: builder.mutation<any, string>({
            query: (steam) => ({
                url: '',
                method: 'PATCH',
                params: {
                    steam
                }
            })
        }),

        updateUsername: builder.mutation<{ success: boolean }, string>({
            query: (username) => ({
                url: '',
                method: 'PATCH',
                params: {
                    username
                }
            }),
            invalidatesTags: ['PATCH']
        }),

        getGameActivity: builder.query<IGameActivity, void>({
            query: () => ({
                url: '/game_activity',
                method: 'GET'
            })
        }),

        getTasks: builder.query<TTasksResponse, void>({
            query: () => ({
                url: '/tasks',
                method: 'GET'
            })
        }),

        getInventory: builder.query<TInventoryResponse, void>({
            query: () => ({
                url: '/inventory',
                method: 'GET'
            })
        }),

        getNotifications: builder.query<TNotificationsResponse, void>({
            query: () => ({
                url: '/notifies',
                method: 'GET'
            })
        }),
    }),
})

export const { useGetUserQuery, useDeleteUserMutation, useGetReferralsQuery, useGetGameActivityQuery, useGetTasksQuery, useGetInventoryQuery, useGetNotificationsQuery, useUpdateUserSteamMutation, useUpdateUsernameMutation } = userService