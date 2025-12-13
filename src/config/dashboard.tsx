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
    to: path.DASHBOARD.FINANCE,
    hasSubmenu: true,
    children: [{ label: 'Finance', to: '/dashboard/finance/transactions' }],
  },
  {
    label: 'Admin Mgmt.',
    icon: ShieldUser,
    to: path.DASHBOARD.ADMIN_MANAGEMENT,
    hasSubmenu: true,
    children: [{ label: 'Admin', to: '/dashboard/admin' }],
  },
]

export const DRAWER_WIDTH = 241
