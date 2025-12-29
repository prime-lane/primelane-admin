import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { Letter } from '@solar-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from './schemas/forgot-password-schema'
import { useForgotPassword } from './api/use-auth'
import { path } from '@/app/paths'

export const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword({ email: data.email })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            fontFamily: 'Kento, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          FORGOT PASSWORD
        </Typography>
        <Typography variant="caption" color="neutral.500">
          Enter your email address to reset your password.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField
          {...register('email')}
          hiddenLabel
          fullWidth
          size="medium"
          label="Email"
          placeholder="johndoe@mail.com"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isPending}
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

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isPending || !isValid}
          >
            {isPending ? 'Sending...' : 'Send OTP'}
          </Button>

          <Link
            to={path.AUTH.SIGN_IN}
            className="text-sm text-center text-neutral-500 hover:text-black transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}
