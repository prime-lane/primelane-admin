import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useVehicleCategories } from '@/features/pricing-config/api/use-vehicle-categories'
import { fromKobo, toKobo } from '@/lib/utils'
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useCoupon, useCreateCoupon, useUpdateCoupon } from './api/use-coupons'
import type { CreateCouponRequest, DiscountType, UsageType } from './types'

const BOOKING_TYPES = [
  { label: 'Airport Transfer', value: 'airport_transfer' },
  { label: 'Daily Rental', value: 'daily' },
]

const inputSx = { '& .MuiOutlinedInput-root': { bgcolor: 'white' } }
const naira = <InputAdornment position="start">₦</InputAdornment>

const toggleSx = (selected: boolean) => ({
  m: 0,
  px: 2,
  py: 1,
  borderColor: selected ? '#111827' : '#E5E7EB',
  borderRadius: '4px',
  bgcolor: 'gray.100',
  '& .MuiFormControlLabel-label': {
    color: '#111827',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '& .MuiRadio-root': {
    color: '#64748B',
    '&.Mui-checked': { color: '#000000' },
  },
  '& .MuiCheckbox-root': { color: selected ? 'white' : 'neutral.400' },
})

const checkboxToggleSx = {
  m: 0,
  px: 0,
  py: 0,
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: 0,
  '& .MuiFormControlLabel-label': {
    color: '#111827',
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  '& .MuiCheckbox-root': {
    color: '#94A3B8',
    '&.Mui-checked': {
      color: 'primary.main',
    },
  },
}

interface CouponFormValues {
  code: string
  description: string
  discount_type: DiscountType
  discount_value: string
  usage_type: UsageType
  usage_limit: string
  starts_at: Date | null
  expires_at: Date | null
  applicable_ride_types: string[]
  applicable_category_ids: string[]
}

interface CouponFormProps {
  mode: 'create' | 'edit'
}

export const CouponForm = ({ mode }: CouponFormProps) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = mode === 'edit'

  const {
    data: existingCoupon,
    isLoading: isLoadingCoupon,
    error: couponError,
  } = useCoupon(isEdit ? id! : '')
  const { data: vehicleCategories } = useVehicleCategories()
  const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon()
  const { mutate: updateCoupon, isPending: isUpdating } = useUpdateCoupon(
    id || '',
  )

  const isPending = isCreating || isUpdating

  const {
    register,
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormValues>({
    defaultValues: {
      code: '',
      description: '',
      discount_type: 'fixed',
      discount_value: '',
      usage_type: 'one_time',
      usage_limit: '',
      starts_at: null,
      expires_at: null,
      applicable_ride_types: [],
      applicable_category_ids: [],
    },
  })

  const discountType = watch('discount_type')
  const usageType = watch('usage_type')
  const selectedRideTypes = watch('applicable_ride_types')
  const selectedCategories = watch('applicable_category_ids')

  useEffect(() => {
    if (isEdit && existingCoupon) {
      reset({
        code: existingCoupon.code,
        description: existingCoupon.description,
        discount_type: existingCoupon.discount_type,
        discount_value:
          existingCoupon.discount_type === 'fixed'
            ? String(fromKobo(existingCoupon.discount_value))
            : String(existingCoupon.discount_value),
        usage_type: existingCoupon.usage_type,
        usage_limit: existingCoupon.usage_limit
          ? String(existingCoupon.usage_limit)
          : '',
        starts_at: existingCoupon.starts_at
          ? new Date(existingCoupon.starts_at)
          : null,
        expires_at: existingCoupon.expires_at
          ? new Date(existingCoupon.expires_at)
          : null,
        applicable_ride_types: existingCoupon.applicable_ride_types || [],
        applicable_category_ids: existingCoupon.applicable_category_ids || [],
      })
    }
  }, [isEdit, existingCoupon, reset])

  const toggleRideType = (val: string) =>
    setValue(
      'applicable_ride_types',
      selectedRideTypes.includes(val)
        ? selectedRideTypes.filter((v) => v !== val)
        : [...selectedRideTypes, val],
    )

  const toggleCategory = (catId: string) =>
    setValue(
      'applicable_category_ids',
      selectedCategories.includes(catId)
        ? selectedCategories.filter((v) => v !== catId)
        : [...selectedCategories, catId],
    )

  const onSubmit = (formData: CouponFormValues) => {
    if (!formData.code.trim()) {
      toast.error('Code name is required')
      return
    }
    if (!formData.discount_value) {
      toast.error('Value is required')
      return
    }
    if (!formData.starts_at || !formData.expires_at) {
      toast.error('Validity period is required')
      return
    }

    const payload: CreateCouponRequest = {
      code: formData.code.trim().toUpperCase(),
      description: formData.description.trim(),
      discount_type: formData.discount_type,
      discount_value:
        formData.discount_type === 'fixed'
          ? toKobo(Number(formData.discount_value))
          : Number(formData.discount_value),
      usage_type: formData.usage_type,
      usage_limit:
        formData.usage_type === 'multiple' && formData.usage_limit
          ? Number(formData.usage_limit)
          : null,
      starts_at: formData.starts_at.toISOString(),
      expires_at: formData.expires_at.toISOString(),
      applicable_ride_types: formData.applicable_ride_types,
      applicable_category_ids: formData.applicable_category_ids,
    }

    if (isEdit) {
      updateCoupon(payload, {
        onSuccess: () =>
          navigate(path.DASHBOARD.COUPON_DETAILS.replace(':id', id!)),
      })
    } else {
      createCoupon(payload, {
        onSuccess: (res) => {
          const newId = (res as any)?.data?.id
          navigate(
            newId
              ? path.DASHBOARD.COUPON_DETAILS.replace(':id', newId)
              : path.DASHBOARD.COUPONS,
          )
        },
      })
    }
  }

  if (isEdit && isLoadingCoupon)
    return <div className="p-8 text-neutral-500">Loading...</div>
  if (isEdit && couponError)
    return <ErrorState message="Failed to load coupon" />

  const title = isEdit ? 'Edit Coupon' : 'Create Coupon'

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="max-w-4xl">
        <AppBreadcrumbs
          items={[
            { label: 'Coupons', to: path.DASHBOARD.COUPONS },
            ...(isEdit && existingCoupon
              ? [
                {
                  label: existingCoupon.code,
                  to: path.DASHBOARD.COUPON_DETAILS.replace(':id', id!),
                },
              ]
              : []),
            { label: title, to: '#' },
          ]}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mt-2 mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{
                bgcolor: 'black',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                '&:hover': { bgcolor: 'neutral.800' },
              }}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          <div className="max-w-lg mx-auto space-y-4">
            <section className="space-y-4">
              <h2 className="text-base">
                Coupon
              </h2>
              <div className="space-y-4">
                <div>
                  <TextField
                    {...register('code', { required: 'Code name is required' })}
                    fullWidth
                    size="medium"
                    label="Code Name"
                    sx={inputSx}
                    placeholder="E.g. WELCOME1, COMPANYXYZ"
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                </div>
                <div>
                  <TextField
                    {...register('description')}
                    fullWidth
                    size="medium"
                    label="Description"
                    sx={inputSx}
                    placeholder="Short description of coupon"
                  />
                </div>
              </div>
            </section>


            <section className="space-y-4">
              <h2 className="text-base">
                Coupon type
              </h2>
              <div className="space-y-4">
                <RadioGroup
                  row
                  value={discountType}
                  onChange={(e) =>
                    setValue('discount_type', e.target.value as DiscountType)
                  }
                  sx={{ gap: 1 }}
                >
                  {[
                    { label: 'Fixed amount', value: 'fixed' },
                    { label: 'Percentage', value: 'percentage' },
                  ].map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio size="small" />}
                      label={opt.label}
                      sx={toggleSx(discountType === opt.value)}
                    />
                  ))}
                </RadioGroup>
                <div className="space-y-1">
                  <TextField
                    {...register('discount_value')}
                    fullWidth
                    size="medium"
                    type="number"
                    label={discountType === 'fixed' ? 'Fixed amount' : 'Percentage'}
                    sx={inputSx}
                    placeholder={discountType === 'fixed' ? '0.00' : '10'}
                    slotProps={
                      discountType === 'fixed'
                        ? { input: { startAdornment: naira } }
                        : {}
                    }
                  />
                </div>
              </div>
            </section>


            <section className="space-y-4">
              <h2 className="text-base">
                Coupon Usage
              </h2>
              <div className="space-y-4">
                <RadioGroup
                  row
                  value={usageType}
                  onChange={(e) => setValue('usage_type', e.target.value as UsageType)}
                  sx={{ gap: 1 }}
                >
                  {[
                    { label: 'One-time use per customer', value: 'one_time' },
                    { label: 'Multiple use', value: 'multiple' },
                  ].map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio size="small" />}
                      label={opt.label}
                      sx={toggleSx(usageType === opt.value)}
                    />
                  ))}
                </RadioGroup>
                {usageType === 'multiple' && (
                  <div className="space-y-1">
                    <TextField
                      {...register('usage_limit')}
                      fullWidth
                      size="medium"
                      type="number"
                      label="Usage Limit (optional)"
                      sx={inputSx}
                      placeholder="1000"
                      helperText="Set a maximum number of coupon usage"
                    />
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-base">
                Validity Period
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-500 block">
                      Start date
                    </label>
                    <Controller
                      name="starts_at"
                      control={control}
                      render={({ field }) => (
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          format="dd/MM/yyyy, HH:mm"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                              sx: {
                                '& .MuiInputBase-input, & .MuiPickersSectionList-sectionContent, & .MuiPickersInputBase-sectionBefore, & .MuiPickersInputBase-sectionAfter': {
                                  fontSize: '12px',
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-500 block">
                      End date
                    </label>
                    <Controller
                      name="expires_at"
                      control={control}
                      render={({ field }) => (
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          format="dd/MM/yyyy, HH:mm"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                              sx: {
                                '& .MuiInputBase-input, & .MuiPickersSectionList-sectionContent, & .MuiPickersInputBase-sectionBefore, & .MuiPickersInputBase-sectionAfter': {
                                  fontSize: '12px',
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Scope */}
            <section className="space-y-4">
              <h2 className="text-base">Scope</h2>
              <div className="space-y-4">
                <p className="text-sm text-neutral-500">
                  Choose the booking and vehicle category for this coupon.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-500">Booking type</p>
                    {BOOKING_TYPES.map((bt) => (
                      <FormControlLabel
                        key={bt.value}
                        control={
                          <Checkbox
                            checked={selectedRideTypes.includes(bt.value)}
                            onChange={() => toggleRideType(bt.value)}
                            size="small"
                          />
                        }
                        label={bt.label}
                        sx={{
                        ...checkboxToggleSx,
                        }}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-500">Vehicle category</p>
                    {(vehicleCategories?.categories || []).map((cat) => (
                      <FormControlLabel
                        key={cat.id}
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            size="small"
                          />
                        }
                        label={cat.name}
                        sx={{
                        ...checkboxToggleSx,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  )
}
