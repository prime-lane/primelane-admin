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
    accessorKey: 'rider',
    header: 'Rider',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.rider
            ? `${row.original.rider.first_name} ${row.original.rider.last_name}`
            : 'N/A'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'pickup_location',
    header: 'Pickup',
    cell: ({ row }) => (
      <span
        className="text-sm truncate max-w-[200px]"
        title={row.original?.pickup_location?.address}
      >
        {row.original?.pickup_location?.address}
      </span>
    ),
  },
  {
    accessorKey: 'dropoff_location',
    header: 'Destination',
    cell: ({ row }) => (
      <span
        className="text-sm truncate max-w-[200px]"
        title={row.original?.dropoff_location?.address}
      >
        {row.original?.dropoff_location?.address}
      </span>
    ),
  },
  {
    accessorKey: 'fare',
    header: 'Fare',
    cell: ({ row }) => (
      <span className="text-sm">N{row.original?.fare?.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.created_at)}</span>
    ),
  },
]
