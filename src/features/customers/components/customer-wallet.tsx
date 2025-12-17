import { DataTable } from '@/components/ui/data-table'
import { formatCurrency } from '@/lib/utils'
import type { Transaction, Wallet } from '../types'
import { StatsCard } from './stats-card'
import { transactionColumns } from './transaction-columns'

interface CustomerWalletProps {
  wallet?: Wallet
  transactions?: Transaction[]
  isLoading?: boolean
}

export const CustomerWallet = ({
  wallet,
  transactions = [],
  isLoading,
}: CustomerWalletProps) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading wallet details...</div>
  }

  if (!wallet) {
    return (
      <div className="p-4 text-center text-neutral-500">
        No wallet information available.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-neutral-900">
          Wallet Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            label="Current Wallet Balance"
            value={formatCurrency(wallet.current_balance)}
          />
          <StatsCard label="Total Spent" value={formatCurrency(0)} />
          <StatsCard label="Pending Refunds" value={formatCurrency(0)} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-neutral-900">
            Transaction History
          </h3>
        </div>

        <DataTable
          data={transactions}
          columns={transactionColumns}
          enableRowSelection={false}
          pageSize={10}
        />
      </section>
    </div>
  )
}
