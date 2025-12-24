import { type ColumnDef } from '@tanstack/react-table'
import { type Trip } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDate } from '@/utils/table-utils'

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: 'id',
    header: 'Trip ID',
    cell: ({ row }) => (
      <span className="text-sm">
        #{row.original?.id?.substring(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Trip Date',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original?.created_at)}</span>
    ),
  },
  {
    accessorKey: 'rider_id',
    header: 'Rider Name/ID',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.rider
            ? `${row.original.rider.first_name} ${row.original.rider.last_name}`
            : 'N/A'}
        </span>
        <span className="text-xs text-gray-500">
          #{row.original?.rider_id?.substring(0, 8).toUpperCase()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'driver_id',
    header: 'Driver Name/ID',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.driver
            ? `${row.original.driver.first_name} ${row.original.driver.last_name}`
            : 'N/A'}
        </span>
        {row.original.driver_id && (
          <span className="text-xs text-gray-500">
            #{row.original?.driver_id?.substring(0, 8).toUpperCase()}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'ride_type',
    header: 'Trip Type',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.ride_type || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'vehicle_category',
    header: 'Vehicle Category',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.category_id || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'actual_fare',
    header: 'Actual Fare',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.actual_fare
          ? `N${row.original.actual_fare.toLocaleString()}`
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'drivers_earning',
    header: "Driver's Earning",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.drivers_earning
          ? `N${row.original.drivers_earning.toLocaleString()}`
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'commission',
    header: 'Commission',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.commission
          ? `N${row.original.commission.toLocaleString()}`
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'calculation_fee',
    header: 'Cancellation Fee',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.cancellation_fee
          ? `N${row.original.cancellation_fee.toLocaleString()}`
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
