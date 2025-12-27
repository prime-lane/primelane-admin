
export const path = {
  HOME: '/',
  AUTH: {
    ROOT: '/auth',
    SIGN_IN: '/auth/signin',
    OTP: '/auth/otp',
    INVITE: '/auth/accept-invite',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    CUSTOMERS: '/dashboard/customers',
    CUSTOMER_DETAILS: '/dashboard/customers/:id',
    CUSTOMER_EDIT: '/dashboard/customers/:id/edit',
    DRIVERS: '/dashboard/drivers',
    DRIVER_DETAILS: '/dashboard/drivers/:id',
    DRIVER_EDIT: '/dashboard/drivers/:id/edit',
    PRICING_CONFIG: '/dashboard/pricing-config',
    PRICING_CONFIG_DETAILS: '/dashboard/pricing-config/:id',
    TRIPS: '/dashboard/trips',
    TRIP_DETAILS: '/dashboard/trips/:id',
    FINANCE: {
      ROOT: '/dashboard/finance',
      COMMISSION: '/dashboard/finance/commission',
      DRIVER_SETTLEMENTS: '/dashboard/finance/driver-settlements',
      DRIVER_WALLET: '/dashboard/finance/driver-wallet',
      CUSTOMER_WALLET: '/dashboard/finance/customer-wallet',
      REFUND: '/dashboard/finance/refund',
    },
    ADMIN_MANAGEMENT: '/dashboard/admin-management',
    ROLES_PERMISSIONS: '/dashboard/roles-permissions',
  },
} as const
