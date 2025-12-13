import { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput, FilterButton } from '@/components/ui/data-controls'
import { customerColumns } from './components/columns'
import { getMockCustomers } from './components/utils'
import { globalFilter } from '@/utils/table-utils'
import type { Customer } from './types'

export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const customers = useMemo(() => getMockCustomers(), [])

  const filteredCustomers = useMemo(() => {
    return globalFilter<Customer>(customers, searchTerm, [
      'name',
      'id',
      'phone',
      'email',
    ])
  }, [customers, searchTerm])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <h1 className="text-4xl">Customer</h1>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <FilterButton className="space-x-2">
          <span>Filter By</span>
          <AltArrowDown size={16} color="#000" />
        </FilterButton>
      </Box>

      <DataTable data={filteredCustomers} columns={customerColumns} />
    </Box>
  )
}
