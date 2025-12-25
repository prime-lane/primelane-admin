import { path } from '@/app/paths'
import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from './api/use-customers'
import { customerColumns } from './components/columns'
import type { Customer } from './types'

export const Customers = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [filters, setFilters] = useState<{
    status?: string
    start_date?: string
    end_date?: string
  }>({})

  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useCustomers({
    search: debouncedSearch,
    page,
    limit,
    user_type: 'customer',
    ...filters,
  })

  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setFilters((prev) => ({
        ...prev,
        status: value.toLowerCase() === 'all' ? undefined : value.toLowerCase(),
      }))
    } else if (key === 'date_joined') {
      setFilters((prev) => ({
        ...prev,
        start_date: value.start ? value.start.toISOString() : undefined,
        end_date: value.end ? value.end.toISOString() : undefined,
      }))
    }
  }

  if (error) return <ErrorState message="Failed to load customers" />

  const customers = data?.items || []

  // Configuration for the FilterMenu
  const filterOptions: FilterOption[] = [
    {
      label: 'Status',
      key: 'status',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Deactivated', value: 'deactivated' },
      ],
    },
    {
      label: 'Date joined',
      key: 'date_joined',
      type: 'date-range',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Customer" />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterMenu
          options={filterOptions}
          onFilterChange={handleFilterChange}
          activeFilters={{
            status: filters.status || 'all',
          }}
        />
      </Box>

      <DataTable
        data={customers}
        columns={customerColumns}
        onRowClick={(row: Customer) =>
          navigate(path.DASHBOARD.CUSTOMER_DETAILS.replace(':id', row.id))
        }
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
        onPageSizeChange={(newSize) => {
          setLimit(newSize)
          setPage(1)
        }}
      />
    </div>
  )
}
