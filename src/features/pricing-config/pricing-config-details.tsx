import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { fromKobo, toKobo } from '@/lib/utils'
import {
  useUpdatePricingConfig,
  type PricingConfigData,
} from './api/use-pricing-config'
import {
  airportTransferSchema,
  dailySchema,
  fleetSchema,
  type AirportTransferFormData,
  type DailyFormData,
  type FleetFormData,
} from './schemas/pricing-config-schema'
import { PricingConfigDetailsSkeleton } from './components/skeletons'
import { useVehicleCategory } from './api/use-vehicle-categories'

const inputSx = { '& .MuiOutlinedInput-root': { bgcolor: 'white' } }
const naira = <InputAdornment position="start">₦</InputAdornment>

type PricingType = 'airport-transfer' | 'daily' | 'fleet'

const typeLabel: Record<PricingType, string> = {
  'airport-transfer': 'Airport Transfer',
  daily: 'Daily Rental',
  fleet: 'Fleet Rental',
}

const AirportTransferForm = ({
  categoryData,
  categoryId,
  type,
  onPendingChange,
}: {
  categoryData: PricingConfigData
  categoryId: string
  type: string
  onPendingChange?: (pending: boolean) => void
}) => {
  const navigate = useNavigate()
  const { mutate: updateConfig, isPending } = useUpdatePricingConfig(
    categoryId,
    type === 'airport-transfer' ? 'airport_transfer' : type,
  )

  useEffect(() => {
    onPendingChange?.(isPending)
  }, [isPending])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AirportTransferFormData>({
    resolver: zodResolver(airportTransferSchema) as any,
  })

  useEffect(() => {
    if (categoryData) {
      reset({
        per_km: fromKobo(categoryData.airport_transfer_per_km),
        per_min: fromKobo(categoryData.airport_transfer_per_min),
        min_fare: fromKobo(categoryData.airport_transfer_base_price),
        free_wait_time: categoryData.airport_transfer_free_wait_time,
        cancellation_percentage:
          categoryData.airport_transfer_cancellation_percentage,
      })
    }
  }, [categoryData, reset])

  const onSubmit = (data: AirportTransferFormData) => {
    updateConfig({
      base_price: toKobo(data.min_fare),
      per_km: toKobo(data.per_km),
      per_min: toKobo(data.per_min),
      free_wait_time: Number(data.free_wait_time),
      cancellation_percentage: Number(data.cancellation_percentage),
    } as any)
    navigate(path.DASHBOARD.PRICING_CONFIG)
  }

  return (
    <form id="airport-transfer-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Trip fare</h2>
          <div className="space-y-4">
            <Field
              label="Price per kilometer"
              hint="Rate charged based on total trip distance"
              error={errors.per_km?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('per_km')}
                error={!!errors.per_km}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
            <Field
              label="Price per minute"
              hint="Rate charged based on total trip duration."
              error={errors.per_min?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('per_min')}
                error={!!errors.per_min}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
            <Field
              label="Minimum price"
              hint="Minimum amount per trip"
              error={errors.min_fare?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('min_fare')}
                error={!!errors.min_fare}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">
            Waiting fee (optional)
          </h2>
          <div className="space-y-4">
            <Field
              label="Free wait time (minutes)"
              hint="The free time in minutes before wait time fees is charged"
              error={errors.free_wait_time?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('free_wait_time')}
                error={!!errors.free_wait_time}
              />
            </Field>
          </div>
        </section>

        <CancellationSection errors={errors} register={register} />
      </div>
    </form>
  )
}

