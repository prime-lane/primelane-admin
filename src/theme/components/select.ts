import type { Components, Theme } from '@mui/material'

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
    styleOverrides: {
        notchedOutline: {
            '& legend': {
                width: 0,
            },
        },
        root: {
            fontSize: '1rem',
            color: 'neutral.500',
            '& legend': {
                width: 0,
            },
        },
    },
}
