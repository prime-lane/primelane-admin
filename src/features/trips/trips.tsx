import { FilterButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'
import { useTrips } from './api/use-trips'
import { columns } from './components/columns'

import { path } from '@/app/paths'
import { useNavigate } from 'react-router-dom'
import type { Trip } from './types'

export const Trips = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  const { data, isLoading, error } = useTrips({
    search: debouncedSearch,
    page,
    limit,
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

      <DataTable
        data={trips}
        columns={columns}
        onRowClick={(row: Trip) =>
          navigate(path.DASHBOARD.TRIP_DETAILS.replace(':id', row.id))
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
        onPageSizeChange={(size) => {
          setLimit(size)
          setPage(1)
        }}
      />
    </div>
  )
}
