import { Button, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from '../../app/paths'

export const Otp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)

    // Focus the input after the pasted content
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleLogin = () => {
    // Navigate to dashboard or handle login logic
    navigate(path.DASHBOARD.ROOT)
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
          exodustimothy@gmail.com
        </Typography>
      </div>

      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="text"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(e.target, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
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
            value={otp[i]}
            onChange={(e) => handleChange(e.target, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-12 h-14 border border-gray-200 rounded-lg text-center text-2xl focus:outline-none focus:border-black transition-colors"
          />
        ))}
      </div>

      <Typography variant="body2" color="textSecondary">
        Resend code in <span className="font-bold text-black">32s</span>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleLogin}
      >
        Log In
      </Button>
    </div>
  )
}
