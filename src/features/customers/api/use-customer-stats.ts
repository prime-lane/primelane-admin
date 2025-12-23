
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api-client'

export interface CustomerStats {
    total_rides: number
    total_cancelled_rides: number
    cancellation_rate: number
    total_accepted_rides: number
    acceptance_rate: number
    average_rating: number
    wallet_balance: number
}

export const useCustomerStats = (id: string) => {
    return useQuery({
        queryKey: ['customer-stats', id],
        queryFn: async () => {
            const response = await apiClient.get<CustomerStats>(`/analytics/user-ride-stats/${id}`)
            return response.data
        },
        enabled: !!id,
    })
}
