import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiClient } from '@/services/api-client'
import { API_ENDPOINTS as e } from '@/services/api-endpoints'
import type { PaginationParams, PaginatedResponse } from '@/services/api-types'
import { transformPaginatedResponse } from '@/utils/api-utils'
import { buildQueryParams } from '@/lib/utils'
import type {
  Coupon,
  CouponDetailsResponse,
  CouponUsageRecord,
  CreateCouponRequest,
} from '../types'

interface UseCouponsParams extends PaginationParams {
  search?: string
  status?: string
}

export const useCoupons = (params?: UseCouponsParams) => {
  return useQuery({
    queryKey: ['coupons', params],
    queryFn: async () => {
      const searchParams = buildQueryParams(params)
      const endpoint = `${e.COUPONS.ROOT}?${searchParams.toString()}`
      const response = await apiClient.get<{
        coupons: Coupon[]
        pagination: PaginatedResponse<unknown>['pagination']
      }>(endpoint)
      return transformPaginatedResponse(response.data, 'coupons')
    },
  })
}

export const useCoupon = (id: string) => {
  return useQuery({
    queryKey: ['coupon', id],
    queryFn: async () => {
      const response = await apiClient.get<{
        data?: CouponDetailsResponse
        coupon?: Coupon
        total_uses?: number
        remaining_uses?: number | null
      }>(e.COUPONS.BY_ID(id))

      const raw = response.data
      const details = raw.data

      const coupon = details?.coupon ?? raw.coupon
      if (!coupon) {
        throw new Error('Coupon payload missing in response')
      }

      return {
        coupon,
        total_uses:
          details?.total_uses ?? raw.total_uses ?? coupon.usage_count ?? 0,
        remaining_uses:
          details?.remaining_uses ??
          raw.remaining_uses ??
          coupon.usage_limit ??
          null,
      } satisfies CouponDetailsResponse
    },
    enabled: !!id,
  })
}

export const useCouponUsage = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['coupon-usage', id, params],
    queryFn: async () => {
      const searchParams = buildQueryParams(params)
      const endpoint = `${e.COUPONS.USAGE(id)}?${searchParams.toString()}`
      const response = await apiClient.get<{
        records: CouponUsageRecord[]
        pagination: PaginatedResponse<unknown>['pagination']
      }>(endpoint)
      return transformPaginatedResponse(response.data, 'records')
    },
    enabled: !!id,
  })
}

export const useCreateCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateCouponRequest) => {
      const response = await apiClient.post<{ message: string; data: Coupon }>(
        e.COUPONS.ROOT,
        data,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Coupon created successfully')
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'Failed to create coupon')
    },
  })
}

export const useUpdateCoupon = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<CreateCouponRequest>) => {
      const response = await apiClient.patch<{ message: string; data: Coupon }>(
        e.COUPONS.BY_ID(id),
        data,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Coupon updated successfully')
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
      queryClient.invalidateQueries({ queryKey: ['coupon', id] })
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'Failed to update coupon')
    },
  })
}

export const useToggleCoupon = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (isActive: boolean) => {
      const response = await apiClient.patch<{ message: string; data: Coupon }>(
        e.COUPONS.TOGGLE(id),
        { is_active: isActive },
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Coupon status updated')
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
      queryClient.invalidateQueries({ queryKey: ['coupon', id] })
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'Failed to update coupon status')
    },
  })
}
