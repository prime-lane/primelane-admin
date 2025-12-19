export type AccountStatus = 'active' | 'pending' | 'deactivated'

export interface Customer {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    image_url: string | null
    status: AccountStatus
    is_email_verified: boolean
    residential_address?: string
}

export interface Meta {
    nin?: string
    image?: string
    [key: string]: any
}

export interface KycDetails {
    id: string
    user_id: string
    is_id_verified: boolean
    is_selfie_verified: boolean
    is_physical_inspection_done: boolean;
    is_vehicle_set: boolean;
    is_driver_license_verified: boolean;
    driver_license_expiry_date: string;
    residential_address: string;
    first_name: string;
    last_name: string;
    dob: string;
    id_type: string;
    id_number: string;
    id_document: string | null;
    selfie_confidence: string;
    selfie_image: string;
    meta_data: Meta
}

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
    transaction_type: 'CR' | 'DR' // CR for Credit, DR for Debit
    description: string
    reference: string | null
    ride_id: string | null
    amount: number
    created_at: string
    updated_at: string
    status?: string // Optional as it wasn't in the provided JSON sample but is in UI
}
