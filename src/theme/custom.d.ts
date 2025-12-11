// theme/custom.d.ts
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
