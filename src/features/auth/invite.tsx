import { Button, TextField, Typography } from '@mui/material'
import { PasswordInput } from '@/components/ui/password-input'

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
            />

            <PasswordInput
              hiddenLabel
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
