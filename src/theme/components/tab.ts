import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiTab: Components<Theme>['MuiTab'] = {
    styleOverrides: {
        root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            color: colors.gray[500],
            '&.Mui-selected': {
                color: colors.base.black,
            },
        },
    },
    variants: [
        {
            props: { variant: 'filled' },
            style: {
                borderRadius: '8px',
                border: `1px solid ${colors.gray[300]}`,
                backgroundColor: colors.base.white,
                color: colors.gray[500],
                minHeight: '40px',
                '&.Mui-selected': {
                    backgroundColor: colors.base.black,
                    color: colors.base.white,
                    border: `1px solid ${colors.base.black}`,
                },



            },
        },
        {
            props: { variant: 'standard' },
            style: {
                backgroundColor: colors.base.white,
                color: colors.gray[500],
                minHeight: '40px',
                border: 'none',
                '&.Mui-selected': {
                    color: colors.base.black,
                    borderBottom: `1.5px solid ${colors.base.black}`,
                },
            },
        },
    ],
}

export const MuiTabs: Components<Theme>['MuiTabs'] = {
    styleOverrides: {
        indicator: {
            display: 'none',
        },
    },
}
