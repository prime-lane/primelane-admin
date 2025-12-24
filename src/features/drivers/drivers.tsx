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
import { useDrivers } from './api/use-drivers'
import { driverColumns } from './components/columns'
import type { Driver } from './types'

export const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  const { data, isLoading, error } = useDrivers({
    search: debouncedSearch,
    page,
    limit,
  })

  const drivers = data?.items || []

  const handleRowClick = (driver: Driver) => {
    navigate(path.DASHBOARD.DRIVER_DETAILS.replace(':id', driver.id))
  }

  if (error) return <ErrorState message="Failed to load drivers" />

  return (
    <div className="space-y-6">
      <PageHeader title="Drivers" />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, phone number, email address, driver ID"
          />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
      </Box>

      <DataTable
        data={drivers}
        columns={driverColumns}
        onRowClick={handleRowClick}
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
