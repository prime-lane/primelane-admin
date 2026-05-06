import type { Components } from '@mui/material/styles'
import { colors } from '../colors'

export const MuiCheckbox: Components['MuiCheckbox'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      color: colors.neutral[400],
      '&.Mui-checked': {
        color: colors.base.black,
      },
    },
  },
}
