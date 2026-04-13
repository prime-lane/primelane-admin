import { z } from 'zod'

// Empty string from an empty <input type="number"> coerces to 0 in z.coerce.number,
// bypassing min() checks. We preprocess to treat "" as undefined so required fields fail.
const num = (msg: string, max?: number) =>
  z.preprocess(
    (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
    max !== undefined
      ? z.number({ error: msg }).min(0, msg).max(max, `Cannot exceed ${max}`)
      : z.number({ error: msg }).min(0, msg),
  )

const koboNum = (msg: string) =>
  z.preprocess(
    (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
    z.number({ error: msg }).min(0, msg),
  )

export const airportTransferSchema = z.object({
  base_price: koboNum('Base price is required'),
  per_km: koboNum('Price per km is required'),
  per_min: koboNum('Price per minute is required'),
  free_wait_time: num('Free wait time is required'),
  wait_fee_per_min: koboNum('Wait fee per minute is required'),
  trip_commission_percentage: num('Commission is required', 100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base is required'),
  cancellation_percentage: num('Cancellation % is required', 100),
})

export const dailySchema = z.object({
  half_day_hours: num('Half-day hours is required'),
  half_day_fare: koboNum('Half-day fare is required'),
  full_day_hours: num('Full-day hours is required'),
  full_day_fare: koboNum('Full-day fare is required'),
  free_wait_time: num('Free wait time is required'),
  wait_fee_per_min: koboNum('Wait fee per minute is required'),
  trip_commission_percentage: num('Commission is required', 100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base is required'),
  cancellation_percentage: num('Cancellation % is required', 100),
  extra_time_cost: koboNum('Extra time cost is required'),
  grace_period_mins: num('Grace period is required'),
  daily_hours: num('Daily hours is required'),
})

export const fleetSchema = z.object({
  base_price: koboNum('Base price is required'),
  free_wait_time: num('Free wait time is required'),
  wait_fee_per_min: koboNum('Wait fee per minute is required'),
  trip_commission_percentage: num('Commission is required', 100),
  cancellation_fee_type: z.enum(['fixed', 'percentage']),
  cancellation_base: koboNum('Cancellation base is required'),
  cancellation_percentage: num('Cancellation % is required', 100),
  extra_time_cost: koboNum('Extra time cost is required'),
  grace_period_mins: num('Grace period is required'),
  daily_hours: num('Daily hours is required'),
})

export type AirportTransferFormData = z.infer<typeof airportTransferSchema>
export type DailyFormData = z.infer<typeof dailySchema>
export type FleetFormData = z.infer<typeof fleetSchema>
