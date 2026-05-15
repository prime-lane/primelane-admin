import { path } from '@/app/paths'
import { AppBreadcrumbs } from '@/components/ui/app-breadcrumbs'
import { ErrorState } from '@/components/ui/loading-error-states'
import { StatusBadge } from '@/components/ui/status-badge'
import { useCategoryName } from '@/features/pricing-config/hooks/use-category-name'
import {
  formatCurrency,
  formatDuration,
  formatToLocalTimeZone,
  fromKobo,
} from '@/lib/utils'
import { ArrowRightUp as ExternalLink } from '@solar-icons/react'
import { format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from './api/use-trips'
import { TripDetailsSkeleton } from './components/skeletons'
import type { Slot } from './types'
import { formatRideType } from './utils'

interface DetailRowProps {
  label: string
  value: React.ReactNode
  isLink?: boolean
  linkTo?: string
  bold?: boolean
  indent?: boolean
  full?: boolean
}

const DetailRow = ({
  label,
  value,
  isLink,
  linkTo,
  bold,
  indent,
  full = false,
}: DetailRowProps) => (
  <div className={`flex items-center gap-4 ${indent ? 'pl-4' : ''}`}>
    <span
      className={`text-neutral-500 text-sm ${full ? 'w-full' : 'w-60'} shrink-0 ${bold ? 'font-semibold text-neutral-900' : ''}`}
    >
      {label}
    </span>
    {!full && (
      <div className="flex items-end text-right w-full ml-auto gap-2">
        {isLink && linkTo ? (
          <Link
            to={linkTo}
            className="flex ml-auto items-center gap-1 font-medium"
          >
            <span className="text-sm text-black font-medium">{value}</span>
            <ExternalLink size={11} />
          </Link>
        ) : (
          <span
            className={`ml-auto text-sm ${bold ? 'font-medium text-neutral-900' : 'font-normal text-neutral-900'}`}
          >
            {value}
          </span>
        )}
      </div>
    )}
  </div>
)

export const TripDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: trip, isLoading, error } = useTrip(id!)

  const { getCategoryName } = useCategoryName()

  if (isLoading) return <TripDetailsSkeleton />
  if (error || !trip)
    return <ErrorState message="Failed to load booking details" />

  const riderName =
    `${trip.rider?.first_name || ''} ${trip.rider?.last_name || ''}`.trim() ||
    'N/A'

  const isDaily =
    trip.ride_type === 'daily' || trip.ride_type === 'daily_rental'

  const vehicleCategory =
    trip.category_name ||
    trip.vehicle_category ||
    trip.driver_vehicle?.category_ids
      ?.map((cid) => getCategoryName(cid))
      .filter((n) => n !== 'N/A')
      .join(', ') ||
    'N/A'

  const dailySubtype =
    trip.hourly_ride_type === 'half_day'
      ? 'Half-day'
      : trip.hourly_ride_type === 'full_day'
        ? 'Full-day'
        : null

  const bookingType =
    isDaily && dailySubtype
      ? `${formatRideType(trip.ride_type)}: ${dailySubtype}`
      : formatRideType(trip.ride_type)

  const pickupDateTime = trip.pickup_time ?? 'N/A'
  const endDate = trip.end_time

  const durationLabel = isDaily
    ? (dailySubtype ?? (trip.booked_hours ? `${trip.booked_hours} hours` : '-'))
    : formatDuration(trip.estimated_fare)

  const slots: Slot[] = trip.slots ?? []
  const assignedSlots = slots.filter((s) => s.status === 'ASSIGNED')
  const pendingCount = slots.filter((s) => s.status === 'PENDING').length

  return (
    <div className="space-y-9">
      <div>
        <AppBreadcrumbs
          items={[
            { label: 'Booking', to: path.DASHBOARD.TRIPS },
            {
              label: 'Booking Details',
              to: path.DASHBOARD.TRIP_DETAILS.replace(':id', id!),
            },
          ]}
        />
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Booking Details</span>
        </div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        <div className="flex flex-col gap-6">
          <DetailRow label="Booking ID" value={trip.custom_ride_id || id} />
          {slots.length > 0 ? (
            <>
              <DetailRow
                label="Booking Status"
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
                <DetailRow
                  label="No. of Vehicles"
                  value={trip.no_of_vehicles}
                />
              )}
              <DetailRow label="Vehicle Category" value={vehicleCategory} />
            </>
          ) : (
            <>
              <DetailRow label="Booking Type" value={bookingType} />
              <DetailRow label="Vehicle Category" value={vehicleCategory} />
              <DetailRow
                label="Booking Status"
                value={<StatusBadge status={trip.status as any} />}
              />
              <DetailRow
                label="Customer name"
                value={riderName}
                isLink={!!trip.rider_id}
                linkTo={path.DASHBOARD.CUSTOMER_DETAILS.replace(
                  ':id',
                  trip.rider_id,
                )}
              />
            </>
          )}
        </div>

        {/* Drivers & Vehicles */}
        {slots.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            <h3 className="text-sm font-bold text-neutral-600">
              Drivers &amp; Vehicles
            </h3>
            <div className="flex flex-col gap-4">
              {assignedSlots.map((slot: Slot) => {
                const driverName = `${slot.driver!.first_name} ${slot.driver!.last_name}`
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
                          slot.driver_id!,
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
              {pendingCount > 0 && (
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-neutral-400 text-sm w-60 shrink-0">
                    {pendingCount} slot{pendingCount > 1 ? 's' : ''} pending assignment
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Single driver fallback (non-fleet trips) */}
        {trip.driver && (
          <div className="flex flex-col gap-6">
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
          {slots.length > 0 && pickupDateTime && endDate && (
            <DetailRow
              label="Multiple days"
              value={`${format(formatToLocalTimeZone(pickupDateTime), 'dd/MM/yyyy')} - ${format(formatToLocalTimeZone(endDate), 'dd/MM/yyyy')}`}
            />
          )}
          {pickupDateTime && (
            <DetailRow
              label="Pickup Date and Time"
              value={format(
                formatToLocalTimeZone(pickupDateTime),
                'dd/MM/yyyy, hh:mmaaa',
              )
                .replace('am', 'AM')
                .replace('pm', 'PM')}
            />
          )}
          <DetailRow
            label="Pickup address"
            value={trip.pickup?.address || '-'}
          />
          {slots.length === 0 && !isDaily && (
            <DetailRow
              label="Dropoff address"
              value={trip.dropoff?.address || '-'}
            />
          )}
          {!isDaily && slots.length === 0 && (
            <DetailRow label="Booking Duration" value={durationLabel} />
          )}
          <DetailRow
            label="Total trip time"
            value={formatDuration(trip.estimated_fare)}
          />
          <DetailRow
            label="Payment Method"
            value={trip.payment_method || 'N/A'}
          />
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
          {trip?.estimated_fare != null && Number(trip.estimated_fare) > 0 && (
            <DetailRow
              label="Fare"
              value={formatCurrency(fromKobo(trip?.estimated_fare))}
              indent
            />
          )}
          {Number(trip?.extra_fare) > 0 && (
            <DetailRow
              label="Extra fare"
              value={formatCurrency(fromKobo(trip?.extra_fare))}
              indent
            />
          )}
          <DetailRow
            label="Amount Paid"
            value={formatCurrency(
              fromKobo(trip.actual_fare ?? trip.estimated_fare),
            )}
            bold
          />
          {Number(trip.cancellation_fee) > 0 && (
            <DetailRow
              label="Cancellation Fee"
              value={formatCurrency(fromKobo(trip.cancellation_fee))}
            />
          )}
          {trip.cancellation_reason && (
            <DetailRow
              label="Reason for Cancellation"
              value={trip.cancellation_reason}
            />
          )}
          {trip.cancellation_refund_reason && (
            <DetailRow label={trip.cancellation_refund_reason} value="" full />
          )}
        </div>
      </div>
    </div>
  )
}
