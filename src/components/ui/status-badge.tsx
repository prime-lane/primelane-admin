import { capitalize } from '@/lib/utils'

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
  | 'PENDING_VERIFICATION'
  | TripStatus

interface StatusBadgeProps {
  status: StatusVariant
}

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return { label: 'Active', color: '#16A34A', bgcolor: '#22C55E1A' }
    case 'pending':
      return { label: 'Pending', color: '#EA580C', bgcolor: '#FFF7ED' }
    case 'inactive':
    case 'deactivated':
      return { label: 'Deactivated', color: '#DC2626', bgcolor: '#EF44441A' }
    case 'completed':
      return { label: 'Completed', color: '#16A34A', bgcolor: '#22C55E1A' }
    case 'true':
      return { label: 'Complete', color: '#16A34A', bgcolor: '#22C55E1A' }
    case 'false':
      return { label: 'Incomplete', color: '#DC2626', bgcolor: '#EF44441A' }
    case 'cancelled':
      return { label: 'Cancelled', color: '#DC2626', bgcolor: '#FEF2F2' }
    case 'started':
      return { label: 'On trip', color: '#2563EB', bgcolor: '#3B82F61A' }
    case 'accepted':
      return { label: 'Accepted', color: '#9333EA', bgcolor: '#A855F71A' }
    case 'verified':
      return { label: 'Verified', color: '#16A34A', bgcolor: '#22C55E1A' }
    case 'pending_verification':
      return {
        label: 'Pending Verification',
        color: '#EA580C',
        bgcolor: '#FFF7ED',
      }
    case 'scheduled':
      return { label: 'Scheduled', color: '#2563EB', bgcolor: '#3B82F61A' }
    default:
      return { label: status || 'N/A', color: '#6B7280', bgcolor: '#F3F4F6' }
  }
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = getStatusConfig(status)
  const label = capitalize(config.label)

  return (
    <span
      style={{
        backgroundColor: config.bgcolor,
        color: config.color,
        fontSize: '0.875rem',
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'inline-block',
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  )
}
