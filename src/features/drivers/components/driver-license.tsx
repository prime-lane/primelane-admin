import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { StatsCard } from '@/features/customers/components/stats-card'
import { useKycDetails } from '@/features/shared/api/use-users'
import { useParams } from 'react-router-dom'

export const DriverLicense = () => {
  const { id } = useParams<{ id: string }>()
  const { data: kyc, isLoading, error } = useKycDetails(id!)

  if (isLoading) return <LoadingState />
  if (error || !kyc)
    return <ErrorState message="Failed to load driver license details" />

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Driver License Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            label="License Number"
            value={kyc.driver_license_number || 'N/A'}
          />
          <StatsCard label="License Type" value="N/A" />
          <StatsCard label="Issue Date" value="N/A" />
          <StatsCard
            label="Expiry Date"
            value={kyc.driver_license_expiry_date || 'N/A'}
          />
          <StatsCard
            label="Verification Status"
            status={kyc.driver_license_verification_status}
          />
        </div>
      </div>
    </div>
  )
}
