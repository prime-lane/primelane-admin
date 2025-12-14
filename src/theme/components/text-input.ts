import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiTextField: Components<Theme>['MuiTextField'] = {
    styleOverrides: {
        root: {
            '& .MuiFormHelperText-root': {
                margin: 0,
                marginTop: '2px',
                fontSize: '12px',
                color: colors.red[100]
            },
        },
    },
    variants: [
        {
            props: { variant: 'outlined' },
            style: {
                '& .MuiOutlinedInput-root': {
                    color: colors.neutral[500],
                    fontSize: '1rem',
                    fontWeight: 400,
                    borderRadius: '0',
                    padding: '12px 16px',
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    // alignItems: 'center',
                    backgroundColor: colors.base.white,
                    '& fieldset': {
                        borderColor: colors.gray[200],
                    },
                    '&:hover fieldset': {
                        borderColor: colors.gray[300],
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: colors.stone[400],
                        borderWidth: '1.3px',
                    },
                    '& legend': {
                        width: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline legend': {
                        width: 0,
                    },
                },
            },
        },
        {
            props: { variant: 'outlined', size: 'small' },
            style: {
                '& .MuiOutlinedInput-root': {
                    height: '32px',
                    padding: '0',
                },
            },
        },
        {
            props: { variant: 'outlined', size: 'medium' },
            style: {
                '& .MuiOutlinedInput-root': {
                    height: '48px',
                    padding: '12px 16px',
                },
            },
        },
    ],
}

export const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
    styleOverrides: {
        root: {
            fontSize: '1rem',
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
