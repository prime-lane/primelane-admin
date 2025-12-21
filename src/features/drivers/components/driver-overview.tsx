import { Card, CardContent } from '@mui/material'
import type { Driver } from '../types'
import type { UserRideStats } from '../types'

const DetailItem = ({
  label,
  value,
}: {
  label: string
  value: string | number | undefined | null
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-base font-semibold text-neutral-900">
        {value || 'N/A'}
      </p>
    </div>
  )
}

const TripSummaryCard = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-neutral-500 text-center">{label}</p>
          <p className="text-xl font-semibold text-center">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface DriverOverviewProps {
  driver: Driver
  stats?: UserRideStats
}

export const DriverOverview = ({ driver, stats }: DriverOverviewProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold">Personal Info</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <DetailItem label="First Name" value={driver.first_name} />
          <DetailItem label="Last Name" value={driver.last_name} />
          <DetailItem label="Driver ID" value={driver.id} />
          <DetailItem label="Email Address" value={driver.email} />
          <DetailItem label="Phone Number" value={driver.phone_number} />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold">Trip Summary</p>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          <TripSummaryCard
            label="Completed"
            value={stats?.total_accepted_rides || 0}
          />
          <TripSummaryCard
            label="Cancelled"
            value={stats?.total_cancelled_rides || 0}
          />
          <TripSummaryCard
            label="Average Rating"
            value={stats?.average_rating || 0}
          />
          <TripSummaryCard
            label="Acceptance Rate"
            value={stats?.acceptance_rate ? `${stats.acceptance_rate}%` : 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}
