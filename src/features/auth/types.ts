export interface User {
    id: string
    email: string | null
    first_name: string
    last_name: string
    gender: string | null
    phone_number: string
    image_url: string | null
    is_phone_number_verified: boolean
    is_preference_set: boolean
    is_kyc_complete: boolean
    is_email_verified: boolean
}

export interface AuthResponse {
    user: User
    access_token: string
    refresh_token: string
}

export interface SignInRequest {
    email: string
    password: string
    user_type: 'admin'
}

export interface SignUpRequest {
    phone_number: string
    first_name: string
    last_name: string
    referal_code?: string
    user_type: 'customer' | 'driver'
    image_url?: string
    gender?: 'male' | 'female'
    email?: string
}

export interface RefreshTokenRequest {
    user_id: string
    refresh_token: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ChangePasswordRequest {
    email: string
    password: string
    otp: string
}

export interface VerifyOTPRequest {
    phone_number?: string
    email?: string
    otp: string
    user_type?: 'customer' | 'driver'
    device_token?: string
}

export interface ResendOTPRequest {
    phone_number?: string
    email?: string
}