const DailyForm = ({
  categoryData,
  categoryId,
  type,
  onPendingChange,
}: {
  categoryData: PricingConfigData
  categoryId: string
  type: string
  onPendingChange?: (pending: boolean) => void
}) => {
  const navigate = useNavigate()
  const { mutate: updateConfig, isPending } = useUpdatePricingConfig(
    categoryId,
    type,
  )

  useEffect(() => {
    onPendingChange?.(isPending)
  }, [isPending])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DailyFormData>({
    resolver: zodResolver(dailySchema) as any,
  })

  useEffect(() => {
    if (categoryData) {
      reset({
        half_day_fare: fromKobo(categoryData.daily_rental_half_day_fare),
        full_day_fare: fromKobo(categoryData.daily_rental_full_day_fare),
        free_wait_time: categoryData.daily_rental_free_wait_time,
        cancellation_percentage:
          categoryData.daily_rental_cancellation_percentage,
        extra_time_cost: fromKobo(categoryData.daily_rental_extra_time_cost),
        grace_period_mins: categoryData.daily_rental_grace_period_mins,
      })
    }
  }, [categoryData, reset])

  const onSubmit = (data: DailyFormData) => {
    updateConfig({
      half_day_fare: toKobo(data.half_day_fare),
      full_day_fare: toKobo(data.full_day_fare),
      free_wait_time: Number(data.free_wait_time),
      cancellation_percentage: Number(data.cancellation_percentage),
      extra_time_cost: toKobo(data.extra_time_cost),
      grace_period_mins: Number(data.grace_period_mins),
    })
    navigate(path.DASHBOARD.PRICING_CONFIG)
  }

  return (
    <form id="daily-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">
            Half-Day Fare
          </h2>
          <div className="space-y-4">
            <Field
              label="Fixed Price"
              hint="Price for half-day"
              error={errors.half_day_fare?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('half_day_fare')}
                error={!!errors.half_day_fare}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">
            Full Day Fare
          </h2>
          <div className="space-y-4">
            <Field
              label="Fixed Price"
              hint="Price for full-day"
              error={errors.full_day_fare?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('full_day_fare')}
                error={!!errors.full_day_fare}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Waiting time</h2>
          <div className="space-y-4">
            <Field
              label="Free wait time"
              hint="The free time in minutes before trip booking starts counting"
              error={errors.free_wait_time?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('free_wait_time')}
                error={!!errors.free_wait_time}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Extra Time</h2>
          <div className="space-y-4">
            <Field
              label="Grace period"
              hint="The free time in minutes after booking time elapses"
              error={errors.grace_period_mins?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('grace_period_mins')}
                error={!!errors.grace_period_mins}
              />
            </Field>
            <Field
              label="Extra fare per hour"
              hint="Price for extra fare if booking time is exceeded"
              error={errors.extra_time_cost?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('extra_time_cost')}
                error={!!errors.extra_time_cost}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <CancellationSection errors={errors} register={register} />
      </div>
    </form>
  )
}

const FleetForm = ({
  categoryData,
  categoryId,
  type,
  onPendingChange,
}: {
  categoryData: PricingConfigData
  categoryId: string
  type: string
  onPendingChange?: (pending: boolean) => void
}) => {
  const navigate = useNavigate()
  const { mutate: updateConfig, isPending } = useUpdatePricingConfig(
    categoryId,
    type,
  )

  useEffect(() => {
    onPendingChange?.(isPending)
  }, [isPending])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FleetFormData>({
    resolver: zodResolver(fleetSchema) as any,
  })

  useEffect(() => {
    if (categoryData) {
      reset({
        base_price: fromKobo(categoryData.fleet_rental_base_price),
        free_wait_time: categoryData.fleet_rental_free_wait_time,
        wait_fee_per_min: fromKobo(categoryData.fleet_rental_wait_fee_per_min),
        trip_commission_percentage:
          categoryData.fleet_rental_trip_commission_percentage,
        cancellation_percentage:
          categoryData.fleet_rental_cancellation_percentage,
        extra_time_cost: fromKobo(categoryData.fleet_rental_extra_time_cost),
        grace_period_mins: categoryData.fleet_rental_grace_period_mins,
        daily_hours: categoryData.fleet_rental_daily_hours,
      })
    }
  }, [categoryData, reset])

  const onSubmit = (data: FleetFormData) => {
    updateConfig({
      base_price: toKobo(data.base_price),
      free_wait_time: Number(data.free_wait_time),
      wait_fee_per_min: toKobo(data.wait_fee_per_min),
      trip_commission_percentage: Number(data.trip_commission_percentage),
      cancellation_percentage: Number(data.cancellation_percentage),
      extra_time_cost: toKobo(data.extra_time_cost),
      grace_period_mins: Number(data.grace_period_mins),
      daily_hours: Number(data.daily_hours),
    })
    navigate(path.DASHBOARD.PRICING_CONFIG)
  }

  return (
    <form id="fleet-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Trip fare</h2>
          <div className="space-y-4">
            <Field
              label="Fixed Price"
              hint="Price per vehicle"
              error={errors.base_price?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('base_price')}
                error={!!errors.base_price}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
            <Field
              label="Daily hours"
              hint="No. of hours per day"
              error={errors.daily_hours?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('daily_hours')}
                error={!!errors.daily_hours}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Waiting time</h2>
          <div className="space-y-4">
            <Field
              label="Free wait time"
              hint="The free time in minutes before trip time starts counting"
              error={errors.free_wait_time?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('free_wait_time')}
                error={!!errors.free_wait_time}
              />
            </Field>
            <Field
              label="Wait fee per minute"
              hint="Fee charged per minute after free wait time"
              error={errors.wait_fee_per_min?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('wait_fee_per_min')}
                error={!!errors.wait_fee_per_min}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-normal text-neutral-900">Extra Time</h2>
          <div className="space-y-4">
            <Field
              label="Grace period"
              hint="The free time in minutes after booking time elapses"
              error={errors.grace_period_mins?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('grace_period_mins')}
                error={!!errors.grace_period_mins}
              />
            </Field>
            <Field
              label="Extra fare per hour"
              hint="Price for extra fare if booking time is exceeded"
              error={errors.extra_time_cost?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                sx={inputSx}
                {...register('extra_time_cost')}
                error={!!errors.extra_time_cost}
                slotProps={{ input: { startAdornment: naira } }}
              />
            </Field>
          </div>
        </section>

        <CancellationSection errors={errors} register={register} />
        <CommissionSection errors={errors} register={register} />
      </div>
    </form>
  )
}

const Field = ({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) => (
  <div className="space-y-1">
    <label className="text-sm font-normal text-neutral-900 block">
      {label}
    </label>
    {hint && <p className="text-xs text-neutral-500 mb-2">{hint}</p>}
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
)

const SaveButton = ({
  isPending,
  formId,
}: {
  isPending: boolean
  formId?: string
}) => (
  <Button
    variant="contained"
    type="submit"
    form={formId}
    disabled={isPending}
    sx={{
      bgcolor: 'black',
      color: 'white',
      textTransform: 'none',
      fontSize: '0.875rem',
      fontWeight: 500,
      px: 3,
      '&:hover': { bgcolor: 'neutral.800' },
    }}
  >
    {isPending ? 'Saving...' : 'Save Changes'}
  </Button>
)

interface CancellationSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
}

const CancellationSection = ({
  errors,
  register,
}: CancellationSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-normal text-neutral-900">Cancellation fee</h2>
      <Field
        label="Cancel fee"
        hint="A percentage of the trip fare that is charged for trip cancellation"
        error={errors.cancellation_percentage?.message}
      >
        <TextField
          fullWidth
          type="number"
          size="medium"
          {...register('cancellation_percentage')}
          error={!!errors.cancellation_percentage}
        />
      </Field>
    </section>
  )
}

