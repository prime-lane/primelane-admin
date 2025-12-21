import { type ColumnDef } from '@tanstack/react-table'
import type { Transaction } from '../types'
import { formatCurrency } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/status-badge'
import { format } from 'date-fns'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original?.id?.substring(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: 'transaction_type',
    header: 'Type',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.transaction_type === 'CR' ? 'Credit' : 'Debit'}
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-neutral-900">
        {row.original.description}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-neutral-900">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status || 'Completed'
      return <StatusBadge status={status.toLowerCase() as any} />
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {format(new Date(row.original.created_at), 'dd/MM/yyyy')}
      </span>
    ),
  },
]
