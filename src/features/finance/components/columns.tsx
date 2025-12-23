import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import type { Commission, Transaction, Refund } from '../types'

const commissionHelper = createColumnHelper<Commission>()

export const commissionColumns = [
  commissionHelper.accessor('settlement_id', {
    header: 'Settlement ID',
    cell: (info) => info.getValue(),
  }),
  commissionHelper.accessor('settlement_date', {
    header: 'Settlement Date',
    cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
  }),
  commissionHelper.accessor('trip_id', {
    header: 'Trip ID',
    cell: (info) => info.getValue(),
  }),
  commissionHelper.accessor('trip_type', {
    header: 'Type',
    cell: (info) => info.getValue(),
  }),
  commissionHelper.accessor('fare_charged', {
    header: 'Fare Charged',
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
  }),
  commissionHelper.accessor('platform_earning', {
    header: 'Platform Earning',
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
  }),
  commissionHelper.accessor('driver_earning', {
    header: 'Driver Earning',
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
  }),
  commissionHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => `₦${info.getValue().toLocaleString()}`,
  }),
  commissionHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue()
      const colors = {
        completed: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        failed: 'bg-red-100 text-red-800',
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
  }),
]

export const transactionColumns = (
  userType: 'driver' | 'customer',
): ColumnDef<Transaction>[] => [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'transaction_date',
    header: 'Transaction Date',
    cell: (info) =>
      format(new Date(info.getValue() as string), 'MMM dd, yyyy HH:mm'),
  },
  {
    accessorKey: 'user_name',
    header: userType === 'driver' ? 'Driver Name/ID' : 'Customer Name/ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => `₦${(info.getValue() as number).toLocaleString()}`,
  },
  {
    accessorKey: 'wallet_balance',
    header: 'Wallet Balance',
    cell: (info) => `₦${(info.getValue() as number).toLocaleString()}`,
  },
]

export const refundColumns: ColumnDef<Refund>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'transaction_date',
    header: 'Transaction Date',
    cell: (info) =>
      format(new Date(info.getValue() as string), 'MMM dd, yyyy HH:mm'),
  },
  {
    accessorKey: 'trip_id',
    header: 'Trip ID',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'trip_type',
    header: 'Type',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'amount_collected',
    header: 'Amount Collected',
    cell: (info) => `₦${(info.getValue() as number).toLocaleString()}`,
  },
]
