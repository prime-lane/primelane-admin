import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Driver } from '../types'

interface UseDriversParams extends PaginationParams { }

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
            const response = await apiClient.get<Driver>(e.DRIVERS.BY_ID(id))
            return response.data
        },
        enabled: !!id,
    })
}
