import { Button, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, type OtpFormValues } from './schemas/otp-schema'
import { useResendOTP, useVerifyAdminOtp } from './api/use-auth'
import { toast } from 'sonner'
import { path } from '../../app/paths'

export const Otp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyAdminOtp()
  const { mutate: resendOtp, isPending: isResending } = useResendOTP('login')

  const [timer, setTimer] = useState(60)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email || '',
      otp: '',
    },
    mode: 'onChange',
  })

  const otpValue = watch('otp')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    if (!email) {
      toast.error('Email not found, redirecting to login')
      navigate(path.AUTH.SIGN_IN)
    }
  }, [email, navigate])

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    if (isNaN(Number(value))) return

    const currentOtp = otpValue.split('')
    // Pad with spaces if logic assumes index based access on empty string,
    // but easier to just construct a new array of 6
    const newOtpArray = [...Array(6)].map((_, i) => currentOtp[i] || '')

    newOtpArray[index] = value.slice(-1) // Take last char if multiple
    const newOtpString = newOtpArray.join('')

    setValue('otp', newOtpString, { shouldValidate: true })

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    setValue('otp', pastedData, { shouldValidate: true })

    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const onSubmit = (data: OtpFormValues) => {
    verifyOtp({
      email: data.email,
      otp: data.otp,
    })
  }

  const handleResend = () => {
    if (!email) return
    resendOtp(
      { email },
      {
        onSuccess: () => {
          setTimer(60)
        },
      },
    )
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
          ENTER OTP
        </Typography>
        <Typography variant="caption" color="neutral.500">
          Enter this 6-digit code sent to <br />
          {email}
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={field.value[i] || ''}
                  onChange={(e) => handleOtpChange(e, i)}
                  // onKeyDown={(e) => handleKeyDown(e, i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      if (!field.value[i] && i > 0) {
                        inputRefs.current[i - 1]?.focus()
                      } else {
                        const currentOtp = field.value.split('')
                        const newOtpArray = [...Array(6)].map(
                          (_, idx) => currentOtp[idx] || '',
                        )
                        newOtpArray[i] = ''
                        setValue('otp', newOtpArray.join(''), {
                          shouldValidate: true,
                        })
                      }
                    }
                  }}
                  onPaste={i === 0 ? handlePaste : undefined}
                  className="w-12 h-14 border border-gray-200 rounded-lg text-center text-2xl focus:outline-none focus:border-black transition-colors"
                />
              ))}

              <div className="w-4 h-0.5 bg-gray-200" />

              {[3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={field.value[i] || ''}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      if (!field.value[i] && i > 0) {
                        inputRefs.current[i - 1]?.focus()
                      } else {
                        const currentOtp = field.value.split('')
                        const newOtpArray = [...Array(6)].map(
                          (_, idx) => currentOtp[idx] || '',
                        )
                        newOtpArray[i] = ''
                        setValue('otp', newOtpArray.join(''), {
                          shouldValidate: true,
                        })
                      }
                    }
                  }}
                  className="w-12 h-14 border border-gray-200 rounded-lg text-center text-2xl focus:outline-none focus:border-black transition-colors"
                />
              ))}
            </div>
          )}
        />
        {errors.otp && (
          <Typography color="error" variant="caption">
            {errors.otp.message}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary">
          Resend code in{' '}
          {timer > 0 ? (
            <span className="font-bold text-black">{timer}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-bold text-black underline disabled:opacity-50"
            >
              {isResending ? 'Resending...' : 'Resend Code'}
            </button>
          )}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          disabled={isVerifying || !isValid || otpValue.length !== 6}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
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
