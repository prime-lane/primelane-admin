import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '0',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '1rem',
      height: '48px',
      boxShadow: 'none',
      borderWidth: '1.3px',
      '&:hover': {
        boxShadow: 'none',
      },
      '&.Mui-disabled': {
        backgroundColor: '#888888',
        color: colors.gray[300],
      },
    },
  },
  variants: [
    // contained
    {
      props: { variant: 'contained', color: 'primary' },
      style: {
        backgroundColor: colors.base.black,
        color: '#ffffff',
        '&:hover': {
          backgroundColor: colors.neutral[500],
        },
      },
    },

    // outlined
    {
      props: { variant: 'outlined', color: 'primary' },
      style: {
        backgroundColor: colors.base.white,
        color: colors.base.black,
        '&:hover': {
          backgroundColor: colors.zinc[200],
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        borderColor: colors.base.black,
        color: colors.base.black,
        '&:hover': {
          backgroundColor: colors.zinc[200],
          borderColor: colors.base.black,
        },
      },
    },
    // text
    {
      props: { variant: 'text' },
      style: {
        color: colors.base.black,
        backgroundColor: colors.base.white,
        '&:hover': {
          backgroundColor: colors.neutral[100],
        },
      },
    },
    // ghost
    {
      props: { variant: 'ghost' },
      style: {
        backgroundColor: colors.gray[100],
        color: colors.neutral[500],
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    // filled
    {
      props: { variant: 'filled' },
      style: {
        backgroundColor: colors.gray[300],
        color: colors.grey[800],
      },
    },
    {
      props: { variant: 'filled', color: 'primary' },
      style: {
        backgroundColor: colors.base.black,
        color: '#ffffff',
      },
    },
    {
      props: { variant: 'filled', color: 'info' },
      style: {
        backgroundColor: '#1890FF',
        color: '#ffffff',
      },
    },
    {
      props: { variant: 'filled', color: 'success' },
      style: {
        backgroundColor: '#54D62C',
        color: colors.grey[800],
      },
    },
    {
      props: { variant: 'filled', color: 'warning' },
      style: {
        backgroundColor: '#FFC107',
        color: colors.grey[800],
      },
    },
    {
      props: { variant: 'filled', color: 'error' },
      style: {
        backgroundColor: '#FF4081',
        color: colors.grey[800],
      },
    },
  ],
}
