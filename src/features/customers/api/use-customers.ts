import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import type { Customer } from '../types'

interface UseCustomersParams extends PaginationParams { }

export const useCustomers = (params?: UseCustomersParams) => {
    return useQuery({
        queryKey: ['customers', params],
        queryFn: async () => {
            const searchParams = new URLSearchParams()
            if (params?.page) searchParams.set('page', params.page.toString())
            if (params?.limit) searchParams.set('limit', params.limit.toString())
            if (params?.search) searchParams.set('search', params.search)

            const endpoint = searchParams.toString()
                ? `${e.CUSTOMERS.ROOT}?${searchParams.toString()}`
                : e.CUSTOMERS.ROOT

            const response = await apiClient.get<{ users: Customer[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            console.log('Customers API Data Sample:', response.data.users?.[0])

            return transformPaginatedResponse(response.data, 'users')
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

export const useCustomer = (id: string) => {
    return useQuery({
        queryKey: ['customer', id],
        queryFn: async () => {
            const response = await apiClient.get<Customer>(e.CUSTOMERS.BY_ID(id))
            return response.data
        },
        enabled: !!id,
    })
}
