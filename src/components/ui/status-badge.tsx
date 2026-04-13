import { Chip, type ChipProps } from '@mui/material'

export type TripStatus = 'SCHEDULED' | 'COMPLETED'
export type StatusVariant =
  | 'active'
  | 'pending'
  | 'inactive'
  | 'deactivated'
  | 'completed'
  | 'cancelled'
  | 'started'
  | 'accepted'
  | 'verified'
  | 'true'
  | 'false'

  // driver status
  | 'PENDING_VERIFICATION'
  | TripStatus

interface StatusBadgeProps {
  status: StatusVariant
  sx?: ChipProps['sx']
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        color: 'green.400',
        bgcolor: '#22C55E1A',
      }
    case 'pending':
      return {
        label: 'Pending',
        color: 'orange.400',
        bgcolor: '#F973161A',
      }
    case 'inactive':
    case 'deactivated':
      return {
        label: 'Deactivated',
        color: 'red.500',
        bgcolor: '#EF44441A',
      }
    case 'completed':
    case 'COMPLETED':
      return {
        label: 'Completed',
        color: 'green.400',
        bgcolor: '#22C55E1A',
      }
    case 'true':
      return {
        label: 'COMPLETE',
        color: 'green.400',
        bgcolor: '#22C55E1A',
      }
    case 'false':
      return {
        label: 'INCOMPLETE',
        color: 'red.500',
        bgcolor: '#EF44441A',
      }
    case 'cancelled':
      return {
        label: 'Cancelled',
        color: 'red.500',
        bgcolor: '#EF44441A',
      }
    case 'started':
      return {
        label: 'On trip',
        color: 'blue.400',
        bgcolor: '#3B82F61A',
      }
    case 'accepted':
      return {
        label: 'Accepted',
        color: 'purple.400',
        bgcolor: '#A855F71A',
      }
    case 'verified':
      return {
        label: 'Verified',
        color: 'green.400',
        bgcolor: '#22C55E1A',
      }
    case 'PENDING_VERIFICATION':
      return {
        label: 'Pending Verification',
        color: 'orange.400',
        bgcolor: '#F973161A',
      }
    case 'SCHEDULED':
      return {
        label: 'Scheduled',
        color: 'blue.400',
        bgcolor: '#3B82F61A',
      }
    default:
      return {
        label: status || 'N/A',
        color: 'neutral.500',
        bgcolor: 'neutral.100',
      }
  }
}

export const StatusBadge = ({ status, sx }: StatusBadgeProps) => {
  const config = getStatusConfig(status)

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
