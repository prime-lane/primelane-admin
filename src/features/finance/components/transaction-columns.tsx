import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatCurrency, fromKobo } from '@/lib/utils'
import type { Transaction } from '@/features/customers/types'
import { CopyButton } from '@/components/ui/copy-button'

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-[2px]">
        <span className="text-sm text-neutral-800">
          {row.original.id.substring(0, 8).toUpperCase()}
        </span>
        <CopyButton textToCopy={row.original.id} />
      </div>
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
    accessorKey: 'provider',
    header: 'Payment method/Partner',
    cell: ({ row }) => {
      const parts = [row.original.channel, row.original.provider].filter(
        Boolean,
      )
      return (
        <span className="text-sm text-neutral-600">
          {parts.length ? parts.join('/') : '—'}
        </span>
      )
    },
  },
  {
    accessorKey: 'reference',
    header: 'Reference no.',
    cell: ({ row }) => (
      <div className="flex items-center gap-[2px]">
        <span className="text-sm text-neutral-600">
          {row.original.reference || '—'}
        </span>
        {row.original.reference && (
          <CopyButton textToCopy={row.original.reference} />
        )}
      </div>
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

export const refundColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-[2px]">
        <span className="text-sm text-neutral-800">
          {row.original.id.substring(0, 8).toUpperCase()}
        </span>
        <CopyButton textToCopy={row.original.id} />
      </div>
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
    accessorKey: 'ride_id',
    header: 'Trip ID / Category',
    cell: ({ row }) => {
      const tripId = row.original.ride_id || '—'
      const category = row.original.category || '—'
      return (
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-[2px]">
            <span className="text-sm font-medium text-neutral-800">
              {tripId}
            </span>
            {row.original.ride_id && (
              <CopyButton textToCopy={row.original.ride_id} />
            )}
          </div>
          <span className="text-xs text-gray-500">{category}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.narration || row.original.description || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount Refunded',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {formatCurrency(fromKobo(row.original.amount))}
      </span>
    ),
  },
]

export const customerWalletColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-[2px]">
        <span className="text-sm text-neutral-800">
          {row.original.id.substring(0, 8).toUpperCase()}
        </span>
        <CopyButton textToCopy={row.original.id} />
      </div>
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
    accessorKey: 'user_id',
    header: 'Customer ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-[2px]">
        <span className="text-sm text-neutral-800">
          {row.original.user_id.substring(0, 8).toUpperCase()}
        </span>
        <CopyButton textToCopy={row.original.user_id} />
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.narration || row.original.description || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {formatCurrency(fromKobo(row.original.amount))}
      </span>
    ),
  },
]
