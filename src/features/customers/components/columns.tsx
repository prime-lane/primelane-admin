import { type ColumnDef } from '@tanstack/react-table'
import type { Customer } from '../types'
import { StatusBadge } from '@/components/ui/status-badge'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { formatDate } from '@/utils/table-utils'

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.id}</span>
    ),
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
    header: 'Customer Names',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">{row.original.name}</span>
        <span className="text-sm text-neutral-500">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone number',
    cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
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
