import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import {
  FilterChips,
  formatDateRange,
  type ActiveFilter,
} from '@/components/ui/filter-chips'
import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { useTableParams } from '@/hooks/use-table-params'
import { buildQueryParams } from '@/lib/utils'
import { downloadExport } from '@/utils/export-utils'
import { Box, Tab, Tabs } from '@mui/material'
import { parseAsString, useQueryState } from 'nuqs'
import { useState } from 'react'
import { PermissionGate } from '@/components/ui/permission-gate'
import { useTransactions } from './api/use-transactions'
import { useCustomerWalletColumns } from './components/transaction-columns'

export const CustomerWallet = () => {
  const customerWalletColumns = useCustomerWalletColumns()
  const {
    page,
    setPage,
    pageSize: limit,
    setPageSize: setLimit,
    search: searchTerm,
    setSearch: setSearchTerm,
  } = useTableParams()

  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault('debit'),
  )
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)

  const debouncedSearch = useDebounce(searchTerm, 500)
  const transactionType = activeTab === 'debit' ? 'DR' : 'CR'

  const { data, isLoading, error } = useTransactions({
    search: debouncedSearch,
    page,
    page_size: limit,
    transaction_type: transactionType,
    customer_wallet: 'true',
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  })

  const handleFilterChange = (
    key: string,
    value: string | { start: Date | null; end: Date | null },
  ) => {
    setPage(1)
    if (key === 'date') {
      const dateVal = value as { start: Date | null; end: Date | null }
      setStartDate(dateVal.start ? dateVal.start.toISOString() : null)
      setEndDate(dateVal.end ? dateVal.end.toISOString() : null)
    }
  }

  const handleRemoveFilter = (key: string) => {
    setPage(1)
    if (key === 'date') {
      setStartDate(null)
      setEndDate(null)
    }
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    const params = buildQueryParams({
      search: debouncedSearch || undefined,
      transaction_type: transactionType,
      customer_wallet: 'true',
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    })
    const qs = params.toString()
    setIsExporting(true)
    try {
      await downloadExport(`/transactions${qs ? `?${qs}` : ''}`)
    } finally {
      setIsExporting(false)
    }
  }

  const activeFilterChips: ActiveFilter[] = []
  if (startDate && endDate) {
    activeFilterChips.push({
      key: 'date',
      label: 'Date',
      displayValue: formatDateRange(startDate, endDate),
    })
  }

  const filterOptions: FilterOption[] = [
    { label: 'Date', key: 'date', type: 'date-range' },
  ]

  if (error)
    return <ErrorState message="Failed to load customer wallet transactions" />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Customer Wallet</h1>
      </div>

      <Tabs
        value={activeTab}
        onChange={(_, v) => {
          setActiveTab(v)
          setPage(1)
        }}
      >
        <Tab label="Debit" value="debit" />
        <Tab label="Credit" value="credit" />
      </Tabs>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by trip id, transaction id..."
          />
        </Box>
        <div className="flex gap-3">
          <PermissionGate permission="finance:filter">
            <FilterMenu
              options={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={{}}
            />
          </PermissionGate>
          <ExportButton onClick={handleExport} isLoading={isExporting} />
        </div>
      </Box>

      <FilterChips
        activeFilters={activeFilterChips}
        onRemove={handleRemoveFilter}
      />

      <DataTable
        data={data?.items || []}
        columns={customerWalletColumns}
        isLoading={isLoading}
        pagination={
          data?.pagination
            ? {
                currentPage: Number(data.pagination.current_page),
                totalPages: data.pagination.total_pages,
                totalItems: data.pagination.total_items,
              }
            : undefined
        }
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setLimit(size)
          setPage(1)
        }}
      />
    </div>
  )
}
