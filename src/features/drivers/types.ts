export type AccountStatus = 'active' | 'pending' | 'deactivated'

export interface Driver {
    id: string
    dateJoined: string
    name: string
    phone: string
    email: string
    vehicleCategory: string
    accountStatus: AccountStatus
    idVerification: boolean
}
