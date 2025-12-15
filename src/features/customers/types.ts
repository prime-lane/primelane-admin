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
    meta_data: {
        nin?: string
        image?: string
        [key: string]: any
    }
}
