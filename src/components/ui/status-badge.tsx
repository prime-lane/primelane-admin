import { Chip, type ChipProps } from '@mui/material'

export type StatusVariant = 'active' | 'pending' | 'deactivated'

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
}

export const StatusBadge = ({ status, sx }: StatusBadgeProps) => {
  const config = statusConfig[status]

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
        width:'fit-content',
        ...sx,
      }}
    />
  )
}
