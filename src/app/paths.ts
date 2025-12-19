
export const path = {
  HOME: '/',
  AUTH: {
    ROOT: '/auth',
    SIGN_IN: '/auth/signin',
    OTP: '/auth/otp',
    INVITE: '/auth/invite',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    CUSTOMERS: '/dashboard/customers',
    CUSTOMER_DETAILS: '/dashboard/customers/:id',
    CUSTOMER_EDIT: '/dashboard/customers/:id/edit',
    DRIVERS: '/dashboard/drivers',
    PRICING_CONFIG: '/dashboard/pricing-config',
    TRIPS: '/dashboard/trips',
    FINANCE: '/dashboard/finance',
    ADMIN_MANAGEMENT: '/dashboard/admin-management',
  },
} as const
