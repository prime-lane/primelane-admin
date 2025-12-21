import type { Components, Theme } from '@mui/material'

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
    styleOverrides: {
        notchedOutline: {
            '& legend': {
                width: 0,
            },
        },
        root: {
            '& legend': {
                width: 0,
            },
        },
    },
}
