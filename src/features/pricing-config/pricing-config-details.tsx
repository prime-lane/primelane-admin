import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm, type Resolver } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { fromKobo, toKobo } from '@/lib/utils'
import { useUpdatePricingConfig } from './api/use-pricing-config'
import {
  type PricingConfigFormData,
  pricingConfigSchema,
} from './schemas/pricing-config-schema'
import { useVehicleCategory } from './api/use-vehicle-categories'
import { PricingConfigDetailsSkeleton } from './components/skeletons'

export const PricingConfigDetails = () => {
  const { id, type } = useParams<{ id: string; type: 'one_off' | 'hourly' }>()
  const isOneWay = type === 'one_off'
  // const isHourly = type === 'hourly'

  const navigate = useNavigate()
  const categoryId = id

  const {
    data: categoryData,
    isLoading,
    error,
  } = useVehicleCategory(categoryId || '')

  const { mutate: updateConfig, isPending: isUpdating } =
    useUpdatePricingConfig(categoryId || '', type || 'one_off')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PricingConfigFormData>({
    resolver: zodResolver(
      pricingConfigSchema,
    ) as Resolver<PricingConfigFormData>,
    defaultValues: {
      cancellation_fee_type: 'percentage', // Default
    },
  })

  useEffect(() => {
    if (!id) {
      toast.error('Invalid configuration ID')
      setTimeout(() => {
        navigate(path.DASHBOARD.PRICING_CONFIG)
      }, 2000)
    }
  }, [id])

  useEffect(() => {
    if (categoryData) {
      const prefix = type === 'hourly' ? 'hourly_' : 'one_way_'
      const data = categoryData as any

      if (type === 'hourly') {
        reset({
          base_price: fromKobo(data[`${prefix}base_price`]),
          per_hour: fromKobo(data[`${prefix}per_hour`]),
          min_hour: data[`${prefix}min_hour`] ?? 0,
          cancellation_base: fromKobo(data[`${prefix}cancellation_base`]),
          cancellation_percentage:
            data[`${prefix}cancellation_percentage`] ?? 0,
          cancellation_fee_type:
            data[`${prefix}cancellation_fee_type`] ?? 'percentage',
          trip_commission_percentage:
            data[`${prefix}trip_commission_percentage`] ?? 0,
        })
      } else {
        reset({
          base_price: fromKobo(data[`${prefix}base_price`]),
          per_km: fromKobo(data[`${prefix}per_km`]),
          per_min: fromKobo(data[`${prefix}per_min`]),
          cancellation_base: fromKobo(data[`${prefix}cancellation_base`]),
          cancellation_percentage:
            data[`${prefix}cancellation_percentage`] ?? 0,
          cancellation_fee_type:
            data[`${prefix}cancellation_fee_type`] ?? 'percentage',
          trip_commission_percentage:
            data[`${prefix}trip_commission_percentage`] ?? 0,
        })
      }
    }
  }, [categoryData, reset, type])

  const onSubmit = (data: PricingConfigFormData) => {
    const payload: any = {
      base_price: toKobo(data.base_price),
      cancellation_base: toKobo(data.cancellation_base),
      cancellation_percentage: Number(data.cancellation_percentage),
      cancellation_fee_type: data.cancellation_fee_type,
      trip_commission_percentage: Number(data.trip_commission_percentage),
    }

    if (type === 'hourly') {
      payload.per_hour = toKobo(data.per_hour!)
      payload.min_hour = Number(data.min_hour)
    } else {
      payload.per_km = toKobo(data.per_km!)
      payload.per_min = toKobo(data.per_min!)
    }

    updateConfig(payload)
    navigate(path.DASHBOARD.PRICING_CONFIG)
  }

  if (isLoading) return <PricingConfigDetailsSkeleton />
  if (error)
    return (
      <ErrorState
        message={`${error?.message || 'Failed to load configuration'}`}
      />
    )

  return (
    <div className="max-w-4xl">
      <AppBreadcrumbs
        items={[
          { label: 'Price Configuration', to: path.DASHBOARD.PRICING_CONFIG },
          {
            label: `${categoryData?.name} - ${type === 'one_off' ? 'One-way' : 'Hourly'}`,
            to: path.DASHBOARD.PRICING_CONFIG_DETAILS.replace(
              ':id',
              id!,
            ).replace(':type', type!),
          },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mt-6 mb-12">
          <h1 className="text-2xl font-bold text-neutral-900">
            {categoryData?.name}
          </h1>
          <Button
            variant="contained"
            type="submit"
            disabled={isUpdating}
            sx={{
              bgcolor: 'black',
              color: 'white',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              px: 3,
              '&:hover': {
                bgcolor: 'neutral.800',
              },
            }}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="max-w-lg mx-auto space-y-10">
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Trip fare
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-900 block">
                  Base fare
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  starting amount per trip
                </p>
                <TextField
                  fullWidth
                  placeholder="200000"
                  type="number"
                  size="medium"
                  {...register('base_price')}
                  error={!!errors.base_price}
                  helperText={errors.base_price?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">₦</InputAdornment>
                      ),
                    },
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-900 block">
                  Price per {isOneWay ? 'kilometer' : 'hour'}
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  Rate charged based on{' '}
                  {isOneWay
                    ? 'total trip distance'
                    : 'total trip hour duration'}
                </p>
                <TextField
                  fullWidth
                  placeholder="1500"
                  type="number"
                  size="medium"
                  {...register(isOneWay ? 'per_km' : 'per_hour')}
                  error={isOneWay ? !!errors.per_km : !!errors.per_hour}
                  helperText={
                    isOneWay ? errors.per_km?.message : errors.per_hour?.message
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">₦</InputAdornment>
                      ),
                    },
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-900 block">
                  {isOneWay ? 'Price per minute' : 'Minimum hour'}
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  {isOneWay
                    ? 'Rate charged based on total trip duration.'
                    : 'Lowest no. Of hours that can be booked.'}
                </p>
                <TextField
                  fullWidth
                  placeholder={isOneWay ? '1000' : '5'}
                  type="number"
                  size="medium"
                  {...register(isOneWay ? 'per_min' : 'min_hour')}
                  error={isOneWay ? !!errors.per_min : !!errors.min_hour}
                  helperText={
                    isOneWay
                      ? errors.per_min?.message
                      : errors.min_hour?.message
                  }
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: isOneWay ? (
                        <InputAdornment position="start">₦</InputAdornment>
                      ) : undefined,
                    },
                  }}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Cancellation fee
            </h2>

            <div className="space-y-1">
              <FormControl
                component="fieldset"
                error={!!errors.cancellation_fee_type}
              >
                <FormLabel component="legend">Cancellation fee type</FormLabel>
                <Controller
                  name="cancellation_fee_type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="percentage"
                        control={<Radio size="small" />}
                        label="Percentage"
                      />
                      <FormControlLabel
                        value="fixed"
                        control={<Radio size="small" />}
                        label="Fixed"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.cancellation_fee_type && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.cancellation_fee_type.message}
                  </p>
                )}
              </FormControl>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-900 block">
                Cancel fee
              </label>
              <p className="text-xs text-neutral-500 mb-2">
                A percentage of the trip fare that is charged for trip
                cancellation
              </p>
              <TextField
                fullWidth
                placeholder="10"
                type="number"
                size="medium"
                {...register('cancellation_percentage')}
                error={!!errors.cancellation_percentage}
                helperText={errors.cancellation_percentage?.message}
                variant="outlined"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-900 block">
                Cancellation base
              </label>
              <p className="text-xs text-neutral-500 mb-2">
                A fixed amount of the trip fare that is charged for trip
                cancellation
              </p>
              <TextField
                fullWidth
                placeholder="10"
                type="number"
                size="medium"
                {...register('cancellation_base')}
                error={!!errors.cancellation_base}
                helperText={errors.cancellation_base?.message}
                variant="outlined"
              />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Platform Comission
            </h2>

            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-900 block">
                Commission fee
              </label>
              <p className="text-xs text-neutral-500 mb-2">
                Percentage commission of the trip fare for the platform
              </p>
              <TextField
                fullWidth
                placeholder="10"
                type="number"
                size="medium"
                {...register('trip_commission_percentage')}
                error={!!errors.trip_commission_percentage}
                helperText={errors.trip_commission_percentage?.message}
                variant="outlined"
              />
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}
