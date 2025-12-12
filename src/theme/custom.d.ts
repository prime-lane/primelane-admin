import { Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      opacity: Record<string, number>
      backdropBlur: Record<string, string>
    }
  }
  interface ThemeOptions {
    custom?: {
      opacity?: Record<string, number>
      backdropBlur?: Record<string, string>
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true
    text: true,
    filled: true,
  }
}
