import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from './api/use-trips'
import { format } from 'date-fns'
import { ArrowRightUp as ExternalLink } from '@solar-icons/react'
import { formatCurrency, formatDuration, fromKobo } from '@/lib/utils'
import { useEffect } from 'react'
import { useCategoryName } from '@/features/pricing-config/hooks/use-category-name'
import { CAR_CURSOR } from '@/config/dashboard'
import { TripDetailsSkeleton } from './components/skeletons'
import type { Slot } from './types'

interface DetailRowProps {
  label: string
  value: React.ReactNode
  isLink?: boolean
  linkTo?: string
  bold?: boolean
  indent?: boolean
}

const DetailRow = ({
  label,
  value,
  isLink,
  linkTo,
  bold,
  indent,
}: DetailRowProps) => (
  <div
    className={`flex items-center gap-4 border-b border-neutral-100 last:border-0 ${indent ? 'pl-4' : ''}`}
  >
    <span
      className={`text-neutral-500 text-sm w-60 shrink-0 ${bold ? 'font-semibold text-neutral-900' : ''}`}
    >
      {label}
    </span>
    <div className="flex items-center gap-2">
      {isLink && linkTo ? (
        <Link to={linkTo} className="flex items-center gap-1 font-medium">
          <span className="text-sm text-black font-medium">{value}</span>
          <ExternalLink size={11} />
        </Link>
      ) : (
        <span
          className={`text-sm ${bold ? 'font-bold text-neutral-900' : 'font-medium text-neutral-900'}`}
        >
          {value}
        </span>
      )}
    </div>
  </div>
)

