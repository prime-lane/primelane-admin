import { buildQueryParams } from '@/lib/utils'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { ManageUserStatusRequest, PaginatedResponse, PaginationParams } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Driver, Review, Transaction, UserRideStats, Wallet } from '../types'

interface UseDriversParams extends PaginationParams { }

interface UseDriverTransactionsParams extends PaginationParams {
    user_id: string
}

export const useDrivers = (params?: UseDriversParams) => {
    return useQuery({
        queryKey: ['drivers', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)
            searchParams.set('user_type', 'driver')

            const endpoint = `${e.DRIVERS.ROOT}?${searchParams.toString()}`

            const response = await apiClient.get<{ users: Driver[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)

            return transformPaginatedResponse(response.data, 'users')
        },
        staleTime: 2 * 60 * 1000,
    })
}

export const useDriver = (id: string) => {
    return useQuery({
        queryKey: ['driver', id],
        queryFn: async () => {
            const response = await apiClient.get<{ user: Driver }>(e.DRIVERS.BY_ID(id))
            return response.data
        },
        enabled: !!id,
    })
}

export const useDriverStats = (id: string) => {
    return useQuery({
        queryKey: ['driver-stats', id],
        queryFn: async () => {
            const response = await apiClient.get<UserRideStats>(e.ANALYTICS.USER_RIDE_STATS(id))
            return response.data
        },
        enabled: !!id,
    })
}

export const useDriverReviews = (userId?: string) => {
    return useQuery({
        queryKey: ['driver-reviews', userId],
        queryFn: async () => {
            if (!userId) throw new Error('User ID is required')
            const endpoint = e.REVIEWS.ROOT(userId)
            const response = await apiClient.get<{ reviews: Review[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'reviews')
        },
        enabled: !!userId,
    })
}

export const useDriverWallet = (userId: string) => {
    return useQuery({
        queryKey: ['driver-wallet', userId],
        queryFn: async () => {
            const response = await apiClient.get<Wallet>(`${e.WALLETS.WALLET}`)
            return response.data
        },
        enabled: !!userId,
    })
}

export const useDriverTransactions = (params: UseDriverTransactionsParams) => {
    return useQuery({
        queryKey: ['driver-transactions', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)

            const endpoint = `${e.TRANSACTIONS.MY_TRANSACTIONS}?${searchParams.toString()}`
            const response = await apiClient.get<{ transactions: Transaction[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'transactions')
        },
        enabled: !!params.user_id,
    })
}

export const useDriverVehicle = (driverId: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['driver-vehicle', driverId],
        queryFn: async () => {
            const response = await apiClient.get<import('../types').Vehicle>(e.VEHICLES.BY_DRIVER_ID(driverId))
            return response.data
        },
        enabled: !!driverId && (options?.enabled ?? true),
    })
}

export const useUpdateDriver = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: Partial<Driver>) => {
            if (!id) throw new Error('Driver ID is required')
            const response = await apiClient.patch<{ user: Driver }>(e.DRIVERS.BY_ID(id), data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Driver updated successfully')
            queryClient.invalidateQueries({ queryKey: ['driver', id] })
            queryClient.invalidateQueries({ queryKey: ['drivers'] })
        },
    })
}




export const useManageVehicleStatus = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ action, reason }: ManageUserStatusRequest) => {
            if (!id) throw new Error('User ID is required')
            const response = await apiClient.patch(
                e.VEHICLES.MANAGE_STATUS(id, action),
                { reason },
            )
            return response.data
        },
        onSuccess: () => {
            toast.success('User status updated successfully')
            queryClient.invalidateQueries({ queryKey: ['customer', id] })
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['driver', id] })
            queryClient.invalidateQueries({ queryKey: ['drivers'] })
        },
    })
}