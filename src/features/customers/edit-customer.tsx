import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { LoadingState } from '@/components/ui/loading-error-states'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useCustomer, useUpdateCustomer } from './api/use-customers'
import {
  type EditCustomerFormData,
  editCustomerSchema,
} from './schemas/edit-customer-schema'

export const EditCustomer = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: customerData, isLoading: isCustomerLoading } = useCustomer(id!)
  const { mutate: updateCustomer, isPending: isUpdating } =
    useUpdateCustomer(id)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditCustomerFormData>({
    resolver: zodResolver(editCustomerSchema),
  })
  const customer = customerData?.user

  useEffect(() => {
    if (customer) {
      setValue('first_name', customer.first_name)
      setValue('last_name', customer.last_name)
      setValue('email', customer.email)
      setValue('phone_number', customer.phone_number)
      setValue('nin', customer.nin || '')
    }
  }, [customer, setValue])

  const onSubmit = (data: EditCustomerFormData) => {
    updateCustomer(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        nin: data.nin,
        // image_url: data.image_url || undefined,
      },
      {
        onSuccess: () => {
          navigate(path.DASHBOARD.CUSTOMER_DETAILS.replace(':id', id!))
        },
        onError: () => {
          toast.error('Failed to update customer profile')
        },
      },
    )
  }

  if (isCustomerLoading) return <LoadingState />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
      <div>
        <AppBreadcrumbs
          items={[
            { label: 'Customers', to: path.DASHBOARD.CUSTOMERS },
            {
              label: `${customer?.first_name} ${customer?.last_name}`,
              to: path.DASHBOARD.CUSTOMER_DETAILS.replace(':id', id!),
            },
            { label: 'Edit Profile' },
          ]}
        />
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Edit customer profile</span>
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

      <div className="space-y-4 max-w-lg mx-auto">
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
              {customer?.first_name?.[0]}
            </Avatar>
          </div>
        </div> */}

        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="First name"
            size="medium"
            // disabled
            {...register('first_name')}
            // helperText="First name cannot be changed"
          />
          <TextField
            label="Last name"
            size="medium"
            // disabled
            {...register('last_name')}
            // helperText="Last name cannot be changed"
          />

          <TextField
            label="Email address"
            size="medium"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone number"
            size="medium"
            {...register('phone_number')}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />

          <TextField
            label="NIN"
            size="medium"
            {...register('nin')}
            placeholder="Enter NIN"
            error={!!errors.nin}
            helperText={errors.nin?.message}
          />
        </div>
      </div>
    </form>
  )
}
