export type AccountStatus = 'active' | 'pending' | 'deactivated'

export interface Customer {
    id: string
    dateJoined: string
    name: string
    email: string
    phone: string
    accountStatus: AccountStatus
    idVerification: boolean
}
