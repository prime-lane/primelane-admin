import { StatsCard } from '@/features/customers/components/stats-card'

export const DriverLicense = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Driver License Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard label="License Number" value="N/A" />
          <StatsCard label="License Type" value="N/A" />
          <StatsCard label="Issue Date" value="N/A" />
          <StatsCard label="Expiry Date" value="N/A" />
          <StatsCard label="Verification Status" status="pending" />
        </div>
      </div>
    </div>
  )
}
