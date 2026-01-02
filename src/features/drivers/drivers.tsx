import { path } from '@/app/paths'
import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import {
  FilterChips,
  formatDateRange,
  type ActiveFilter,
} from '@/components/ui/filter-chips'
import { FilterMenu, type FilterOption } from '@/components/ui/filter-menu'
import { ErrorState } from '@/components/ui/loading-error-states'
import { PageHeader } from '@/components/ui/page-header'
import { useDebounce } from '@/hooks/use-debounce'
import { exportToCSV } from '@/utils/export-utils'
import { Box } from '@mui/material'

import { parseAsString, useQueryState } from 'nuqs'
import { useNavigate } from 'react-router-dom'
import { useVehicleCategories } from '../pricing-config/api/use-vehicle-categories'
import { useDrivers } from './api/use-drivers'
import { useDriverColumns } from './components/columns'
import type { Driver } from './types'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'

export const Drivers = () => {
  const {
    page,
    setPage,
    pageSize: limit,
    setPageSize: setLimit,
    search: searchTerm,
    setSearch: setSearchTerm,
  } = useTableParams()

  const driverColumns = useDriverColumns()

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

  const { data, isLoading, error } = useDrivers({
    search: debouncedSearch,
    page,
    page_size: limit,
    ...filters,
  })

  const drivers = data?.items || []

  const handleRowClick = (driver: Driver) => {
    navigate(path.DASHBOARD.DRIVER_DETAILS.replace(':id', driver.id))
  }

  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setStatus(value.toLowerCase() === 'all' ? null : value.toLowerCase())
    } else if (key === 'date_joined') {
      setStartDate(value.start ? value.start.toISOString() : null)
      setEndDate(value.end ? value.end.toISOString() : null)
    } else if (key === 'vehicle_category') {
      setVehicleCategoryId(value)
    }
  }

  const handleExport = () => {
    if (!data?.items) return
    exportToCSV(data.items, 'drivers-export', [
      { key: 'first_name', label: 'First Name' },
      { key: 'last_name', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone_number', label: 'Phone Number' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date Joined' },
    ])
  }

  const handleRemoveFilter = (key: string) => {
    setPage(1)
    if (key === 'status') {
      setStatus(null)
    } else if (key === 'date_joined') {
      setStartDate(null)
      setEndDate(null)
    } else if (key === 'vehicle_category') {
      setVehicleCategoryId(null)
    }
  }

  const activeFilterChips: ActiveFilter[] = []
  if (status && status !== 'all') {
    activeFilterChips.push({
      key: 'status',
      label: 'Status',
      displayValue: status.charAt(0).toUpperCase() + status.slice(1),
    })
  }
  if (startDate && endDate) {
    activeFilterChips.push({
      key: 'date_joined',
      label: 'Date joined',
      displayValue: formatDateRange(startDate, endDate),
    })
  }
  if (vehicleCategoryId) {
    const categoryName = vehicleCategories?.categories.find(
      (cat) => cat.id === vehicleCategoryId,
    )?.name
    if (categoryName) {
      activeFilterChips.push({
        key: 'vehicle_category',
        label: 'Vehicle category',
        displayValue: categoryName,
      })
    }
  }

  if (error) return <ErrorState message="Failed to load drivers" />

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
        // { label: 'Onboarded', value: 'onboarded' },
        // { label: 'Unonboarded', value: 'unonboarded' },
      ],
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
    {
      label: 'Date joined',
      key: 'date_joined',
      type: 'date-range',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Drivers" />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <PermissionGate permission="drivers:filter">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, phone number, email address, driver ID"
            />
          </PermissionGate>
        </Box>
        <div className="flex gap-3">
          <PermissionGate permission="drivers:filter">
            <FilterMenu
              options={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={{
                status: status || 'all',
                vehicle_category: vehicleCategoryId || undefined,
              }}
            />
          </PermissionGate>
          <PermissionGate permission="drivers:view">
            <ExportButton onClick={handleExport} />
          </PermissionGate>
        </div>
      </Box>

      <FilterChips
        activeFilters={activeFilterChips}
        onRemove={handleRemoveFilter}
      />

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
