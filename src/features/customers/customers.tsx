import { useState } from 'react'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput, FilterButton } from '@/components/ui/data-controls'
import { customerColumns } from './components/columns'
import { useCustomers } from './api/use-customers'
import { LoadingState, ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { useNavigate } from 'react-router-dom'
import type { Customer } from './types'
import { path } from '@/app/paths'

export const Customers = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useCustomers({
    search: debouncedSearch,
    limit: 100,
  })

  if (error) return <ErrorState message="Failed to load customers" />

  const customers = data?.items || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Customer</h1>
      </div>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
      </Box>

      {isLoading ? (
        <LoadingState />
      ) : (
        <DataTable
          data={customers}
          columns={customerColumns}
          onRowClick={(row: Customer) =>
            navigate(path.DASHBOARD.CUSTOMER_DETAILS.replace(':id', row.id))
          }
        />
      )}
    </div>
  )
}
