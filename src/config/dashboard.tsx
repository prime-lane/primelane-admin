import { path } from '@/app/paths'
import {
  Home,
  UsersGroupRounded,
  UserRounded,
  SettingsMinimalistic,
  BillList,
  Card,
  ShieldUser,
} from '@solar-icons/react'

export const NAV_ITEMS = [
  { label: 'Home', icon: Home, to: path.DASHBOARD.ROOT },
  { label: 'Customers', icon: UsersGroupRounded, to: path.DASHBOARD.CUSTOMERS },
  { label: 'Drivers', icon: UserRounded, to: path.DASHBOARD.DRIVERS },
  {
    label: 'Pricing Config.',
    icon: SettingsMinimalistic,
    to: path.DASHBOARD.PRICING_CONFIG,
  },
  { label: 'Trips', icon: BillList, to: path.DASHBOARD.TRIPS },
  {
    label: 'Finance',
    icon: Card,
    to: path.DASHBOARD.FINANCE.ROOT,
    hasSubmenu: true,
    children: [
      { label: 'Commission', to: path.DASHBOARD.FINANCE.COMMISSION },
      {
        label: 'Driver settlements',
        to: path.DASHBOARD.FINANCE.DRIVER_SETTLEMENTS,
      },
      { label: 'Driver wallet', to: path.DASHBOARD.FINANCE.DRIVER_WALLET },
      { label: 'Customer wallet', to: path.DASHBOARD.FINANCE.CUSTOMER_WALLET },
      { label: 'Refund', to: path.DASHBOARD.FINANCE.REFUND },
    ],
  },
  {
    label: 'Admin Mgmt.',
    icon: ShieldUser,
    to: path.DASHBOARD.ADMIN_MANAGEMENT,
    hasSubmenu: true,
    children: [{ label: 'Admin', to: path.DASHBOARD.ADMIN_MANAGEMENT }],
  },
]

export const DRAWER_WIDTH = 241

export const CAR_CURSOR = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJibGFjayI+PHBhdGggZD0iTTE4LjkyIDYuMDFDMTguNzIgNS40MiAxOC4xNiA1IDE3LjUgNWgtMTFjLS42NiAwLTEuMjEuNDItMS40MiAxLjAxTDMgMTJ2OGMwIC41NS40NSAxIDEgMWgxYy41NSAwIDEtLjQ1IDEtMXYtMWgxMnYxYzAgLjU1LjQ1IDEgMSAxaDFjLjU1IDAgMS0uNDUgMS0xdi04bC0yLjA4LTUuOTl6TTYuODUgN2gxMC4yOWwxLjA4IDMuMTFINS43N0w2Ljg1IDd6TTE5IDE3SDV2LTVoMTR2NXoiLz48Y2lyY2xlIGN4PSI3LjUiIGN5PSIxNC41IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxNi41IiBjeT0iMTQuNSIgcj0iMS41Ii8+PC9zdmc+') 16 16, auto`
