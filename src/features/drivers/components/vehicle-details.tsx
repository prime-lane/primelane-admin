import { StatsCard } from '@/features/customers/components/stats-card'

export const VehicleDetails = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard label="Vehicle Make" value="N/A" />
          <StatsCard label="Vehicle Model" value="N/A" />
          <StatsCard label="Year" value="N/A" />
          <StatsCard label="License Plate" value="N/A" />
          <StatsCard label="Color" value="N/A" />
          <StatsCard label="Vehicle Category" value="N/A" />
        </div>
      </div>
    </div>
  )
}
