import { useState } from 'react'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput, FilterButton } from '@/components/ui/data-controls'
import { driverColumns } from './components/columns'
import { useDrivers } from './api/use-drivers'
import { LoadingState, ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { path } from '@/app/paths'
import type { Driver } from './types'

export const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  const { data, isLoading, error } = useDrivers({
    search: debouncedSearch,
    limit: 100,
  })

  const drivers = data?.items || []

  const handleRowClick = (driver: Driver) => {
    navigate(path.DASHBOARD.DRIVER_DETAILS.replace(':id', driver.id))
  }

  if (error) return <ErrorState message="Failed to load drivers" />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Drivers</h1>
      </div>

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

      {isLoading ? (
        <LoadingState />
      ) : (
        <DataTable
          data={drivers}
          columns={driverColumns}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  )
}
