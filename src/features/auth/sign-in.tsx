import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { Letter, LockPassword } from '@solar-icons/react'
import { PasswordInput } from '@/components/ui/password-input'
import { useNavigate } from 'react-router-dom'
import { path } from '@/app/paths'

export const SignIn = () => {
  const navigate = useNavigate()
  
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

      <div className="flex flex-col gap-4">
        <TextField
          hiddenLabel
          fullWidth
          size="medium"
          label="Email"
          placeholder="exodustimothy@gmail.com"
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
            hiddenLabel
            fullWidth
            size="medium"
            placeholder="******"
            label="Enter New Password"
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
          <a className="text-base text-right text-black underline" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
      <Button variant="contained" color="primary" fullWidth onClick={() => navigate(path.DASHBOARD.ROOT)}>
        Login
      </Button>
    </div>
  )
}
