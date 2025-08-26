import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServiceURL } from "../baseServiceURL";
import initData from "../../assets/initData";

export const shopService = createApi({
    reducerPath: 'shopService',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServiceURL}shop`,
        prepareHeaders: (headers, { getState }) => {
            if (initData) {
                headers.set("X-Tg-Init-Data", JSON.stringify(initData));
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        purchaseInventoryItem: builder.mutation<{ success: boolean }, { itemId: string, valute: string }>({
            query: ({ itemId, valute }) => ({
                url: `/inventory_item/${itemId}`,
                method: 'POST',
                params: { valute }
            })
        })
    })
})

export const { usePurchaseInventoryItemMutation } = shopService