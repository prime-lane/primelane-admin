export type AccountStatus = 'active' | 'pending' | 'deactivated'

export interface Customer {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    status: AccountStatus
    is_email_verified: boolean
}
