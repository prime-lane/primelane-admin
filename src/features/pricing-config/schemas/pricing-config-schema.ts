import { z } from 'zod'

const num = (msg: string) => z.coerce.number({ invalid_type_error: msg }).min(0)
const koboNum = (msg: string) => z.coerce.number({ invalid_type_error: msg }).min(0)

export const airportTransferSchema = z.object({
  base_price: koboNum('Base price required'),
  per_km: koboNum('Price per km required'),
  per_min: koboNum('Price per minute required'),
  free_wait_time: num('Free wait time required'),
  wait_fee_per_min: koboNum('Wait fee per minute required'),
  trip_commission_percentage: num('Commission required').max(100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base required'),
  cancellation_percentage: num('Cancellation % required').max(100),
})

export const dailySchema = z.object({
  half_day_hours: num('Half-day hours required'),
  half_day_fare: koboNum('Half-day fare required'),
  full_day_hours: num('Full-day hours required'),
  full_day_fare: koboNum('Full-day fare required'),
  free_wait_time: num('Free wait time required'),
  wait_fee_per_min: koboNum('Wait fee per minute required'),
  trip_commission_percentage: num('Commission required').max(100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base required'),
  cancellation_percentage: num('Cancellation % required').max(100),
  extra_time_cost: koboNum('Extra time cost required'),
  grace_period_mins: num('Grace period required'),
  daily_hours: num('Daily hours required'),
})

export const fleetSchema = z.object({
  base_price: koboNum('Base price required'),
  free_wait_time: num('Free wait time required'),
  wait_fee_per_min: koboNum('Wait fee per minute required'),
  trip_commission_percentage: num('Commission required').max(100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base required'),
  cancellation_percentage: num('Cancellation % required').max(100),
  extra_time_cost: koboNum('Extra time cost required'),
  grace_period_mins: num('Grace period required'),
  daily_hours: num('Daily hours required'),
})

export type AirportTransferFormData = z.infer<typeof airportTransferSchema>
export type DailyFormData = z.infer<typeof dailySchema>
export type FleetFormData = z.infer<typeof fleetSchema>
