import { z } from 'zod'

export const pricingConfigSchema = z.object({
    base_price: z.coerce.number().min(1, 'Base price must be greater than zero'),
    per_km: z.coerce.number().min(1, 'Price per km must be greater than zero'),
    per_min: z.coerce.number().min(1, 'Price per minute must be greater than zero'),
    cancellation_fee_type: z.enum(['fixed', 'percentage']),
    cancellation_base: z.coerce.number().min(1, 'Cancellation fee must be greater than zero'),
    cancellation_percentage: z.coerce
        .number()
        .min(1)
        .max(100, 'Percentage cannot exceed 100'),
    trip_commission_percentage: z.coerce
        .number()
        .min(1)
        .max(100, 'Percentage cannot exceed 100'),
})

export type PricingConfigFormData = z.infer<typeof pricingConfigSchema>
