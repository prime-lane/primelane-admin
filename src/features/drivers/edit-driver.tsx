import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { LoadingState } from '@/components/ui/loading-error-states'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDriver, useUpdateDriver } from './api/use-drivers'
import {
  type EditDriverFormData,
  editDriverSchema,
} from './schemas/edit-driver-schema'

export const EditDriver = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: driverData, isLoading: isDriverLoading } = useDriver(id!)
  const { mutate: updateDriver, isPending: isUpdating } = useUpdateDriver(id)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditDriverFormData>({
    resolver: zodResolver(editDriverSchema),
  })
  const driver = driverData?.user
  // const watchedImage = watch('image_url')

  useEffect(() => {
    if (driver) {
      setValue('first_name', driver.first_name)
      setValue('last_name', driver.last_name)
      setValue('email', driver.email)
      setValue('phone_number', driver.phone_number)
      // setValue('date_of_birth', '')
      setValue('nin', '')
      // setValue('driver_license', '')
      // setValue('vehicle_model', '')
      // setValue('vehicle_make', '')
      // setValue('vehicle_color', '')
      // setValue('vehicle_plate_number', '')
      // setValue('vehicle_vin_chassis', '')
      // setValue('vehicle_year', '')
      // setValue('image_url', driver.image_url || '')
      // setImagePreview(driver.image_url || null)
    }
  }, [driver, setValue])

  // useEffect(() => {
  //   if (watchedImage) {
  //     setImagePreview(watchedImage)
  //   }
  // }, [watchedImage])

  const onSubmit = (data: EditDriverFormData) => {
    updateDriver(
      {
        email: data.email,
        phone_number: data.phone_number,
        first_name: data.first_name,
        last_name: data.last_name,
        nin: data.nin,
        // image_url: data.image_url || undefined,
      },
      {
        onSuccess: () => {
          navigate(path.DASHBOARD.DRIVER_DETAILS.replace(':id', id!))
        },
        onError: () => {
          toast.error('Failed to update driver profile')
        },
      },
    )
  }

  if (isDriverLoading) return <LoadingState />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
      <div>
        <AppBreadcrumbs
          items={[
            { label: 'Drivers', to: path.DASHBOARD.DRIVERS },
            {
              label: `${driver?.first_name} ${driver?.last_name}`,
              to: path.DASHBOARD.DRIVER_DETAILS.replace(':id', id!),
            },
            { label: 'Edit Profile' },
          ]}
        />
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Edit driver profile</span>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isUpdating}
            sx={{
              bgcolor: 'black',
              '&:hover': { bgcolor: 'neutral.800' },
              px: 4,
            }}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {/* <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar
              src={imagePreview || undefined}
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'orange.100',
                fontSize: '2rem',
              }}
            >
              {driver?.first_name?.[0]}
            </Avatar>
          </div>
        </div> */}

        {/* Personal Info */}
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-semibold text-neutral-600">
            Personal Info
          </h3>
          <TextField
            label="First name"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
          <TextField
            label="Last name"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
          <TextField
            label="Email address"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone number"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('phone_number')}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
          <TextField
            label="NIN"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('nin')}
            error={!!errors.nin}
            helperText={errors.nin?.message}
          />
          {/* <TextField
            label="Date of Birth"
            size="medium"
            fullWidth
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('date_of_birth')}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth?.message}
          /> */}
        </div>

        {/* Identity Details */}
        {/* <div className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-semibold text-neutral-600">
            Identity details
          </h3>
          <TextField
            label="NIN"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('nin')}
            error={!!errors.nin}
            helperText={errors.nin?.message}
          />
          <TextField
            label="Driver license"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('driver_license')}
            error={!!errors.driver_license}
            helperText={errors.driver_license?.message}
          />
        </div> */}

        {/* Vehicle Info */}
        {/* <div className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-semibold text-neutral-600">
            Vehicle Info
          </h3>
          <TextField
            label="Vehicle model"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_model')}
            error={!!errors.vehicle_model}
            helperText={errors.vehicle_model?.message}
          />
          <TextField
            label="Vehicle make"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_make')}
            error={!!errors.vehicle_make}
            helperText={errors.vehicle_make?.message}
          />
          <TextField
            label="Vehicle color"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_color')}
            error={!!errors.vehicle_color}
            helperText={errors.vehicle_color?.message}
          />
          <TextField
            label="Vehicle plate number"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_plate_number')}
            error={!!errors.vehicle_plate_number}
            helperText={errors.vehicle_plate_number?.message}
          />
          <TextField
            label="Vehicle VIN/Chassis"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_vin_chassis')}
            error={!!errors.vehicle_vin_chassis}
            helperText={errors.vehicle_vin_chassis?.message}
          />
          <TextField
            label="Vehicle year"
            hiddenLabel
            size="medium"
            fullWidth
            {...register('vehicle_year')}
            error={!!errors.vehicle_year}
            helperText={errors.vehicle_year?.message}
          />
        </div> */}
      </div>
    </form>
  )
}
