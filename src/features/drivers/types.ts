export type AccountStatus = 'active' | 'pending' | 'inactive'

type Category = {
    id: string
    slug: string
    name: string
}


export interface Driver {
    id: string
    custom_user_id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    category_ids: string[]
    phone_number: string
    nin?: string
    status: AccountStatus
    is_email_verified: boolean
    image_url?: string
    gender?: string
    is_phone_number_verified?: boolean
    is_preference_set?: boolean
    is_kyc_complete?: boolean
    dob?: string
    residential_address?: string
    vehicle: Vehicle
}

export interface UserRideStats {
    total_rides: number
    total_cancelled_rides: number
    cancellation_rate: number
    total_accepted_rides: number
    acceptance_rate: number
    average_rating: number
}

export interface Reviewer {
    id: string
    first_name: string
    last_name: string
}

type Reviewed = Reviewer

export interface Review {
    id: string
    ride_id: string
    reviewed_user_id: string
    reviewer_user_id: string
    feedback: string
    rating: number
    reviewer: Reviewer
    reviewed: Reviewed
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
    outflow_bank_account_number: string | null
    outflow_bank_code: string | null
    outflow_bank_name: string | null
    current_balance: number
    last_balance: number
    currency: string
    pin: string | null
    is_pin_set: boolean
    created_at: string
    updated_at: string
}

export interface Transaction {
    id: string
    user_id: string
    transaction_type: 'CR' | 'DR'
    description: string
    reference: string
    ride_id: string | null
    amount: number
    created_at: string
    updated_at: string
    status: string
}

export interface RoadWorthiness {
    doc: string
    expiry_date: string
}

export interface VehicleInsurance {
    doc: string
    expiry_date: string
}

export interface Vehicle {
    id: string
    vin: string
    make: string
    model: string
    year: number
    color: string
    plate_number: string
    type: string
    mileage: string
    driver_id: string
    status: AccountStatus
    category_id: string | null
    category_ids: string[] | null
    categories: Category[]
    front_image: string
    back_image: string
    side_image: string
    road_worthiness: RoadWorthiness
    vehicle_insurance: VehicleInsurance
    driver: Driver
    category: null // category structure is unknown or null for now
    created_at: string
    updated_at: string
}
