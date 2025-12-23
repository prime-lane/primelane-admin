import type { AccountStatus } from '../drivers/types'

export interface Admin {
    id: string
    first_name: string
    last_name: string
    email: string
    role: string
    status: AccountStatus
    last_active_at: string
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
    role: string
}
