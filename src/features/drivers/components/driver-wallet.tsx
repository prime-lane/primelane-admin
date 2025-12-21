import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput } from '@/components/ui/data-controls'
import { formatCurrency } from '@/lib/utils'
import type { Transaction, Wallet } from '../types'
import { StatsCard } from '@/features/customers/components/stats-card'
import { transactionColumns } from '@/features/customers/components/transaction-columns'

interface DriverWalletProps {
  wallet?: Wallet
  transactions?: Transaction[]
  isLoading?: boolean
}

export const DriverWallet = ({
  wallet,
  transactions = [],
  isLoading,
}: DriverWalletProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <StatsCard label="Total Earned" value={formatCurrency(0)} />
          <StatsCard label="Pending Withdrawals" value={formatCurrency(0)} />
          <StatsCard
            label="Lifetime Earnings"
            value={formatCurrency(wallet.current_balance)}
          />
          <StatsCard label="Fill" value={formatCurrency(0)} />
          <StatsCard label="Fill" value={formatCurrency(0)} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-neutral-900">
            Transaction History
          </h3>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search transactions..."
            fullWidth={false}
          />
        </div>

        <DataTable
          data={filteredTransactions}
          columns={transactionColumns}
          enableRowSelection={false}
          pageSize={10}
        />
      </section>
    </div>
  )
}
