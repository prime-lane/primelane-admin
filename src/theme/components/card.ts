import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiCard: Components<Theme>['MuiCard'] = {
    styleOverrides: {
        root: {
            borderRadius: '0',
            boxShadow: 'none',
            backgroundColor: colors.neutral[50],
            border: 0,
        },
    },
}

export const MuiCardContent: Components<Theme>['MuiCardContent'] = {
    styleOverrides: {
        root: {
            padding: '24px',
            '&:last-child': {
                paddingBottom: '24px',
            },
        },
    },
}
