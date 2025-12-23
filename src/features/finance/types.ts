export interface Commission {
    id: string
    settlement_id: string
    settlement_date: string
    trip_id: string
    trip_type: string
    fare_charged: number
    platform_earning: number
    driver_earning: number
    amount: number
    status: 'pending' | 'completed' | 'failed'
    created_at: string
}

export interface DriverSettlement {
    id: string
    settlement_id: string
    settlement_date: string
    trip_id: string
    trip_type: string
    fare_charged: number
    platform_earning: number
    driver_earning: number
    amount: number
    status: 'pending' | 'completed' | 'failed'
    created_at: string
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
    transaction_date: string
    user_id: string
    user_name: string
    description: string
    amount: number
    wallet_balance: number
    type: 'debit' | 'credit'
    created_at: string
}

export interface Refund {
    id: string
    transaction_date: string
    trip_id: string
    trip_type: string
    description: string
    amount_collected: number
    created_at: string
}
