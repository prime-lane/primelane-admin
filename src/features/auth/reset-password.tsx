import { Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams, Link } from 'react-router-dom'
import { useCompletePasswordReset } from './api/use-auth'
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

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const { mutate: completeReset, isPending } = useCompletePasswordReset()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    completeReset({ token, password: data.password })
  }

  if (!token) {
    return (
      <div className="flex flex-col gap-4">
        <Typography variant="subtitle1" color="error">
          Invalid or missing reset token.
        </Typography>
        <Link
          to={path.AUTH.FORGOT_PASSWORD}
          className="text-sm text-neutral-500 hover:text-black"
        >
          Request a new reset link
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ fontFamily: 'Kento, sans-serif', textTransform: 'uppercase' }}
        >
          RESET PASSWORD
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
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
        <Link
          to={path.AUTH.SIGN_IN}
          className="text-sm text-center text-neutral-500 hover:text-black transition-colors"
        >
          Back to Sign In
        </Link>
      </form>
    </div>
  )
}
