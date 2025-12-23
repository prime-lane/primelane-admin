import {
  ExportButton,
  FilterButton,
  SearchInput,
} from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box, Tab, Tabs } from '@mui/material'
import { AltArrowDown, FileDownload } from '@solar-icons/react'
import { useState } from 'react'
import { format } from 'date-fns'
import { useTransactions, useWallet } from './api/use-finance'
import type { Transaction } from './types'
import { transactionColumns } from './components/columns'

const exportToCSV = (data: Transaction[], type: string) => {
  const headers = [
    'Transaction ID',
    'Transaction Date',
    'Customer Name/ID',
    'Description',
    'Amount',
    'Wallet Balance',
  ]
  const rows = data.map((item) => [
    item.id,
    format(new Date(item.transaction_date), 'MMM dd, yyyy HH:mm'),
    item.user_name,
    item.description,
    item.amount,
    item.wallet_balance,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `customer-wallet-${type}-${format(new Date(), 'yyyy-MM-dd')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const CustomerWallet = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const type = activeTab === 0 ? 'debit' : 'credit'

  const { data: walletData, isLoading: walletLoading } = useWallet()
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error,
  } = useTransactions({
    search: debouncedSearch,
    type,
    limit: 100,
  })

  if (error) return <ErrorState message="Failed to load transactions" />

  const transactions = transactionsData?.data || []
  const wallet = walletData?.data?.[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl">Customer Wallet</h1>
        {wallet && !walletLoading && (
          <p className="text-lg text-neutral-600 mt-2">
            Current Balance:{' '}
            <span className="font-semibold">
              ₦{wallet.current_balance.toLocaleString()}
            </span>
          </p>
        )}
      </div>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
      >
        <Tab label="Debit" />
        <Tab label="Credit" />
      </Tabs>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
        <ExportButton
          onClick={() => exportToCSV(transactions, type)}
          startIcon={<FileDownload size={16} />}
        />
      </Box>

      {transactionsLoading ? (
        <LoadingState />
      ) : (
        <DataTable
          data={transactions}
          columns={transactionColumns('customer')}
        />
      )}
    </div>
  )
}
