import { type ColumnDef } from '@tanstack/react-table'
import type { Transaction } from '../types'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

export const transactionColumns: ColumnDef<Transaction>[] = [
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
    accessorKey: 'transaction_type',
    header: 'Type',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.transaction_type === 'CR' ? 'Credit' : 'Debit'}
      </span>
    ),
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
      const statusColor =
        status === 'Completed'
          ? 'bg-green-100 text-green-700'
          : status === 'Pending'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700'

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      )
    },
  },
]
