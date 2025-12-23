import { z } from 'zod'

export const pricingConfigSchema = z.object({
    base_price: z.coerce.number().min(0, 'Base price must be positive'),
    per_km: z.coerce.number().min(0, 'Price per km must be positive'),
    per_min: z.coerce.number().min(0, 'Price per minute must be positive'),
    cancellation_fee_type: z.enum(['fixed', 'percentage']),
    cancellation_base: z.coerce.number().min(0, 'Cancellation fee must be positive'),
    cancellation_percentage: z.coerce
        .number()
        .min(0)
        .max(100, 'Percentage cannot exceed 100'),
    trip_commission_percentage: z.coerce
        .number()
        .min(0)
        .max(100, 'Percentage cannot exceed 100'),
})

export type PricingConfigFormData = z.infer<typeof pricingConfigSchema>
