import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse, UserType } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Customer, UserRideStats, Review, Wallet } from '../types'

interface UseCustomersParams extends PaginationParams {
    user_type?: UserType
}

interface UseCustomerTransactionsParams extends PaginationParams {
    user_id: string
}

export const useCustomers = (params?: UseCustomersParams) => {
    return useQuery({
        queryKey: ['customers', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)

            const endpoint = searchParams.toString()
                ? `${e.CUSTOMERS.ROOT}?${searchParams.toString()}`
                : e.CUSTOMERS.ROOT

            const response = await apiClient.get<{ users: Customer[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)

            return transformPaginatedResponse(response.data, 'users')
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

export const useCustomer = (id: string) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: async () => {
            const response = await apiClient.get<{ user: Customer }>(e.CUSTOMERS.BY_ID(id))
            return response.data
        },
    })
}



export const useUserRideStats = (id: string) => {
    return useQuery({
        queryKey: ['user-ride-stats', id],
        queryFn: async () => {
            const response = await apiClient.get<UserRideStats>(e.ANALYTICS.USER_RIDE_STATS(id))
            return response.data
        },
        enabled: !!id,
    })
}


export const useCustomerReviews = (userId?: string) => {
    return useQuery({
        queryKey: ['reviews', userId],
        queryFn: async () => {
            if (!userId) throw new Error('User ID is required')
            const endpoint = e.REVIEWS.ROOT(userId)
            const response = await apiClient.get<{ reviews: Review[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'reviews')
        },
        enabled: !!userId,
    })
}

export const useCustomerWallet = (userId: string) => {
    return useQuery({
        queryKey: ['wallet', userId],
        queryFn: async () => {
            const response = await apiClient.get<{ data: Wallet }>(`${e.WALLETS.WALLET}`)
            return response.data.data
        },
        enabled: !!userId,
    })
}

export const useCustomerTransactions = (params: UseCustomerTransactionsParams) => {
    return useQuery({
        queryKey: ['transactions', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)

            const endpoint = `${e.TRANSACTIONS.MY_TRANSACTIONS}?${searchParams.toString()}`
            const response = await apiClient.get<{ transactions: import('../types').Transaction[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'transactions')
        },
        enabled: !!params.user_id,
    })
}

export const useUpdateCustomer = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: Partial<Customer>) => {
            if (!id) throw new Error('Customer ID is required')
            const response = await apiClient.patch<{ user: Customer }>(e.CUSTOMERS.BY_ID(id), data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Customer updated successfully')
            queryClient.invalidateQueries({ queryKey: ['customer', id] })
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}


