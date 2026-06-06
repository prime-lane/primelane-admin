import { API_ENDPOINTS } from '@/services/api-endpoints'
import { apiClient } from '@/services/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { DailyHoursFormData } from '../schemas/pricing-config-schema'

export interface AppConfigData {
  id: number
  daily_rental_half_day_hours: number
  daily_rental_full_day_hours: number
  updated_by_id?: string
  updated_by_email?: string
  created_at: string
  updated_at: string
}

export const APP_CONFIG_QUERY_KEY = ['app-config'] as const

export const useAppConfig = () => {
  return useQuery({
    queryKey: APP_CONFIG_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<AppConfigData>(
        API_ENDPOINTS.APP_CONFIG.ROOT,
      )
      return response.data
    },
  })
}

export const useUpdateAppConfig = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: DailyHoursFormData) => {
      const response = await apiClient.patch<AppConfigData>(
        API_ENDPOINTS.APP_CONFIG.ROOT,
        {
          daily_rental_half_day_hours: Number(data.half_day_hours),
          daily_rental_full_day_hours: Number(data.full_day_hours),
        },
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Daily rental hours updated successfully')
      queryClient.invalidateQueries({ queryKey: APP_CONFIG_QUERY_KEY })
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error.response?.data?.message || 'Failed to update daily rental hours',
      )
    },
  })
}