const CommissionSection = ({ errors, register }: any) => (
  <section className="space-y-4">
    <h2 className="text-lg font-normal text-neutral-900">
      Platform Commission
    </h2>
    <Field
      label="Commission fee"
      hint="Percentage commission of the trip fare for the platform"
      error={errors.trip_commission_percentage?.message}
    >
      <TextField
        fullWidth
        type="number"
        size="medium"
        {...register('trip_commission_percentage')}
        error={!!errors.trip_commission_percentage}
      />
    </Field>
  </section>
)

// ─── Page wrapper ─────────────────────────────────────────────────────────────

export const PricingConfigDetails = () => {
  const { id, type } = useParams<{ id: string; type: PricingType }>()
  const navigate = useNavigate()
  const categoryId = id ?? ''
  const [isPending, setIsPending] = React.useState(false)
  const pricingType = type as PricingType

  const {
    data: categoryData,
    isLoading,
    error,
  } = useVehicleCategory(categoryId)

  useEffect(() => {
    if (!id) {
      toast.error('Invalid configuration ID')
      setTimeout(() => navigate(path.DASHBOARD.PRICING_CONFIG), 2000)
    }
  }, [id, navigate])

  if (isLoading) return <PricingConfigDetailsSkeleton />
  if (error)
    return (
      <ErrorState message={error?.message || 'Failed to load configuration'} />
    )
  if (!categoryData) return <PricingConfigDetailsSkeleton />

  const label = typeLabel[pricingType]
  const formId = `${pricingType}-form`

  // small hack to fix typing issue
  const formProps = {
    categoryData: categoryData as unknown as PricingConfigData,
    categoryId,
    type: pricingType,
    onPendingChange: setIsPending,
  }

  const isAirportTransferType = pricingType === 'airport-transfer'
  const isDailyType = pricingType === 'daily'
  const isFleetType = pricingType === 'fleet'

  return (
    <div className="max-w-4xl">
      <AppBreadcrumbs
        items={[
          { label: 'Price Configuration', to: path.DASHBOARD.PRICING_CONFIG },
          {
            label: `${label}: ${categoryData?.name ?? ''}`,
            to: path.DASHBOARD.PRICING_CONFIG_DETAILS.replace(
              ':id',
              id!,
            ).replace(':type', type!),
          },
        ]}
      />

      <div className="flex items-center justify-between mt-2 mb-4">
        <h1 className="text-2xl font-normal text-neutral-900">
          <span>{label}:</span>{' '}
          <span className="font-medium">{categoryData?.name}</span>
        </h1>
        <SaveButton isPending={isPending} formId={formId} />
      </div>

      {isAirportTransferType && <AirportTransferForm {...formProps} />}
      {isDailyType && <DailyForm {...formProps} />}
      {isFleetType && <FleetForm {...formProps} />}
    </div>
  )
}
