import { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput, FilterButton } from '@/components/ui/data-controls'
import { driverColumns } from './components/columns'
import { getMockDrivers } from './components/utils'
import { globalFilter } from '@/utils/table-utils'
import type { Driver } from './types'

export const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const drivers = useMemo(() => getMockDrivers(), [])

  const filteredDrivers = useMemo(() => {
    return globalFilter<Driver>(drivers, searchTerm, [
      'name',
      'id',
      'phone',
      'email',
    ])
  }, [drivers, searchTerm])

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
        <h1 className="text-4xl">Drivers</h1>
      </Box>

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

      <DataTable data={filteredDrivers} columns={driverColumns} />
    </Box>
  )
}
