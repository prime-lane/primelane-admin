import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { exportToCSV } from '@/utils/export-utils'
import { Box } from '@mui/material'

import { parseAsString, useQueryState } from 'nuqs'
import { useNavigate } from 'react-router-dom'
import * as useTrips from './api/use-trips'
import { columns } from './components/columns'

import { path } from '@/app/paths'
import { useVehicleCategories } from '../pricing-config/api/use-vehicle-categories'
import type { Trip } from './types'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'

export const Trips = () => {
  const {
    page,
    setPage,
    pageSize: limit,
    setPageSize: setLimit,
    search: searchTerm,
    setSearch: setSearchTerm,
  } = useTableParams()

  const [status, setStatus] = useQueryState('status', parseAsString)
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)
  const [vehicleCategoryId, setVehicleCategoryId] = useQueryState(
    'vehicle_category_id',
    parseAsString,
  )

  const debouncedSearch = useDebounce(searchTerm, 500)
  const navigate = useNavigate()

  // Sync state to filters object for API hook
  const filters = {
    status: status || undefined,
    start_date: startDate || undefined,
    end_date: endDate || undefined,
    vehicle_category_id: vehicleCategoryId || undefined,
  }

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
      setStatus(value.toLowerCase() === 'all' ? null : value.toLowerCase())
    } else if (key === 'date') {
      setStartDate(value.start ? value.start.toISOString() : null)
      setEndDate(value.end ? value.end.toISOString() : null)
    } else if (key === 'vehicle_category') {
      setVehicleCategoryId(value)
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
          <PermissionGate permission="trips:filter">
            <FilterMenu
              options={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={{
                status: status || 'all',
                vehicle_category: vehicleCategoryId || undefined,
              }}
            />
          </PermissionGate>
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
