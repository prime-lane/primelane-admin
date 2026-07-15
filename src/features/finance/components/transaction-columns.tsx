import { type ColumnDef } from '@tanstack/react-table'
import { formatCurrency, fromKobo } from '@/lib/utils'
import type { Transaction } from '@/features/customers/types'
import { CopyButton } from '@/components/ui/copy-button'
import { useDateFormat } from '@/components/providers/date-format-provider'

export const useTransactionColumns = (): ColumnDef<Transaction>[] => {
  const { format } = useDateFormat()

  return [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => {
        const trxnId =
          row.original.custom_trxn_id ||
          row.original.id.substring(0, 8).toUpperCase()
        return (
          <div className="flex items-center gap-0.5">
            <span className="text-sm text-neutral-800">{trxnId}</span>
            <CopyButton textToCopy={trxnId} />
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Transaction Date',
      cell: ({ row }) => (
        <span className="text-sm text-neutral-600">
          {format(row.original.created_at)}
        </span>
      ),
    },
    {
      accessorKey: 'ledger_entry',
      header: 'Transaction Type',
      cell: ({ row }) => {
        const labels: Record<string, string> = {
          cash_in: 'Inflow',
          cash_out: 'Outflow',
          internal: 'Internal',
        }
        return (
          <span className="text-sm text-neutral-800">
            {labels[row.original.ledger_entry] ?? row.original.ledger_entry ?? '—'}
          </span>
        )
      },
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
        <div className="flex items-center gap-0.5">
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
}

export const useRefundColumns = (): ColumnDef<Transaction>[] => {
  const { format } = useDateFormat()

  return [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => {
        const trxnId =
          row.original.custom_trxn_id ||
          row.original.id.substring(0, 8).toUpperCase()
        return (
          <div className="flex items-center gap-0.5">
            <span className="text-sm text-neutral-800">{trxnId}</span>
            <CopyButton textToCopy={trxnId} />
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Transaction Date',
      cell: ({ row }) => (
        <span className="text-sm text-neutral-600">
          {format(row.original.created_at)}
        </span>
      ),
    },
    {
      accessorKey: 'ride_id',
      header: 'Trip ID / Type',
      cell: ({ row }) => {
        const tripId = row.original.custom_ride_id || '—'
        const category = row.original.category || '—'
        return (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-medium text-neutral-800">
                {tripId}
              </span>
              {row.original.custom_ride_id && (
                <CopyButton textToCopy={row.original.custom_ride_id} />
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
}

export const useCustomerWalletColumns = (): ColumnDef<Transaction>[] => {
  const { format } = useDateFormat()

  return [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: ({ row }) => {
        const trxnId =
          row.original.custom_trxn_id ||
          row.original.id.substring(0, 8).toUpperCase()
        return (
          <div className="flex items-center gap-0.5">
            <span className="text-sm text-neutral-800">{trxnId}</span>
            <CopyButton textToCopy={trxnId} />
          </div>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Transaction Date',
      cell: ({ row }) => (
        <span className="text-sm text-neutral-600">
          {format(row.original.created_at)}
        </span>
      ),
    },
    {
      accessorKey: 'user_id',
      header: 'Customer Name/ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-0.5">
          <div>
            <p className="text-sm text-black">
              {`${row.original.first_name || ''} ${row.original.last_name || ''}`}
            </p>
            {row.original.custom_user_id && (
              <span className="inline-flex items-center gap-0.5 text-xs text-neutral-500">
                {row.original.custom_user_id}
                <CopyButton textToCopy={row.original.custom_user_id} />
              </span>
            )}
          </div>
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
    {
      accessorKey: 'balance_snapshot',
      header: 'Wallet Balance',
      cell: ({ row }) => (
        <span className="text-sm text-neutral-800">
          {formatCurrency(fromKobo(row.original.balance_snapshot))}
        </span>
      ),
    },
  ]
}
