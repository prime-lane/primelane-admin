import { Box, Button } from '@mui/material'
import { AddCircle } from '@solar-icons/react'
import { usePaginatedRoles } from '../api/use-admins'
import { DataTable } from '@/components/ui/data-table'
import { SearchInput, FilterButton } from '@/components/ui/data-controls'
import { PageHeader } from '@/components/ui/page-header'
import { roleColumns } from './components/columns'
import { useDebounce } from '@/hooks/use-debounce'
import { useState } from 'react'

export const RolesManagement = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = usePaginatedRoles({
    page,
    page_size: pageSize,
    search: debouncedSearch,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        action={
          <Button
            variant="contained"
            onClick={() => {}}
            endIcon={<AddCircle />}
            sx={{
              bgcolor: 'black',
              color: 'white',
              '&:hover': { bgcolor: 'neutral.800' },
            }}
          >
            Create
          </Button>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by role..."
          />
        </Box>
        <div className="flex gap-3">
          <FilterButton>Filter</FilterButton>
        </div>
      </Box>

      <DataTable
        data={data?.items || []}
        columns={roleColumns}
        isLoading={isLoading}
        pagination={{
          currentPage:
            typeof data?.pagination?.current_page === 'string'
              ? parseInt(data.pagination.current_page)
              : data?.pagination?.current_page || 1,
          totalPages: data?.pagination?.total_pages || 1,
          totalItems: data?.pagination?.total_items || 0,
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
