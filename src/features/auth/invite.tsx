import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { PasswordInput } from '@/components/ui/password-input'
import { Letter, LockPassword } from '@solar-icons/react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inviteSchema, type InviteFormValues } from './schemas/invite-schema'
import { useAcceptAdminInvite } from './api/use-auth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { path } from '@/app/paths'

export const Invite = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inviteKey = searchParams.get('id')

  const { mutate: acceptInvite, isPending } = useAcceptAdminInvite()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: InviteFormValues) => {
    if (!inviteKey) {
      toast.error('Invalid invite link')
      return
    }

    acceptInvite(
      {
        email: data.email,
        key: inviteKey,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          toast.success(response?.message || 'Invite accepted successfully')
          navigate(path.AUTH.OTP, { state: { email: data.email } })
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to accept invite')
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          fontFamily: 'Kento, sans-serif',
          textTransform: 'uppercase',
        }}
      >
        INVITE ACCEPTED
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          hiddenLabel
          fullWidth
          size="medium"
          label="Email"
          placeholder="exodustimothy@gmail.com"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Letter />
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="space-y-4">
          <p className="text-xl font-semibold">Set Password</p>

          <div className="flex flex-col gap-4">
            <PasswordInput
              hiddenLabel
              fullWidth
              size="medium"
              placeholder="******"
              label="Enter New Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockPassword />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <PasswordInput
              hiddenLabel
              fullWidth
              size="medium"
              placeholder="******"
              label="Confirm New Password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockPassword />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        </div>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Processing...' : 'Proceed'}
        </Button>
      </form>
    </div>
  )
}
