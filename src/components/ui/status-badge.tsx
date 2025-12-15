import { Chip, type ChipProps } from '@mui/material'

export type StatusVariant =
  | 'active'
  | 'pending'
  | 'deactivated'
  | 'completed'
  | 'cancelled'
  | 'started'
  | 'accepted'
  | 'verified'

interface StatusBadgeProps {
  status: StatusVariant
  sx?: ChipProps['sx']
}

const statusConfig: Record<
  StatusVariant,
  { label: string; color: string; bgcolor: string }
> = {
  active: {
    label: 'Active',
    color: 'green.400',
    bgcolor: '#22C55E1A',
  },
  pending: {
    label: 'Pending',
    color: 'orange.400',
    bgcolor: '#F973161A',
  },
  deactivated: {
    label: 'Deactivated',
    color: 'red.500',
    bgcolor: '#EF44441A',
  },
  completed: {
    label: 'Completed',
    color: 'green.400',
    bgcolor: '#22C55E1A',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red.500',
    bgcolor: '#EF44441A',
  },
  started: {
    label: 'On trip',
    color: 'blue.400',
    bgcolor: '#3B82F61A',
  },
  accepted: {
    label: 'Accepted',
    color: 'purple.400',
    bgcolor: '#A855F71A',
  },
  verified: {
    label: 'Verified',
    color: 'green.400',
    bgcolor: '#22C55E1A',
  },
}

export const StatusBadge = ({ status, sx }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.pending // Fallback to pending if invalid

  return (
    <Chip
      label={config.label}
      sx={{
        color: config.color,
        bgcolor: config.bgcolor,
        fontSize: '0.875rem',
        py: 1,
        px: 0,
        borderRadius: 0,
        width: 'fit-content',
        fontWeight: 500,
        ...sx,
      }}
    />
  )
}
