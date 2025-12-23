

export type AccountStatus = 'active' | 'pending' | 'inactive'

export interface Customer {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    nin: string
    status: AccountStatus
    is_email_verified: boolean
}

export type { NinVerification, Meta, KycDetails } from "../shared/types"

export interface UserRideStats {
    total_rides: number
    total_cancelled_rides: number
    cancellation_rate: number
    total_accepted_rides: number
    acceptance_rate: number
    average_rating: number
}

export interface Review {
    id: string
    ride_id: string
    reviewed_user_id: string
    reviewer_user_id: string
    feedback: string
    rating: number
    reviewer: {
        first_name: string
        last_name: string
    }
    reviewed: {
        first_name: string
        last_name: string
    }
    created_at: string
    updated_at: string
}

export interface Wallet {
    id: string
    user_id: string
    virtual_bank_account_number: string
    virtual_bank_account_name: string
    virtual_bank_code: string
    virtual_bank_name: string
    current_balance: number
    last_balance: number
    currency: string
    created_at: string
    updated_at: string
}

export interface Transaction {
    id: string
    user_id: string
    transaction_type: 'CR' | 'DR'
    description: string
    reference: string | null
    ride_id: string | null
    amount: number
    created_at: string
    updated_at: string
    status?: string
}
