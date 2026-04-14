import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatCurrency, fromKobo } from '@/lib/utils'
import type { Transaction } from '@/features/customers/types'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">{row.original.id.substring(0, 8).toUpperCase()}</span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Transaction Date',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {format(new Date(row.original.created_at), 'dd/MM/yyyy')}
      </span>
    ),
  },
  {
    accessorKey: 'transaction_type',
    header: 'Transaction Type',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {row.original.transaction_type === 'CR' ? 'Inflow' : 'Outflow'}
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Payment method/Partner',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">{row.original.description || '—'}</span>
    ),
  },
  {
    accessorKey: 'reference',
    header: 'Reference no.',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">{row.original.reference || '—'}</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount Paid',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {formatCurrency(fromKobo(row.original.amount))}
      </span>
    ),
  },
]
