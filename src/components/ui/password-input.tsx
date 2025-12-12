import { type ComponentProps, useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Eye, EyeClosed } from '@solar-icons/react'

type PasswordInputProps = ComponentProps<typeof TextField>

export const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
