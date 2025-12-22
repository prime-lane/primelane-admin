import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { LoadingState, ErrorState } from '@/components/ui/loading-error-states'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useUpdatePricingConfig } from './api/use-pricing-config'
import {
  type PricingConfigFormData,
  pricingConfigSchema,
} from './schemas/pricing-config-schema'
import { formatTitle } from '@/lib/utils'
import { useVehicleCategory } from './api/use-vehicle-categories'

export const PricingConfigDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const type = 'hourly'
  const categoryId = id

  const {
    data: categoryData,
    isLoading,
    error,
  } = useVehicleCategory(categoryId || '')

  const { mutate: updateConfig, isPending: isUpdating } =
    useUpdatePricingConfig(categoryId || '', type)

  const {
    register,
    handleSubmit,
    reset,
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

      reset({
        base_price: data[`${prefix}base_price`] ?? 0,
        per_km: data[`${prefix}per_km`] ?? 0,
        per_min: data[`${prefix}per_min`] ?? 0,
        cancellation_base: data[`${prefix}cancellation_base`] ?? 0,
        cancellation_percentage: data[`${prefix}cancellation_percentage`] ?? 0,
        cancellation_fee_type:
          data[`${prefix}cancellation_fee_type`] ?? 'percentage',
        trip_commission_percentage:
          data[`${prefix}trip_commission_percentage`] ?? 0,
      })
    }
  }, [categoryData, reset, type])

  const onSubmit = (data: PricingConfigFormData) => {
    updateConfig(data)
    navigate(path.DASHBOARD.PRICING_CONFIG)
  }

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load configuration" />

  return (
    <div className="max-w-4xl">
      <AppBreadcrumbs
        items={[
          { label: 'Price Configuration', to: path.DASHBOARD.PRICING_CONFIG },
          {
            label: `${categoryData?.name}`,
            to: path.DASHBOARD.PRICING_CONFIG_DETAILS.replace(':id', id!),
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
                  Price per kilometer
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  Rate charged based on total trip distance
                </p>
                <TextField
                  fullWidth
                  placeholder="1500"
                  type="number"
                  size="medium"
                  {...register('per_km')}
                  error={!!errors.per_km}
                  helperText={errors.per_km?.message}
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
                  Price per minute
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  Rate charged based on total trip duration.
                </p>
                <TextField
                  fullWidth
                  placeholder="1000"
                  type="number"
                  size="medium"
                  {...register('per_min')}
                  error={!!errors.per_min}
                  helperText={errors.per_min?.message}
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">₦</InputAdornment>
                      ),
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
