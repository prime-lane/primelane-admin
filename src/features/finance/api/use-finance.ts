import { API_ENDPOINTS } from '@/services/api-endpoints'
import { apiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'
import { buildQueryParams } from '@/lib/utils'
import type { Wallet, Transaction, Refund, DriverSettlement } from '../types'
import type { PaginationParams, UserType } from '@/services/api-types'

interface WalletResponse {
    data: Wallet[]
    success: boolean
}

interface TransactionsResponse {
    data: Transaction[]
    pagination: {
        total_items: number
        total_pages: number
        current_page: number
        limit: number
    }
    success: boolean
}

export const useWallet = () => {
    return useQuery({
        queryKey: ['wallet'],
        queryFn: async () => {
            const response = await apiClient.get<WalletResponse>(
                API_ENDPOINTS.WALLETS.WALLET,
            )
            return response.data
        },
    })
}

export const useTransactions = (params?: PaginationParams & { user_type?: UserType; page_size?: number }) => {
    return useQuery({
        queryKey: ['transactions', params],
        queryFn: async () => {
            const queryParams = buildQueryParams(params)

            const response = await apiClient.get<TransactionsResponse>(
                `${API_ENDPOINTS.TRANSACTIONS.MY_TRANSACTIONS}?${queryParams.toString()}`,
            )
            return response.data
        },
    })
}

export const useRefunds = (params?: PaginationParams) => {
    return useQuery({
        queryKey: ['refunds', params],
        queryFn: async () => {
            // Placeholder - return empty array until endpoint is ready
            return {
                data: [] as Refund[],
                pagination: {
                    total_items: 0,
                    total_pages: 0,
                    current_page: 1,
                    limit: 10,
                },
            }
        },
    })
}

// Commission hook - placeholder for now
export const useCommissions = (params?: PaginationParams) => {
    return useQuery({
        queryKey: ['commissions', params],
        queryFn: async () => {
            // Placeholder - return empty array until endpoint is ready
            return {
                data: [],
                pagination: {
                    total_items: 0,
                    total_pages: 0,
                    current_page: 1,
                    limit: 10,
                },
            }
        },
    })
}

export const useDriverSettlements = (params?: PaginationParams) => {
    return useQuery({
        queryKey: ['driver-settlements', params],
        queryFn: async () => {
            return {
                data: [] as DriverSettlement[],
                pagination: {
                    total_items: 0,
                    total_pages: 0,
                    current_page: 1,
                    limit: 10,
                },
            }
        },
    })
}
