import { path } from '@/app/paths'
import {
  BillList,
  Home,
  SettingsMinimalistic,
  ShieldUser,
  UserRounded,
  UsersGroupRounded,
} from '@solar-icons/react'
import { type ElementType } from 'react'

export type NavItem = {
  label: string
  icon?: ElementType
  to: string
  hasSubmenu?: boolean
  children?: NavItem[]
  permission?: string
  description?: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    icon: Home,
    to: path.DASHBOARD.ROOT,
    permission: 'dashboard:view',
    description: 'View dashboard',
  },
  {
    label: 'Customers',
    icon: UsersGroupRounded,
    to: path.DASHBOARD.CUSTOMERS,
    permission: 'customers:view',
    description: 'View customers',
  },
  {
    label: 'Drivers',
    icon: UserRounded,
    to: path.DASHBOARD.DRIVERS,
    permission: 'drivers:view',
    description: 'View drivers',
  },
  {
    label: 'Pricing Config.',
    icon: SettingsMinimalistic,
    to: path.DASHBOARD.PRICING_CONFIG,
    permission: 'price_configurations:view',
    description: 'Manage pricing configurations',
  },
  {
    label: 'Trips',
    icon: BillList,
    to: path.DASHBOARD.TRIPS,
    permission: 'trips:view',
    description: 'View trips',
  },
  {
    label: 'Admin Mgmt.',
    icon: ShieldUser,
    to: path.DASHBOARD.ADMIN_MANAGEMENT,
    hasSubmenu: true,
    permission: 'admin_management:view',
    description: 'Manage admin',
    children: [
      {
        label: 'Admin',
        to: path.DASHBOARD.ADMIN_MANAGEMENT,
        permission: 'admin_management:view',
        description: 'Invite admin',
      },
      {
        label: 'Roles & Permissions',
        to: path.DASHBOARD.ROLES_PERMISSIONS,
        permission: 'rbac:view',
        description: 'Manage roles and permissions',
      },
    ],
  },
]

export const DRAWER_WIDTH = 241

export const CAR_CURSOR = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJibGFjayI+PHBhdGggZD0iTTE4LjkyIDYuMDFDMTguNzIgNS40MiAxOC4xNiA1IDE3LjUgNWgtMTFjLS42NiAwLTEuMjEuNDItMS40MiAxLjAxTDMgMTJ2OGMwIC41NS40NSAxIDEgMWgxYy41NSAwIDEtLjQ1IDEtMXYtMWgxMnYxYzAgLjU1LjQ1IDEgMSAxaDFjLjU1IDAgMS0uNDUgMS0xdi04bC0yLjA4LTUuOTl6TTYuODUgN2gxMC4yOWwxLjA4IDMuMTFINS43N0w2Ljg1IDd6TTE5IDE3SDV2LTVoMTR2NXoiLz48Y2lyY2xlIGN4PSI3LjUiIGN5PSIxNC41IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxNi41IiBjeT0iMTQuNSIgcj0iMS41Ii8+PC9zdmc+') 16 16, auto`

export const KNOWLEDGE_BASE: Record<string, string> = {
  customer:
    'Manage customer profiles, view verification status (KYC), and monitor user activity. Navigate to "Customers" to see the full list of registered users.',
  driver:
    'Track driver applications, license verifications (NIN/DL), and vehicle details. The "Drivers" section handles all onboarding workflows and compliance checks.',
  pricing:
    'Configure base fares, distance rates, and surge multipliers. "Pricing Config" allows you to set dynamic pricing rules for different regions.',
  price:
    'Configure base fares, distance rates, and surge multipliers. "Pricing Config" allows you to set dynamic pricing rules for different regions.',
  config:
    'System-wide settings for pricing and operational parameters. Use "Pricing Config" to adjust rate cards.',
  trip: 'Monitor active and completed trips. View trip history, route details, and resolve disputes in the "Trips" section.',
  admin:
    'Manage internal staff roles and permissions. Use "Admin Mgmt" to invite new team members or revoke access.',
  role: 'Define RBAC policies. You can create custom roles with specific granular permissions in "Roles & Permissions".',
  permission:
    'Define RBAC policies. You can create custom roles with specific granular permissions in "Roles & Permissions".',
  payment:
    'View transaction history and payout status. Financial data is usually associated with individual Trips or Driver profiles.',
}
