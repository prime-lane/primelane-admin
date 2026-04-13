import { ErrorState } from '@/components/ui/loading-error-states'
import { VehicleSkeleton } from '@/components/ui/tab-skeletons'
import { StatsCard } from '@/features/customers/components/stats-card'
import { FileCard } from '@/components/ui/file-card'
import { useDriverVehicle } from '../api/use-drivers'

interface VehicleDetailsProps {
  driverId: string
  isVehicleSet?: boolean
}

export const VehicleDetails = ({
  driverId,
  isVehicleSet,
}: VehicleDetailsProps) => {
  const {
    data: vehicle,
    isLoading,
    error,
  } = useDriverVehicle(driverId, { enabled: isVehicleSet })

  if (!isVehicleSet) return <ErrorState message="No vehicle found." />

  if (isLoading) return <VehicleSkeleton />
  if (error) return <ErrorState message="Failed to load vehicle details." />
  if (!vehicle) return <ErrorState message="No vehicle details found." />

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard label="Make" value={vehicle?.make} />
          <StatsCard label="Model" value={vehicle?.model} />
          <StatsCard label="Color" value={vehicle?.color} />
          <StatsCard label="Year" value={vehicle?.year.toString()} />
          <StatsCard label="Plate Number" value={vehicle?.plate_number} />
          <StatsCard label="Vehicle VIN/Chassis no." value={vehicle.vin} />
          {/* <StatsCard label="Color" value={vehicle.color} /> */}
          {/* <StatsCard label="Vehicle Category" value={vehicle.type} /> */}
          {/* <StatsCard label="Mileage" value={vehicle.mileage} /> */}
          {/* <StatsCard
            label="Status"
            status={vehicle.status === 'active' ? 'active' : 'pending'}
          /> */}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Vehicle Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FileCard
            label="Front View"
            url={vehicle.front_image}
            onUpload={(files) => console.log('Upload Front View', files)}
          />
          <FileCard
            label="Back View"
            url={vehicle.back_image}
            onUpload={(files) => console.log('Upload Back View', files)}
          />
          <FileCard
            label="Side View"
            url={vehicle.side_image}
            onUpload={(files) => console.log('Upload Side View', files)}
          />
          <FileCard
            label="Road Worthiness"
            url={vehicle?.road_worthiness?.doc}
            onUpload={(files) => console.log('Upload Road Worthiness', files)}
          />
          <FileCard
            label="Vehicle Insurance"
            url={vehicle?.vehicle_insurance?.doc}
            onUpload={(files) => console.log('Upload Vehicle Insurance', files)}
          />
        </div>
      </div>
    </div>
  )
}
