import type { Components, Theme } from '@mui/material'

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '6px',
      textTransform: 'none',
      fontWeight: 500,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    },
  },
  variants: [
    {
      props: { variant: 'contained', color: 'primary' }, 
      style: {
        backgroundColor: '#000000', 
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#424242', 
        },
      },
    },
    {
      props: { variant: 'contained', color: 'secondary' },
      style: {
        backgroundColor: '#9e9e9e', 
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#757575', 
        },
      },
    },
    {
      props: { variant: 'outlined' }, 
      style: {
        borderColor: '#e0e0e0', 
        color: '#212121', 
        '&:hover': {
          backgroundColor: '#f5f5f5', 
          borderColor: '#bdbdbd', 
        },
      },
    },
    {
      props: { variant: 'text' }, 
      style: {
        color: '#212121', 
        '&:hover': {
          backgroundColor: '#f5f5f5', 
        },
      },
    },
  ],
}
