import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type { Trip, TripDetail } from '../types'

interface UseTripsParams extends PaginationParams {
    status?: string
}

export const useTrips = (params?: UseTripsParams) => {
    return useQuery({
        queryKey: ['trips', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)

            const endpoint = searchParams.toString()
                ? `${e.TRIPS.ROOT}?${searchParams.toString()}`
                : e.TRIPS.ROOT

            const response = await apiClient.get<{ rides: Trip[]; pagination: PaginatedResponse<unknown>['pagination'] }>(endpoint)
            return transformPaginatedResponse(response.data, 'rides')
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    })
}

export const useTrip = (id: string) => {
    return useQuery({
        queryKey: ['trip', id],
        queryFn: async () => {
            const response = await apiClient.get<TripDetail>(e.TRIPS.BY_ID(id))
            return response.data
        },
        enabled: !!id,
    })
}
