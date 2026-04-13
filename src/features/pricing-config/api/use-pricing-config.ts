import { API_ENDPOINTS } from '@/services/api-endpoints'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AirportTransferFormData, DailyFormData, FleetFormData } from '../schemas/pricing-config-schema'
import { apiClient } from '@/services/api-client'

type CancellationFeeType = 'fixed' | 'percentage'

export interface PricingConfigData {
    id: string
    slug: string
    name: string
    description: string
    // Airport Transfer
    airport_transfer_base_price: number
    airport_transfer_per_km: number
    airport_transfer_per_min: number
    airport_transfer_free_wait_time: number
    airport_transfer_wait_fee_per_min: number
    airport_transfer_trip_commission_percentage: number
    airport_transfer_cancellation_base: number
    airport_transfer_cancellation_percentage: number
    airport_transfer_cancellation_fee_type: CancellationFeeType
    // Daily Rental
    daily_rental_half_day_hours: number
    daily_rental_half_day_fare: number
    daily_rental_full_day_hours: number
    daily_rental_full_day_fare: number
    daily_rental_free_wait_time: number
    daily_rental_wait_fee_per_min: number
    daily_rental_trip_commission_percentage: number
    daily_rental_cancellation_base: number
    daily_rental_cancellation_percentage: number
    daily_rental_cancellation_fee_type: CancellationFeeType
    daily_rental_extra_time_cost: number
    daily_rental_grace_period_mins: number
    daily_rental_daily_hours: number
    // Fleet Rental
    fleet_rental_base_price: number
    fleet_rental_free_wait_time: number
    fleet_rental_wait_fee_per_min: number
    fleet_rental_trip_commission_percentage: number
    fleet_rental_cancellation_base: number
    fleet_rental_cancellation_percentage: number
    fleet_rental_cancellation_fee_type: CancellationFeeType
    fleet_rental_extra_time_cost: number
    fleet_rental_grace_period_mins: number
    fleet_rental_daily_hours: number
}

export const usePricingConfig = (categoryId: string, type: string) => {
    return useQuery({
        queryKey: ['pricing-config', categoryId, type],
        queryFn: async () => {
            const response = await apiClient.get<PricingConfigData>(
                API_ENDPOINTS.VEHICLE_CATEGORIES.CONFIGURE_PRICING(categoryId, type),
            )
            return response.data
        },
        enabled: !!categoryId,
    })
}

type PricingPayload = AirportTransferFormData | DailyFormData | FleetFormData

export const useUpdatePricingConfig = (categoryId: string, type: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: PricingPayload) => {
            const response = await apiClient.patch(
                API_ENDPOINTS.VEHICLE_CATEGORIES.CONFIGURE_PRICING(categoryId, type),
                data,
            )
            return response.data
        },
        onSuccess: () => {
            toast.success('Pricing configuration updated successfully')
            queryClient.invalidateQueries({ queryKey: ['pricing-config', categoryId] })
        },
        onError: (error: { response?: { data?: { message?: string } } }) => {
            toast.error(
                error.response?.data?.message || 'Failed to update pricing configuration',
            )
        },
    })
}
