import { Chip } from '@mui/material'
import { ShieldCheck } from '@solar-icons/react'

interface VerificationBadgeProps {
  verified: boolean
}

export const VerificationBadge = ({ verified }: VerificationBadgeProps) => {
  if (!verified) {
    return <span className="text-sm text-neutral-400">Not Verified</span>
  }

  return (
    <Chip
      icon={<ShieldCheck size={16} color="#22C55E" />}
      label="Verified"
      sx={{
        color: 'green.500',
        bgcolor: '#22C55E1A',
        fontWeight: 400,
        fontSize: '0.875rem',
        borderRadius: '0',
        py: 4,
      }}
    />
  )
}
