import { type ColumnDef } from '@tanstack/react-table'
import { type Trip } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDate } from '@/utils/table-utils'
import { formatCurrency, fromKobo } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'
import { formatRideType } from '../utils'
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
        <span className="text-sm">{formatDate(row.original?.created_at)}</span>
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
              #{row.original?.rider_id?.substring(0, 8).toUpperCase()}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'driver_id',
      header: 'Driver Name/ID',
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">
            {row.original.driver
              ? `${row.original.driver?.first_name} ${row.original.driver?.last_name}`
              : 'N/A'}
          </span>
          <span className="text-xs text-gray-500">
            #{row.original?.driver_id?.substring(0, 8).toUpperCase()}
          </span>
        </div>
      ),
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
          {row.original.estimated_fare
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
