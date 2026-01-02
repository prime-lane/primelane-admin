import type { StatusVariant } from "@/components/ui/status-badge"

export interface NinVerification {
    nin: string;
    image: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    gender?: string;
    phone_number?: string;
    employment_status?: string;
    marital_status?: string;
    date_of_birth?: string;
    [key: string]: any;
}

export interface Meta {
    nin?: string;
    image?: string;
    nin_verification?: NinVerification;
    driver_license_verification?: DriverLicenseVerification;
    [key: string]: any;
}

export interface KycDetails {
    id: string
    user_id: string
    is_id_verified: boolean
    is_selfie_verified: boolean
    is_physical_inspection_done: boolean;
    is_vehicle_active?: boolean;
    is_vehicle_set?: boolean;
    is_driver_license_verified: boolean;
    driver_license_expiry_date: string | null;
    residential_address: string;
    first_name: string;
    last_name: string;
    dob: string;
    id_type: string;
    id_number: string;
    driver_license_number: string | null;
    id_verification_status: StatusVariant;
    driver_license_verification_status: StatusVariant;
    id_document: string | null;
    selfie_confidence: string;
    selfie_image: string;
    meta_data: Meta
}

interface DriverLicenseVerification {
    photo: string
    message: string
    lastname: string
    birthdate: string
    firstname: string
    middlename: string
    expiry_date: string
    issued_date: string
    driversLicense: string
    state_of_issue: string
    gender: string
}