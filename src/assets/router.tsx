import { createBrowserRouter } from "react-router-dom"
import HomePage from "../components/pages/home/Home"
import EventsPage from "../components/pages/events/Events"
import RootLayout from "../components/RootLayout"
import ReferralPage from "../components/pages/referral/Referral"
import CasesPage from "../components/pages/cases/Cases"
import StorePage from "../components/pages/store/Store"
import Games from "../components/pages/games/Games"
import GunsConnection from "../components/pages/gunsConnection/GunsConnection"
import GetMoneyGame from "../components/pages/getMoneyGame/GetMoneyGame"
import TapGame from "../components/pages/tapGame/TapGame"
import Settings from "../components/pages/settings/Settings"
import Exchange from "../components/pages/exchange/Exchange"
import SteamAccount from "../components/pages/steamAccount/SteamAccount"
import ProfileSettings from "../components/pages/profileSettings/ProfileSettings"
import Notifications from "../components/pages/notifications/Notifications"
import Opening from "../components/pages/opening/Opening"
import SelectedGame from "../components/pages/selectedGame/SelectedGame"

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/events',
                element: <EventsPage />
            },
            {
                path: '/referral',
                element: <ReferralPage />
            },
            {
                path: '/cases',
                element: <CasesPage />
            },
            {
                path: '/store',
                element: <StorePage />
            },
            {
                path: '/games',
                element: <Games />
            },
            {
                path: '/guns',
                element: <GunsConnection />
            },
            {
                path: '/gameMoney',
                element: <GetMoneyGame />
            },
            {
                path: '/gameTap',
                element: <TapGame />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/exchange',
                element: <Exchange />
            },
            {
                path: '/steamAccount',
                element: <SteamAccount />
            },
            {
                path: '/profileNameSettings',
                element: <ProfileSettings />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/opening/:id',
                element: <Opening />
            },
            {
                path: '/games/:id',
                element: <SelectedGame />
            }
        ]
    }
])