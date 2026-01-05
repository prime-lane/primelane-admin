import { Card, CardContent } from '@mui/material'
import type { Driver } from '../types'
import type { UserRideStats } from '../types'
import { CountUp } from '@/components/ui/count-up'
import { CopyButton } from '@/components/ui/copy-button'
import type { KycDetails } from '@/features/shared/types'
import { getCategoryNames } from '@/lib/utils'

const DetailItem = ({
  label,
  value,
  copyable = false,
}: {
  label: string
  value: string | number | undefined | null
  copyable?: boolean
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <p className="text-sm text-neutral-500">{label}</p>
      <div className="flex items-center gap-1">
        <p className="text-base font-semibold text-neutral-900">
          {value || 'N/A'}
        </p>
        {copyable && value && <CopyButton textToCopy={String(value)} />}
      </div>
    </div>
  )
}

const TripSummaryCard = ({
  label,
  value,
  isValue = true,
}: {
  label: string
  value: string | number
  isValue?: boolean
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-neutral-500 text-center">{label}</p>
          <div className="text-xl font-semibold text-center text-neutral-900">
            {isValue ? <CountUp value={value} /> : value}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DriverOverviewProps {
  driver: Driver
  stats?: UserRideStats
  kyc?: KycDetails
}

export const DriverOverview = ({ driver, stats, kyc }: DriverOverviewProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold">Personal Info</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <DetailItem label="First Name" value={driver.first_name} />
          <DetailItem label="Last Name" value={driver.last_name} />
          <DetailItem label="Date of Birth" value={kyc?.dob || 'N/A'} />
          <DetailItem label="Email Address" value={driver.email} />
          <DetailItem label="Phone Number" value={driver.phone_number} />
          <DetailItem
            label="Residential address"
            value={kyc?.residential_address}
          />
          <DetailItem
            label="Driver ID"
            value={driver.custom_user_id}
            copyable
          />
          <DetailItem
            label="Vehicle Categories"
            value={getCategoryNames(driver.category_ids)}
          />
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
            isValue={!!stats?.acceptance_rate}
          />
        </div>
      </div>
    </div>
  )
}
