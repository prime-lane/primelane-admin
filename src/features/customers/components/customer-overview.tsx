import { Card, CardContent } from '@mui/material'
import type { Customer } from '../types'
import type { CustomerStats } from '../api/use-customer-stats'
import { formatCurrency } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'

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

interface CustomerOverviewProps {
  customer: Customer
  stats?: CustomerStats
}

export const CustomerOverview = ({
  customer,
  stats,
}: CustomerOverviewProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold">Personal Info</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <DetailItem label="First Name" value={customer.first_name} />
          <DetailItem label="Last Name" value={customer.last_name} />
          <DetailItem
            label="Customer ID"
            value={customer.custom_user_id}
            copyable
          />
          <DetailItem label="Email Address" value={customer.email} />
          <DetailItem label="Phone Number" value={customer.phone_number} />
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
            label="Wallet Balance"
            value={formatCurrency(stats?.wallet_balance || 0)}
          />
          <TripSummaryCard
            label="Average Rating"
            value={stats?.average_rating || 0}
          />
          <TripSummaryCard label="Total amount spent" value="N/A" />
        </div>
      </div>
    </div>
  )
}
