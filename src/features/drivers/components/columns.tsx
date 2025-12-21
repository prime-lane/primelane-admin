import { type ColumnDef } from '@tanstack/react-table'
import type { Driver } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { formatDate } from '@/utils/table-utils'

export const driverColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="text-sm">{row.original?.id?.substring(0, 8)}...</span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Date Joined',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.created_at)}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Driver name',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">
          {row.original.first_name} {row.original.last_name}
        </span>
        <span className="text-sm text-neutral-500">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone number',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.phone_number || 'N/A'}</span>
    ),
  },
  /*
  {
    accessorKey: 'vehicleCategory',
    header: 'Vehicle Category',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.vehicleCategory}</span>
    ),
  },
  */
  {
    accessorKey: 'status',
    header: 'Account status',
    cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
  },
  {
    accessorKey: 'is_email_verified',
    header: 'ID Verification',
    cell: ({ row }) => (
      <VerificationBadge verified={row.original.is_email_verified} />
    ),
  },
]
