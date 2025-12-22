import { API_ENDPOINTS } from '@/services/api-endpoints'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { PricingConfigFormData } from '../schemas/pricing-config-schema'
import { apiClient } from '@/services/api-client'

interface PricingConfigResponse {
    success: boolean
    data: {
        id: string
        slug: string
        name: string
        hourly_base_price: number
        hourly_per_km: number
        hourly_per_min: number
        hourly_trip_commission_percentage: number
        hourly_cancellation_base: number
        hourly_cancellation_percentage: number
        hourly_cancellation_fee_type: 'fixed' | 'percentage'

        one_way_base_price: number
        one_way_per_km: number
        one_way_per_min: number
        one_way_trip_commission_percentage: number
        one_way_cancellation_base: number
        one_way_cancellation_percentage: number
        one_way_cancellation_fee_type: 'fixed' | 'percentage'
    }
}

export const usePricingConfig = (categoryId: string, type: string) => {
    return useQuery({
        queryKey: ['pricing-config', categoryId, type],
        queryFn: async () => {
            const response = await apiClient.get<PricingConfigResponse>(
                API_ENDPOINTS.VEHICLE_CATEGORIES.CONFIGURE_PRICING(categoryId, type),
            )
            return response.data
        },
        enabled: !!categoryId,
    })
}

export const useUpdatePricingConfig = (categoryId: string, type: string) => {
    return useMutation({
        mutationFn: async (data: PricingConfigFormData) => {
            const response = await apiClient.put(
                API_ENDPOINTS.VEHICLE_CATEGORIES.CONFIGURE_PRICING(categoryId, type),
                data,
            )
            return response.data
        },
        onSuccess: () => {
            toast.success('Pricing configuration updated successfully')
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || 'Failed to update pricing configuration',
            )
        },
    })
}
