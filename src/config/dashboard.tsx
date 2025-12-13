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
  { label: 'Customers', icon: UsersGroupRounded, to: '/dashboard/customers' },
  { label: 'Drivers', icon: UserRounded, to: '/dashboard/drivers' },
  {
    label: 'Pricing Config.',
    icon: SettingsMinimalistic,
    to: '/dashboard/pricing',
  },
  { label: 'Trips', icon: BillList, to: '/dashboard/trips' },
  {
    label: 'Finance',
    icon: Card,
    to: '/dashboard/finance',
    hasSubmenu: true,
    children: [{ label: 'Finance', to: '/dashboard/finance/transactions' }],
  },
  {
    label: 'Admin Mgmt.',
    icon: ShieldUser,
    to: '/dashboard/admin',
    hasSubmenu: true,
    children: [{ label: 'Admin', to: '/dashboard/admin' }],
  },
]

export const DRAWER_WIDTH = 241
