import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { exportToCSV } from '@/utils/export-utils'
import { Box } from '@mui/material'

import { useState } from 'react'
import * as useTrips from './api/use-trips'
import { columns } from './components/columns'

import { path } from '@/app/paths'
import { useNavigate } from 'react-router-dom'
import type { Trip } from './types'
import { useVehicleCategories } from '../pricing-config/api/use-vehicle-categories'

export const Trips = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [filters, setFilters] = useState<{
    status?: string
    start_date?: string
    end_date?: string
    vehicle_category_id?: string
  }>({})
  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  const { data: vehicleCategories } = useVehicleCategories()

  const { data, isLoading, error } = useTrips.useTrips({
    search: debouncedSearch,
    page,
    page_size: limit,
    ...filters,
  })

  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setFilters((prev) => ({
        ...prev,
        status: value.toLowerCase() === 'all' ? undefined : value.toLowerCase(),
      }))
    } else if (key === 'date') {
      setFilters((prev) => ({
        ...prev,
        start_date: value.start ? value.start.toISOString() : undefined,
        end_date: value.end ? value.end.toISOString() : undefined,
      }))
    } else if (key === 'vehicle_category') {
      setFilters((prev) => ({
        ...prev,
        vehicle_category_id: value,
      }))
    }
  }

  const handleExport = () => {
    if (!data?.items) return
    exportToCSV(data.items, 'trips-export', [
      { key: 'id', label: 'Trip ID' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date' },
    ])
  }

  if (error) return <ErrorState message="Failed to load trips" />

  const trips = data?.items || []

  const filterOptions: FilterOption[] = [
    {
      label: 'Trip Status',
      key: 'status',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Active', value: 'active' },
      ],
    },
    {
      label: 'Date',
      key: 'date',
      type: 'date-range',
    },
    {
      label: 'Vehicle category',
      key: 'vehicle_category',
      type: 'select',
      options:
        (vehicleCategories?.categories || [])?.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })) || [],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Trips</h1>
      </div>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <div className="flex gap-3">
          <FilterMenu
            options={filterOptions}
            onFilterChange={handleFilterChange}
            activeFilters={{
              status: filters.status || 'all',
              vehicle_category: filters.vehicle_category_id,
            }}
          />
          <ExportButton onClick={handleExport} />
        </div>
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
