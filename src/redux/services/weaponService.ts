import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";

type TSellWeaponResponse = {
    success: boolean,
    cost: number
}

export const weaponService = createApi({
    reducerPath: 'weaponService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}weapon`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        sellWeapon: builder.mutation<TSellWeaponResponse, string>({
            query: (weaponId) => ({
                url: `/${weaponId}/sell`,
                method: 'POST'
            })
        })
    })
})

export const { useSellWeaponMutation } = weaponService