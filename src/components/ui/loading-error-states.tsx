import { Box, CircularProgress } from '@mui/material'
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
      <p className="text-base text-red-500">{children || message}</p>
    </Box>
  )
}
