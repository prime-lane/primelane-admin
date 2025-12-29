import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Letter, LockPassword } from '@solar-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/ui/password-input'
import { signInSchema, type SignInFormData } from './schemas/sign-in-schema'
import { useSignIn } from './api/use-auth'
import { path } from '@/app/paths'

export const SignIn = () => {
  const signIn = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    await signIn.mutateAsync({ ...data, user_type: 'admin' })
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
        LOG IN AS ADMIN
      </Typography>

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
          disabled={isSubmitting || signIn.isPending}
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
          <PasswordInput
            {...register('password')}
            hiddenLabel
            fullWidth
            size="medium"
            placeholder="******"
            label="Enter Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isSubmitting || signIn.isPending}
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
          <Link
            to={path.AUTH.FORGOT_PASSWORD}
            className="text-base text-right text-black underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting || signIn.isPending}
        >
          {isSubmitting || signIn.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}
