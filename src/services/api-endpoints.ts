import type { ActivationStatus } from "./api-types";

export const API_ENDPOINTS = {
    AUTH: {
        SIGN_UP: '/auth/sign-up',
        LOGIN: {
            ADMIN: '/auth/login/admin',
            CUSTOMER: '/auth/login/customer',
            DRIVER: '/auth/login/driver',
        },
        REFRESH: '/auth/refresh',
        FORGOT_PASSWORD: '/auth/forgot-password',
        CHANGE_PASSWORD: '/auth/change-password',
        CHANGE_EMAIL: '/auth/change-email',
        CHANGE_PHONE_NUMBER: '/auth/change-phone-number',
        VERIFY_OTP: (action: 'verify-phone' | 'login') => `/auth/verify-otp/${action}`,
        CONFIRM_OTP: (action: 'reset-password' | 'change-email' | 'change-phone') =>
            `/auth/confirm-otp/${action}`,
        RESEND_OTP: (action: 'verify-phone' | 'login') => `/auth/resend-otp/${action}`,
        GOOGLE: {
            SIGN_UP: '/auth/google/sign-up',
            LOGIN: '/auth/google/login',
        },
        INITIALIZE_EMAIL_CHANGE: '/auth/initialize-email-change',
        INITIALIZE_PHONE_CHANGE: '/auth/initialize-phone-number-change',
        VERIFY_EMAIL_URL: '/auth/verify-email-url',
        RESEND_EMAIL_VERIFICATION: '/auth/resend-email-verification',
        ADMIN_INVITE: '/auth/admin-invite',
        ADMIN_INVITE_RESEND: '/auth/admin-invite/resend',
        ADMIN_INVITE_ACCEPT: '/auth/admin-invite/accept',
    },
    USERS: {
        ROOT: '/users',
        BY_ID: (id: string) => `/users/${id}`,
        MANAGE_STATUS: (id: string, action: ActivationStatus) =>
            `/users/manage/${id}/${action}`,
    },
    CUSTOMERS: {
        ROOT: '/users',
        BY_ID: (id: string) => `/users/${id}`,
    },
    DRIVERS: {
        ROOT: '/users',
        BY_ID: (id: string) => `/users/${id}`,
        
    },
    ANALYTICS: {
        MY_RIDE_STATS: '/analytics/my-ride-stats',
        USER_RIDE_STATS: (id: string) => `/analytics/user-ride-stats/${id}`,
    },
    REVIEWS: {
        ROOT: (userId: string) => `/reviews/${userId}`,
    },
    WALLETS: {
        WALLET: '/wallets/my-wallet',
    },
    TRANSACTIONS: {
        MY_TRANSACTIONS: '/transactions',
    },
    TRIPS: {
        ROOT: '/rides',
        BY_ID: (id: string) => `/rides/${id}`,
    },
    VEHICLE_CATEGORIES: {
        ROOT: '/vehicle-categories',
        BY_ID: (id: string) => `/vehicle-categories/${id}`,
        CONFIGURE_PRICING: (categoryId: string, type: string) =>
            `/vehicle-categories/configure-pricing/${categoryId}/${type}`,
    },
    VEHICLES: {
        BY_DRIVER_ID: (id: string) => `/vehicles/driver/${id}`,
        MANAGE_STATUS: (id: string, action: ActivationStatus) =>
            `/vehicles/manage/${id}/${action}`,
    },
    KYC: {
        VERIFY: (idType: 'nin' | 'dl' | 'ip') => `/kyc/verify/${idType}`,
        BY_ID: (userId: string) => `/kyc/${userId}`,
    },
    ROLES: '/roles',
} as const
