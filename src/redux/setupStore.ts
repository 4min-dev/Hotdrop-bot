import { configureStore } from "@reduxjs/toolkit"
import { userService } from "./services/userService"
import { listService } from "./services/listService"
import { eventService } from "./services/eventService"
import { shopService } from "./services/shopService"
import { exchangeService } from "./services/exchangeService"
import { farmingService } from "./services/farmingService"
import { referralService } from "./services/referralService"
import { weaponService } from "./services/weaponService"
import { gameEventService } from "./services/gameEventService"
import { caseService } from "./services/caseService"

export default function setupStore() {
    return configureStore({
        reducer: {
            [userService.reducerPath]: userService.reducer,
            [listService.reducerPath]: listService.reducer,
            [eventService.reducerPath]: eventService.reducer,
            [shopService.reducerPath]: shopService.reducer,
            [exchangeService.reducerPath]: exchangeService.reducer,
            [farmingService.reducerPath]: farmingService.reducer,
            [referralService.reducerPath]: referralService.reducer,
            [weaponService.reducerPath]: weaponService.reducer,
            [gameEventService.reducerPath]: gameEventService.reducer,
            [caseService.reducerPath]: caseService.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            userService.middleware,
            listService.middleware,
            eventService.middleware,
            shopService.middleware,
            exchangeService.middleware,
            farmingService.middleware,
            referralService.middleware,
            weaponService.middleware,
            gameEventService.middleware,
            caseService.middleware
        )
    })
}