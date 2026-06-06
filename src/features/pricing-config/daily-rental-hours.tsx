import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppConfig, useUpdateAppConfig } from './api/use-app-config'
import {
  dailyHoursSchema,
  type DailyHoursFormData,
} from './schemas/pricing-config-schema'
import { PricingConfigDetailsSkeleton } from './components/skeletons'

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
  formId: string
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

export const DailyRentalHours = () => {
  const navigate = useNavigate()
  const { data: appConfig, isLoading, error } = useAppConfig()
  const { mutate: updateAppConfig, isPending } = useUpdateAppConfig()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DailyHoursFormData>({
    resolver: zodResolver(dailyHoursSchema) as any,
  })

  useEffect(() => {
    if (appConfig) {
      reset({
        half_day_hours: appConfig.daily_rental_half_day_hours,
        full_day_hours: appConfig.daily_rental_full_day_hours,
      })
    }
  }, [appConfig, reset])

  const onSubmit = (data: DailyHoursFormData) => {
    updateAppConfig(data, {
      onSuccess: () => navigate(path.DASHBOARD.PRICING_CONFIG),
    })
  }

  if (isLoading) return <PricingConfigDetailsSkeleton />
  if (error)
    return (
      <ErrorState
        message={error?.message || 'Failed to load daily rental hours'}
      />
    )

  const formId = 'daily-rental-hours-form'

  return (
    <div className="max-w-4xl">
      <AppBreadcrumbs
        items={[
          { label: 'Price Configuration', to: path.DASHBOARD.PRICING_CONFIG },
          {
            label: 'Daily Rental Hour Configuration',
            to: path.DASHBOARD.PRICING_CONFIG_HOURS,
          },
        ]}
      />

      <div className="flex items-center justify-between mt-2 mb-4">
        <h1 className="text-2xl font-normal text-neutral-900">
          Daily Rental Hour Configuration
        </h1>
        <SaveButton isPending={isPending} formId={formId} />
      </div>

      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-lg mx-auto space-y-10">
          <section className="space-y-4">
            <h2 className="text-lg font-normal text-neutral-900">
              Half-Day
            </h2>
            <Field
              label="No. of hours"
              hint="No. of hours for half-day"
              error={errors.half_day_hours?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('half_day_hours')}
                error={!!errors.half_day_hours}
              />
            </Field>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-normal text-neutral-900">
              Full Day
            </h2>
            <Field
              label="No. of hours"
              hint="No. of hours for full-day"
              error={errors.full_day_hours?.message}
            >
              <TextField
                fullWidth
                type="number"
                size="medium"
                {...register('full_day_hours')}
                error={!!errors.full_day_hours}
              />
            </Field>
          </section>
        </div>
      </form>
    </div>
  )
}
