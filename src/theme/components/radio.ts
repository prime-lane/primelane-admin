import type { Components } from '@mui/material/styles'
import { colors } from '../colors'

export const MuiFormLabel: Components['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: colors.base.black,
      transform: 'none',
      position: 'static',
      marginBottom: '8px',
      '&.Mui-focused': {
        color: colors.base.black,
      },
    },
  },
}

export const MuiRadio: Components['MuiRadio'] = {
  styleOverrides: {
    root: {
      color: colors.base.black,
      '&.Mui-checked': {
        color: colors.base.black,
      },
      '&.Mui-disabled': {
        color: colors.neutral[400],
        opacity: 0.5,
      },
    },
  },
}

export const MuiFormControlLabel: Components['MuiFormControlLabel'] = {
  styleOverrides: {
    label: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: colors.neutral[700],
      '&.Mui-disabled': {
        color: colors.neutral[400],
      },
    },
    root: {
      '&.Mui-disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
}
