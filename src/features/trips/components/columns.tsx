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
        #{row.original.id.substring(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Trip Date',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    accessorKey: 'riderId',
    header: 'Rider Name/ID',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.rider
            ? `${row.original.rider.first_name} ${row.original.rider.last_name}`
            : 'N/A'}
        </span>
        <span className="text-xs text-gray-500">
          #{row.original.riderId.substring(0, 8).toUpperCase()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'driverId',
    header: 'Driver Name/ID',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.driver
            ? `${row.original.driver.first_name} ${row.original.driver.last_name}`
            : 'N/A'}
        </span>
        {row.original.driverId && (
          <span className="text-xs text-gray-500">
            #{row.original.driverId.substring(0, 8).toUpperCase()}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'tripType',
    header: 'Trip Type',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.tripType || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'vehicleCategory',
    header: 'Vehicle Category',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.vehicleCategory || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'actualFare',
    header: 'Actual Fare',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.actualFare
          ? `N${row.original.actualFare.toLocaleString()}`
          : 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'driversEarning',
    header: "Driver's Earning",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.driversEarning
          ? `N${row.original.driversEarning.toLocaleString()}`
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
    accessorKey: 'calculationFee',
    header: 'Calculation Fee',
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.calculationFee
          ? `N${row.original.calculationFee.toLocaleString()}`
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
