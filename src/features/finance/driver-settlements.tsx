import {
  ExportButton,
  FilterButton,
  SearchInput,
} from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'
import { AltArrowDown, FileDownload } from '@solar-icons/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDriverSettlements } from './api/use-finance'
import { driverSettlementColumns } from './components/columns'
import type { DriverSettlement } from './types'

const exportToCSV = (data: DriverSettlement[]) => {
  const headers = [
    'Settlement ID',
    'Settlement Date',
    'Trip ID',
    'Type',
    'Fare Charged',
    'Platform Earning',
    'Driver Earning',
    'Amount',
    'Status',
  ]
  const rows = data.map((item) => [
    item.settlement_id,
    format(new Date(item.settlement_date), 'MMM dd, yyyy'),
    item.trip_id,
    item.trip_type,
    item.fare_charged,
    item.platform_earning,
    item.driver_earning,
    item.amount,
    item.status,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `driver-settlements-${format(new Date(), 'yyyy-MM-dd')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const DriverSettlements = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useDriverSettlements({
    search: debouncedSearch,
    page,
    page_size: limit,
  })

  if (error) return <ErrorState message="Failed to load driver settlements" />

  const settlements = data?.data || []

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Driver Settlements</h1>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
        <ExportButton
          onClick={() => exportToCSV(settlements)}
          endIcon={<FileDownload size={16} />}
        />
      </Box>

      <DataTable
        data={settlements}
        columns={driverSettlementColumns}
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
