import { Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useChangePassword } from './api/use-auth'
import { path } from '@/app/paths'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type FormData = z.infer<typeof schema>

export const ChangePassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const identifier = location.state?.identifier as string | undefined
  const otp = location.state?.otp as string | undefined

  const { mutate: changePassword, isPending } = useChangePassword()

  useEffect(() => {
    if (!identifier || !otp) {
      navigate(path.AUTH.FORGOT_PASSWORD)
    }
  }, [identifier, otp, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    if (!identifier || !otp) return
    changePassword({
      identifier,
      password: data.password,
      otp,
      user_type: 'admin',
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ fontFamily: 'Kento, sans-serif', textTransform: 'uppercase' }}
        >
          SET NEW PASSWORD
        </Typography>
        <Typography variant="caption" color="neutral.500">
          Enter your new password below.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          {...register('password')}
          type="password"
          label="New Password"
          fullWidth
          size="medium"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isPending}
        />
        <TextField
          {...register('confirm_password')}
          type="password"
          label="Confirm Password"
          fullWidth
          size="medium"
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          disabled={isPending}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isPending || !isValid}
        >
          {isPending ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  )
}
