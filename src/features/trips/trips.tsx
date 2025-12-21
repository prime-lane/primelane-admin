import { FilterButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'
import { useTrips } from './api/use-trips'
import { columns } from './components/columns'

import { useNavigate } from 'react-router-dom'
import { path } from '@/app/paths'
import type { Trip } from './types'

export const Trips = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  const { data, isLoading, error } = useTrips({
    search: debouncedSearch,
    limit: 100,
  })

  if (error) return <ErrorState message="Failed to load trips" />

  const trips = data?.items || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Trips</h1>
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
          data={trips}
          columns={columns}
          onRowClick={(row: Trip) =>
            navigate(path.DASHBOARD.TRIP_DETAILS.replace(':id', row.id))
          }
        />
      )}
    </div>
  )
}
