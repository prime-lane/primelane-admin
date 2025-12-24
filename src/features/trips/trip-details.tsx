import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from './api/use-trips'
import { format } from 'date-fns'
import { ArrowRightUp as ExternalLink } from '@solar-icons/react'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { useEffect } from 'react'
import { CAR_CURSOR } from '@/config/dashboard'
import { TripDetailsSkeleton } from './components/skeletons'

interface DetailRowProps {
  label: string
  value: React.ReactNode
  isLink?: boolean
  linkTo?: string
}

const DetailRow = ({ label, value, isLink, linkTo }: DetailRowProps) => (
  <div className="flex items-center gap-4 border-b border-neutral-100 last:border-0">
    <span className="text-neutral-500 text-sm w-60 shrink-0">{label}</span>
    <div className="flex items-center gap-2">
      {isLink && linkTo ? (
        <Link to={linkTo} className="flex items-center gap-1 font-medium">
          <span className="text-sm text-black font-medium">{value}</span>
          <ExternalLink size={11} />
        </Link>
      ) : (
        <span className="font-medium text-neutral-900 text-sm">{value}</span>
      )}
    </div>
  </div>
)

export const TripDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: trip, isLoading, error } = useTrip(id!)

  useEffect(() => {
    const originalCursor = document.body.style.cursor
    document.body.style.cursor = CAR_CURSOR
    return () => {
      document.body.style.cursor = originalCursor
    }
  }, [])

  if (isLoading) return <TripDetailsSkeleton />
  if (error || !trip)
    return <ErrorState message="Failed to load trip details" />

  const riderName =
    `${trip.rider?.first_name || ''} ${trip.rider?.last_name || ''}`.trim() ||
    'N/A'
  const driverName =
    `${trip.driver?.first_name || ''} ${trip.driver?.last_name || ''}`.trim() ||
    'N/A'
  const vehicleCategory =
    trip.driver_vehicle?.type || trip.vehicle_category || 'N/A'

  return (
    <div className="space-y-9">
      <div>
        <AppBreadcrumbs
          items={[
            { label: 'Trips', to: path.DASHBOARD.TRIPS },
            {
              label: `Trip Details`,
              to: path.DASHBOARD.TRIP_DETAILS.replace(':id', id!),
            },
          ]}
        />

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Trip Details</span>
        </div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {/* Rider & Driver Info */}
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-sm font-bold text-neutral-600">
            Parties Involved
          </h3>
          <div className="flex flex-col gap-6">
            <DetailRow
              label="Rider name"
              value={riderName}
              isLink={!!trip.rider_id}
              linkTo={path.DASHBOARD.CUSTOMER_DETAILS.replace(
                ':id',
                trip.rider_id,
              )}
            />
            <DetailRow
              label="Driver Name"
              value={driverName}
              isLink={!!trip.driver_id}
              linkTo={
                trip.driver_id
                  ? path.DASHBOARD.DRIVER_DETAILS.replace(':id', trip.driver_id)
                  : undefined
              }
            />
          </div>
        </div>

        {/* Trip Info */}
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-sm font-semibold text-neutral-600">
            Trip Information
          </h3>
          <div className="flex flex-col gap-6">
            <DetailRow
              label="Trip Type"
              value={trip.ride_type === 'one_off' ? 'One Way' : trip.ride_type}
            />
            <DetailRow label="Vehicle Category" value={vehicleCategory} />
            <DetailRow
              label="Trip Status"
              value={<StatusBadge status={trip.status as any} />}
            />
            <DetailRow
              label="Trip Date"
              value={
                trip.created_at
                  ? format(new Date(trip.created_at), 'dd/MM/yyyy')
                  : '-'
              }
            />
          </div>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-sm font-semibold text-neutral-600">
            Location Details
          </h3>
          <div className="flex flex-col gap-6">
            <DetailRow
              label="Pickup address"
              value={trip.pickup?.address || '-'}
            />
            <DetailRow
              label="Drop off Address"
              value={trip.dropoff?.address || '-'}
            />
          </div>
        </div>

        {/* Financial Info */}
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-sm font-semibold text-neutral-600">
            Fare & Duration
          </h3>
          <div className="flex flex-col gap-6">
            <DetailRow
              label="Estimated fare"
              value={formatCurrency(trip.estimated_fare)}
            />
            <DetailRow
              label="Total trip time"
              value={formatDuration(
                trip.actual_duration || trip.estimated_duration,
              )}
            />
            <DetailRow
              label="Actual Fare"
              value={formatCurrency(trip.actual_fare)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
