import { path } from '@/app/paths'
import { FilterButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
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
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useCustomers({
    search: debouncedSearch,
    page,
    limit,
    user_type: 'customer',
  })

  if (error) return <ErrorState message="Failed to load customers" />

  const customers = data?.items || []

  return (
    <div className="space-y-6">
      <PageHeader title="Customer" />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
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
