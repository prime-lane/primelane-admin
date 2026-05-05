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
import { buildQueryParams } from '@/lib/utils'
import { downloadExport } from '@/utils/export-utils'
import { Box } from '@mui/material'
import { parseAsString, useQueryState } from 'nuqs'
import { useTransactions } from './api/use-transactions'
import { transactionColumns } from './components/transaction-columns'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'

export const Transactions = () => {
  const {
    page,
    setPage,
    pageSize: limit,
    setPageSize: setLimit,
    search: searchTerm,
    setSearch: setSearchTerm,
  } = useTableParams()

  const [transactionType, setTransactionType] = useQueryState(
    'transaction_type',
    parseAsString,
  )
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useTransactions({
    search: debouncedSearch,
    page,
    page_size: limit,
    has_provider: 'true',
    transaction_type: (transactionType as 'CR' | 'DR') || undefined,
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  })

  const handleFilterChange = (
    key: string,
    value: string | { start: Date | null; end: Date | null },
  ) => {
    setPage(1)
    if (key === 'transaction_type') {
      setTransactionType(
        (value as string).toLowerCase() === 'all' ? null : (value as string),
      )
    } else if (key === 'date') {
      const dateVal = value as { start: Date | null; end: Date | null }
      setStartDate(dateVal.start ? dateVal.start.toISOString() : null)
      setEndDate(dateVal.end ? dateVal.end.toISOString() : null)
    }
  }

  const handleRemoveFilter = (key: string) => {
    setPage(1)
    if (key === 'transaction_type') setTransactionType(null)
    else if (key === 'date') {
      setStartDate(null)
      setEndDate(null)
    }
  }

  const handleExport = () => {
    const params = buildQueryParams({
      search: debouncedSearch || undefined,
      has_provider: 'true',
      transaction_type: transactionType || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    })
    const qs = params.toString()
    downloadExport(`/transactions${qs ? `?${qs}` : ''}`, 'transactions-export')
  }

  const activeFilterChips: ActiveFilter[] = []
  if (transactionType && transactionType !== 'all') {
    activeFilterChips.push({
      key: 'transaction_type',
      label: 'Type',
      displayValue: transactionType === 'CR' ? 'Inflow' : 'Outflow',
    })
  }
  if (startDate && endDate) {
    activeFilterChips.push({
      key: 'date',
      label: 'Date',
      displayValue: formatDateRange(startDate, endDate),
    })
  }

  const filterOptions: FilterOption[] = [
    {
      label: 'Transaction Type',
      key: 'transaction_type',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Inflow', value: 'CR' },
        { label: 'Outflow', value: 'DR' },
      ],
    },
    {
      label: 'Date',
      key: 'date',
      type: 'date-range',
    },
  ]

  if (error) return <ErrorState message="Failed to load transactions" />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Transactions</h1>
      </div>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by booking id, transaction id..."
          />
        </Box>
        <div className="flex gap-3">
          <PermissionGate permission="finance:filter">
            <FilterMenu
              options={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={{
                transaction_type: transactionType || 'all',
              }}
            />
          </PermissionGate>
          <ExportButton onClick={handleExport} />
        </div>
      </Box>

      <FilterChips
        activeFilters={activeFilterChips}
        onRemove={handleRemoveFilter}
      />

      <DataTable
        data={data?.items || []}
        columns={transactionColumns}
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