const rideTypeLabel: Record<string, string> = {
  one_off: 'Airport Transfer',
  airport_transfer: 'Airport Transfer',
  daily: 'Daily Rental',
  daily_rental: 'Daily Rental',
  fleet: 'Fleet Rental',
  fleet_rental: 'Fleet Rental',
  hourly: 'Hourly',
}

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

  const { getCategoryName } = useCategoryName()

  if (isLoading) return <TripDetailsSkeleton />
  if (error || !trip)
    return <ErrorState message="Failed to load trip details" />

  const riderName =
    `${trip.rider?.first_name || ''} ${trip.rider?.last_name || ''}`.trim() ||
    'N/A'

  const vehicleCategory =
    trip.vehicle_category ||
    trip.driver_vehicle?.category_ids
      ?.map((cid) => getCategoryName(cid))
      .filter((n) => n !== 'N/A')
      .join(', ') ||
    'N/A'

  const bookingType = trip.ride_type
    ? (rideTypeLabel[trip.ride_type] ?? trip.ride_type)
    : 'N/A'

  const pickupDateTime =
    trip.scheduled_at ?? trip.pickup_time ?? trip.created_at
  const endDate = trip.end_time

  const slots: Slot[] = trip.slots ?? []

  return (
    <div className="space-y-9">
      <div>
        <AppBreadcrumbs
          items={[
            { label: 'Trips', to: path.DASHBOARD.TRIPS },
            {
              label: 'Trip Details',
              to: path.DASHBOARD.TRIP_DETAILS.replace(':id', id!),
            },
          ]}
        />
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Trip Details</span>
        </div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {/* Overview */}
        <div className="flex flex-col gap-6">
          <DetailRow label="Trip ID" value={trip.custom_ride_id || id} />
          <DetailRow
            label="Trip Status"
            value={<StatusBadge status={trip.status as any} />}
          />
          <DetailRow label="Booking Type" value={bookingType} />
          <DetailRow
            label="Customer name"
            value={riderName}
            isLink={!!trip.rider_id}
            linkTo={path.DASHBOARD.CUSTOMER_DETAILS.replace(
              ':id',
              trip.rider_id,
            )}
          />
          {trip.no_of_vehicles != null && (
            <DetailRow label="No. of Vehicles" value={trip.no_of_vehicles} />
          )}
          <DetailRow label="Vehicle Category" value={vehicleCategory} />
        </div>

        {/* Drivers & Vehicles */}
        {slots.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            <h3 className="text-sm font-bold text-neutral-600">
              Drivers &amp; Vehicles
            </h3>
            <div className="flex flex-col gap-4">
              {slots.map((slot: Slot) => {
                const driverName = slot.driver
                  ? `${slot.driver.first_name} ${slot.driver.last_name}`
                  : 'N/A'
                const v = slot.driver_vehicle
                const vehicleDesc = v
                  ? `${v.make ?? ''} ${v.model ?? ''} ${v.year ?? ''}, ${v.color ?? ''}`.trim()
                  : 'N/A'
                const plate = v?.plate_number ?? ''
                return (
                  <div
                    key={slot.id}
                    className="flex items-start gap-4 border-b border-neutral-100 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="w-60 shrink-0">
                      <Link
                        to={path.DASHBOARD.DRIVER_DETAILS.replace(
                          ':id',
                          slot.driver_id,
                        )}
                        className="flex items-center gap-1 font-medium text-sm text-black"
                      >
                        {driverName}
                        <ExternalLink size={11} />
                      </Link>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-neutral-900">
                        {vehicleDesc}
                      </span>
                      {plate && (
                        <span className="text-xs text-neutral-500">
                          {plate}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Single driver fallback (non-fleet trips) */}
        {slots.length === 0 && trip.driver && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold text-neutral-600">
              Driver &amp; Vehicle
            </h3>
            <DetailRow
              label="Driver Name"
              value={`${trip.driver.first_name} ${trip.driver.last_name}`}
              isLink={!!trip.driver_id}
              linkTo={
                trip.driver_id
                  ? path.DASHBOARD.DRIVER_DETAILS.replace(':id', trip.driver_id)
                  : undefined
              }
            />
            {trip.driver_vehicle && (
              <DetailRow
                label="Vehicle"
                value={`${trip.driver_vehicle.make} ${trip.driver_vehicle.model} ${trip.driver_vehicle.year}, ${trip.driver_vehicle.color} — ${trip.driver_vehicle.plate_number}`}
              />
            )}
          </div>
        )}

        {/* Schedule */}
        <div className="flex flex-col gap-6">
          {pickupDateTime && endDate && (
            <DetailRow
              label="Multiple days"
              value={`${format(new Date(pickupDateTime), 'dd/MM/yyyy')} - ${format(new Date(endDate), 'dd/MM/yyyy')}`}
            />
          )}
          {pickupDateTime && (
            <DetailRow
              label="Pickup Date and Time"
              value={format(new Date(pickupDateTime), 'dd/MM/yyyy, hh:mmaaa')
                .replace('am', 'AM')
                .replace('pm', 'PM')}
            />
          )}
          <DetailRow
            label="Pickup address"
            value={trip.pickup?.address || '-'}
          />
          <DetailRow
            label="Dropoff address"
            value={trip.dropoff?.address || '-'}
          />
          <DetailRow
            label="Total trip time"
            value={formatDuration(trip.actual_duration)}
          />
        </div>

        {/* Payment & Cancellation */}
        <div className="flex flex-col gap-6">
          {trip.payment_method && (
            <DetailRow label="Payment Method" value={trip.payment_method} />
          )}
          {trip.cancellation_reason && (
            <DetailRow
              label="Reason for Cancellation"
              value={trip.cancellation_reason}
            />
          )}
        </div>

        {/* Fare breakdown */}
        <div className="flex flex-col gap-6">
          <DetailRow
            label="Total Fare"
            value={formatCurrency(
              fromKobo(trip.actual_fare ?? trip.estimated_fare),
            )}
            bold
          />
          <DetailRow
            label="Fare"
            value={formatCurrency(fromKobo(trip.estimated_fare))}
            indent
          />
          <DetailRow
            label="Amount Paid"
            value={formatCurrency(
              fromKobo(trip.actual_fare ?? trip.estimated_fare),
            )}
            bold
          />
          <DetailRow
            label="Cancellation Fee"
            value={
              trip.cancellation_fee
                ? formatCurrency(fromKobo(trip.cancellation_fee))
                : '₦0'
            }
          />
        </div>
      </div>
    </div>
  )
}
