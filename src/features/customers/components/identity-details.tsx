import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { Avatar } from '@mui/material'
import { ArrowRightUp } from '@solar-icons/react'
import { useKycDetails } from '@/features/shared/api/use-users'
import { useUserRideStats } from '../api/use-customers'
import type { Customer } from '../types'
import { StatsCard } from './stats-card'
import type { StatusVariant } from '@/components/ui/status-badge'

interface IdentityDetailsProps {
  customer: Customer
}

const InfoRow = ({
  index,
  label,
  value,
  isImage = false,
}: {
  index: number
  label: string
  value: string | React.ReactNode
  isImage?: boolean
}) => {
  return (
    <div className="flex items-center py-3 gap-4">
      <span className="text-neutral-500 text-sm w-4">{index}.</span>
      <span className="text-neutral-500 text-sm w-40">{label}</span>
      <span className="text-neutral-500 text-sm font-semibold">-</span>
      {isImage && typeof value === 'string' ? (
        <div className="flex items-end">
          <Avatar src={value} sx={{ width: 20, height: 20 }} />
          <ArrowRightUp size={11} className="text-neutral-500 cursor-pointer" />
        </div>
      ) : (
        <span className="text-neutral-900 text-sm font-semibold">
          {value as React.ReactNode}
        </span>
      )}
    </div>
  )
}

export const IdentityDetails = ({ customer }: IdentityDetailsProps) => {
  const { data: kycDetails, isLoading, error } = useKycDetails(customer.id)
  const { data: rideStats } = useUserRideStats(customer.id)

  if (isLoading) return <LoadingState />
  if (error || !kycDetails)
    return <ErrorState message="Failed to load KYC details" />

  const ninData = kycDetails.meta_data?.nin_verification || ({} as any)

  return (
    <div className="space-y-8">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="NIN"
          value={ninData.nin || kycDetails.id_number || 'N/A'}
        />
        <StatsCard
          label="ID Verification Status"
          status={kycDetails.id_verification_status as StatusVariant}
        />
        <StatsCard
          label="Face Match Score"
          value={
            kycDetails.selfie_confidence
              ? `${kycDetails.selfie_confidence}%`
              : 'N/A'
          }
        />
      </div>

      {/* Ride Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Total Rides"
          value={rideStats?.total_rides?.toString() || '0'}
        />
        <StatsCard
          label="Rating"
          value={rideStats?.average_rating?.toString() || 'N/A'}
        />
        <StatsCard
          label="Completion Rate"
          value={
            rideStats?.acceptance_rate ? `${rideStats.acceptance_rate}%` : 'N/A'
          }
        />
      </div>

      {/* Details List Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Result from NIN</h3>
        <div className="flex flex-col gap-1">
          <InfoRow
            index={1}
            label="First Name"
            value={
              ninData.first_name || kycDetails.first_name || customer.first_name
            }
          />
          <InfoRow
            index={2}
            label="Last Name"
            value={
              ninData.last_name || kycDetails.last_name || customer.last_name
            }
          />
          <InfoRow
            index={3}
            label="Middle Name"
            value={ninData.middle_name || 'N/A'}
          />
          <InfoRow index={4} label="Gender" value={ninData.gender || 'N/A'} />
          <InfoRow
            index={5}
            label="Photo"
            value={ninData.image || kycDetails.selfie_image || ''}
            isImage
          />
          <InfoRow
            index={6}
            label="Date of Birth"
            value={ninData.dob || kycDetails.dob}
          />
          <InfoRow index={7} label="Email Address" value={customer.email} />
          <InfoRow
            index={8}
            label="Phone Number"
            value={ninData.mobile || customer.phone_number}
          />
          <InfoRow
            index={9}
            label="Employment Status"
            value={ninData.employment_status || 'N/A'}
          />
          <InfoRow
            index={10}
            label="Marital Status"
            value={ninData.marital_status || 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}
