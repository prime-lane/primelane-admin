import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Customer, KycDetails } from '../types'

interface UseCustomersParams extends PaginationParams { }

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

export const useKycDetails = () => {
    return useQuery({
        queryKey: ['kyc-details'],
        queryFn: async () => {
            const response = await apiClient.get<KycDetails>(e.KYC.MY_KYC)
            return response.data
        },
    })
}
