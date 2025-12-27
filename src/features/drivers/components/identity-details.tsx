import { ErrorState } from '@/components/ui/loading-error-states'
import { Avatar, Dialog, DialogContent, IconButton } from '@mui/material'
import { ArrowRightUp, CloseCircle } from '@solar-icons/react'
import { useState } from 'react'
import { useDriverStats } from '../api/use-drivers'
import type { Driver } from '../types'
import { StatsCard } from '@/features/customers/components/stats-card'
import type { StatusVariant } from '@/components/ui/status-badge'
import type { KycDetails } from '@/features/shared/types'
import { IdentitySkeleton } from '@/components/ui/tab-skeletons'
import { InfoRow } from '@/components/ui/info-row'

interface IdentityDetailsProps {
  driver: Driver
  kycDetails: KycDetails | undefined
  isLoading?: boolean
}

export const IdentityDetails = ({
  driver,
  kycDetails,
  isLoading,
}: IdentityDetailsProps) => {
  const { data: rideStats } = useDriverStats(driver.id)

  if (isLoading) return <IdentitySkeleton />
  if (!kycDetails) return <ErrorState message="Failed to load KYC details" />

  const ninData = kycDetails.meta_data?.nin_verification || ({} as any)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard label="NIN" value={ninData.nin || 'N/A'} />
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
          label="Acceptance Rate"
          value={
            rideStats?.acceptance_rate ? `${rideStats.acceptance_rate}%` : 'N/A'
          }
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Result from NIN</h3>
        <div className="flex flex-col gap-1">
          <InfoRow
            index={1}
            label="First Name"
            value={ninData.first_name || driver.first_name}
          />
          <InfoRow
            index={2}
            label="Last Name"
            value={ninData.last_name || driver.last_name}
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
            value={ninData.image || 'N/A'}
            isImage
          />
          <InfoRow
            index={6}
            label="Date of Birth"
            value={ninData.dob || 'N/A'}
          />
          {/* <InfoRow index={7} label="Email Address" value={"N/A"} /> */}
          <InfoRow
            index={8}
            label="Phone Number"
            value={ninData.mobile || 'N/A'}
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
