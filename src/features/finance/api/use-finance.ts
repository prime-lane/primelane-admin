import { API_ENDPOINTS } from '@/services/api-endpoints'
import { apiClient } from '@/services/api-client'
import { useQuery } from '@tanstack/react-query'
import type { Wallet, Transaction, Refund } from '../types'
import type { PaginationParams } from '@/services/api-types'

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
                API_ENDPOINTS.WALLETS.MY_WALLET,
            )
            return response.data
        },
    })
}

export const useTransactions = (params?: PaginationParams & { type?: 'debit' | 'credit' }) => {
    return useQuery({
        queryKey: ['transactions', params],
        queryFn: async () => {
            const queryParams = new URLSearchParams()
            if (params?.page) queryParams.append('page', params.page.toString())
            if (params?.limit) queryParams.append('limit', params.limit.toString())
            if (params?.search) queryParams.append('search', params.search)
            if (params?.type) queryParams.append('type', params.type)

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
