import {
  ExportButton,
  FilterButton,
  SearchInput,
} from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { ErrorState, LoadingState } from '@/components/ui/loading-error-states'
import { useDebounce } from '@/hooks/use-debounce'
import { Box } from '@mui/material'
import { AltArrowDown, FileDownload, } from '@solar-icons/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { useRefunds } from './api/use-finance'
import { refundColumns } from './components/columns'
import type { Refund as RefundType } from './types'

const exportToCSV = (data: RefundType[]) => {
  const headers = [
    'Transaction ID',
    'Transaction Date',
    'Trip ID',
    'Type',
    'Description',
    'Amount Collected',
  ]
  const rows = data.map((item) => [
    item.id,
    format(new Date(item.transaction_date), 'MMM dd, yyyy HH:mm'),
    item.trip_id,
    item.trip_type,
    item.description,
    item.amount_collected,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `refunds-${format(new Date(), 'yyyy-MM-dd')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export const Refund = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data, isLoading, error } = useRefunds({
    search: debouncedSearch,
    limit: 100,
  })

  if (error) return <ErrorState message="Failed to load refunds" />

  const refunds = data?.data || []

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Refunds</h1>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
        <ExportButton
          onClick={() => exportToCSV(refunds)}
          endIcon={<FileDownload size={16} />}
        />
      </Box>

      {isLoading ? (
        <LoadingState />
      ) : (
        <DataTable data={refunds} columns={refundColumns} />
      )}
    </div>
  )
}
