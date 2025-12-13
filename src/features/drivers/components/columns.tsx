import { type ColumnDef } from '@tanstack/react-table'
import type { Driver } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { formatDate } from '@/utils/table-utils'

export const driverColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="text-sm">{row.original.id}</span>,
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.dateJoined)}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Driver name',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone number',
    cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email address',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-500">{row.original.email}</span>
    ),
  },
  {
    accessorKey: 'vehicleCategory',
    header: 'Vehicle Category',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.vehicleCategory}</span>
    ),
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account status',
    cell: ({ row }) => <StatusBadge status={row.original.accountStatus} />,
  },
  {
    accessorKey: 'idVerification',
    header: 'ID Verification',
    cell: ({ row }) => (
      <VerificationBadge verified={row.original.idVerification} />
    ),
  },
]
