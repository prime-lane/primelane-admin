import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { DashboardStats } from '../types'

import { buildQueryParams } from '@/lib/utils'

export const useDashboardStats = (params?: {
    start_date?: string
    end_date?: string
}) => {
    return useQuery({
        queryKey: ['dashboard-stats', params],
        queryFn: async () => {
            const searchParams = buildQueryParams(params)
            const endpoint = `${e.ANALYTICS.SUMMARY}?${searchParams.toString()}`
            const response = await apiClient.get<DashboardStats>(endpoint)
            return response.data
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    })
}
