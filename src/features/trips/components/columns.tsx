import { type ColumnDef } from '@tanstack/react-table'
import { type Trip } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatCurrency, formatToLocalTimeZone, fromKobo } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'
import { formatRideType } from '../utils'
import { format } from 'date-fns'
// import { useCategoryName } from '@/features/pricing-config/hooks/use-category-name'

export const useTripColumns = (): ColumnDef<Trip>[] => {
  // const { getCategoryName } = useCategoryName()

  return [
    {
      accessorKey: 'id',
      header: 'Booking ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-0.5">
          <span className="text-sm">{row.original?.custom_ride_id}</span>
          <CopyButton textToCopy={row.original?.custom_ride_id} />
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Booking Date',
      cell: ({ row }) => (
        <span className="text-sm">
          {format(
            formatToLocalTimeZone(row.original?.created_at),
            'dd/MM/yyyy, hh:mma',
          )}
        </span>
      ),
    },
    {
      accessorKey: 'rider_id',
      header: 'Customer Name/ID',
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">
            {row.original.rider
              ? `${row.original.rider.first_name} ${row.original.rider.last_name}`
              : 'N/A'}
          </span>
          {row.original.rider_id && (
            <span className="text-xs text-gray-500">
              #{row.original?.rider?.custom_user_id} {/* truncate to 'RIDi122...OKP' and add a copy button */}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'driver_id',
      header: 'Driver Name/ID',
      cell: ({ row }) => {
        const name =
          !row.original.driver?.first_name || !row.original.driver?.last_name
            ? 'Unassigned'
            : `${row.original.driver?.first_name} ${row.original.driver?.last_name}`
        return (
          <div className="flex flex-col gap-0.5">
            <span
              className={`text-sm ${name === 'Unassigned' ? 'text-neutral-500 font-mono' : 'font-medium'}`}
            >
              {name}
            </span>
            {row.original.driver_id && (
              <span className="text-xs text-gray-500">
                {row.original?.driver?.custom_user_id} {/* truncate to 'RIDi122...OKP' and add a copy button */}
              </span>
            )}
          </div>
        )
      },
    },

    {
      accessorKey: 'ride_type',
      header: 'Trip Type',
      cell: ({ row }) => (
        <span className="text-sm">
          {formatRideType(row.original.ride_type)}
        </span>
      ),
    },
    {
      accessorKey: 'vehicle_category',
      header: 'Vehicle Category',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.category_name}
          {/* {getCategoryName(row.original.category_id)} */}
        </span>
      ),
    },
    {
      accessorKey: 'estimated_fare',
      header: 'Total Fare',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.estimated_fare != null
            ? `${formatCurrency(fromKobo(row.original.estimated_fare))}`
            : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Trip Status',
      cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
    },
  ]
}
