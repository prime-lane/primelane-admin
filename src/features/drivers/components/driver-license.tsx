import { InfoRow } from '@/components/ui/info-row'
import { ErrorState } from '@/components/ui/loading-error-states'
import { LicenseSkeleton } from '@/components/ui/tab-skeletons'
import { StatsCard } from '@/features/customers/components/stats-card'
import { useKycDetails } from '@/features/shared/api/use-users'
import { useParams } from 'react-router-dom'

export const DriverLicense = () => {
  const { id } = useParams<{ id: string }>()
  const { data: kyc, isLoading, error } = useKycDetails(id!)

  if (isLoading) return <LicenseSkeleton />
  if (error || !kyc)
    return <ErrorState message="Failed to load driver license details" />
  const driverLicenseData = kyc?.meta_data?.driver_license_verification

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Driver License Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            label="Driver License Number"
            value={kyc.driver_license_number || 'N/A'}
          />
          <StatsCard
            label="ID Verification Status"
            status={kyc.id_verification_status || 'N/A'}
          />
          <StatsCard
            label="Driver License Status"
            status={kyc?.driver_license_verification_status || 'N/A'}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Result from License</h3>
        <div className="flex flex-col gap-1">
          <InfoRow
            index={1}
            label="First Name"
            value={driverLicenseData?.firstname || 'N/A'}
          />
          <InfoRow
            index={2}
            label="Last Name"
            value={driverLicenseData?.lastname || 'N/A'}
          />
          <InfoRow
            index={3}
            label="Middle Name"
            value={driverLicenseData?.middlename || 'N/A'}
          />
          <InfoRow
            index={6}
            label="Date of Birth"
            value={driverLicenseData?.birthdate || 'N/A'}
          />
          <InfoRow
            index={5}
            label="Photo"
            value={driverLicenseData?.photo || 'N/A'}
            isImage
          />
          <InfoRow
            index={9}
            label="Issued Date"
            value={driverLicenseData?.issued_date || 'N/A'}
          />
          <InfoRow
            index={10}
            label="Expiry Date"
            value={driverLicenseData?.expiry_date || 'N/A'}
          />
          <InfoRow
            index={10}
            label="Gender"
            value={driverLicenseData?.gender || 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}
