export type DiscountType = 'fixed' | 'percentage'
export type UsageType = 'one_time' | 'multiple'

export interface Coupon {
  id: string
  code: string
  description: string
  discount_type: DiscountType
  discount_value: number
  usage_type: UsageType
  usage_limit: number | null
  usage_count: number
  starts_at: string
  expires_at: string
  applicable_ride_types: string[]
  applicable_category_ids: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CouponUsageRecord {
  id: string
  coupon_id: string
  user_id: string
  ride_id: string
  discount_applied: number
  created_at: string
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
}

export interface CreateCouponRequest {
  code: string
  description: string
  discount_type: DiscountType
  discount_value: number
  usage_type: UsageType
  usage_limit?: number | null
  starts_at: string
  expires_at: string
  applicable_ride_types: string[]
  applicable_category_ids: string[]
}

export interface CouponDetailsResponse {
  coupon: Coupon
  total_uses: number
  remaining_uses: number | null
}
