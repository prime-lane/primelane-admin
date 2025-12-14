import { Box, CircularProgress, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface LoadingStateProps {
  minHeight?: string | number
}

export const LoadingState = ({ minHeight = '400px' }: LoadingStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

interface ErrorStateProps {
  message?: string
  children?: ReactNode
}

export const ErrorState = ({
  message = 'Failed to load data',
  children,
}: ErrorStateProps) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" color="error">
        {children || message}
      </Typography>
    </Box>
  )
}
