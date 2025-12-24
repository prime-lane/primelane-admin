export type AccountStatus = 'active' | 'pending' | 'inactive'

export interface Admin {
    id: string
    first_name: string
    last_name: string
    email: string
    user_type: string
    status: AccountStatus
    created_at: string
}

export interface Role {
    id: string
    name: string
    description?: string
}

export interface InviteAdminRequest {
    first_name: string
    last_name: string
    email: string
    role_id: string
}
