import { InfoRow } from '@/components/ui/info-row'
import { ErrorState } from '@/components/ui/loading-error-states'
import type { StatusVariant } from '@/components/ui/status-badge'
import { IdentitySkeleton } from '@/components/ui/tab-skeletons'
import { useKycDetails } from '@/features/shared/api/use-users'
import { useUserRideStats } from '../api/use-customers'
import type { Customer } from '../types'
import { StatsCard } from './stats-card'

interface IdentityDetailsProps {
  customer: Customer
}

export const IdentityDetails = ({ customer }: IdentityDetailsProps) => {
  const { data: kycDetails, isLoading, error } = useKycDetails(customer.id)
  const { data: rideStats } = useUserRideStats(customer.id)

  if (isLoading) return <IdentitySkeleton />
  if (error || !kycDetails)
    return <ErrorState message="Failed to load KYC details" />

  const ninData = kycDetails.meta_data?.nin_verification

  return (
    <div className="space-y-8">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="NIN"
          value={ninData?.nin || 'N/A'}
        />
        <StatsCard
          label="ID Verification Status"
          status={customer.is_kyc_complete ? 'true' : 'false'}
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
              ninData?.first_name || 'N/A'
            }
          />
          <InfoRow
            index={2}
            label="Last Name"
            value={
              ninData?.last_name || 'N/A'
            }
          />
          <InfoRow
            index={3}
            label="Middle Name"
            value={ninData?.middle_name || 'N/A'}
          />
          <InfoRow index={4} label="Gender" value={ninData?.gender || 'N/A'} />
          <InfoRow
            index={5}
            label="Photo"
            value={ninData?.image || 'N/A'}
            isImage
          />
          <InfoRow
            index={6}
            label="Date of Birth"
            value={ninData?.date_of_birth || 'N/A'}
          />
          {/* <InfoRow index={7} label="Email Address" value={customer.email} /> */}
          <InfoRow
            index={8}
            label="Phone Number"
            value={ninData?.phone_number || 'N/A'}
          />
          <InfoRow
            index={9}
            label="Employment Status"
            value={ninData?.employment_status || 'N/A'}
          />
          <InfoRow
            index={10}
            label="Marital Status"
            value={ninData?.marital_status || 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}
