import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { PasswordInput } from '@/components/ui/password-input'
import { Letter, LockPassword } from '@solar-icons/react'

export const Invite = () => {
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

        <div className="space-y-4">
          <p className="text-xl font-semibold">Set Password</p>

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

            <PasswordInput
              hiddenLabel
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockPassword />
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
              size="medium"
              placeholder="******"
              label="Confirm New Password"
            />
          </div>
        </div>

        <Button variant="contained" color="primary" fullWidth size="large">
          Proceed
        </Button>
      </div>
    </div>
  )
}
