import { Card, CardContent } from '@mui/material'
import { StatusBadge, type StatusVariant } from '@/components/ui/status-badge'

interface StatsCardProps {
  label: string
  value?: string | number
  status?: StatusVariant
}

export const StatsCard = ({ label, value, status }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <span className="text-sm text-neutral-500 font-normal">{label}</span>
        {status ? (
          <StatusBadge status={status} />
        ) : (
          <span className="text-xl font-semibold text-black">{value || 'N/A'}</span>
        )}
      </CardContent>
    </Card>
  )
}
