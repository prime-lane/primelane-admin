import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { FilterMenu } from '@/components/ui/filter-menu'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { exportToCSV } from '@/utils/export-utils'
import { Box, Button } from '@mui/material'
import { UserPlus } from '@solar-icons/react'
import { useState } from 'react'
import { useAdmins } from './api/use-admins'
import { adminColumns } from './components/columns'
import { InviteAdminModal } from './components/invite-admin-modal'

import { useDebounce } from '@/hooks/use-debounce'

export const AdminManagement = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const [filters, setFilters] = useState<{
    status?: string
    start_date?: string
    end_date?: string
  }>({})

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = useAdmins({
    page,
    page_size: pageSize,
    search: debouncedSearch,
    ...filters,
  })

  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setFilters((prev) => ({
        ...prev,
        status: value.toLowerCase() === 'all' ? undefined : value.toLowerCase(),
      }))
    } else if (key === 'date_joined') {
      setFilters((prev) => ({
        ...prev,
        start_date: value.start ? value.start.toISOString() : undefined,
        end_date: value.end ? value.end.toISOString() : undefined,
      }))
    }
  }

  const handleExport = () => {
    if (!data?.items) return
    exportToCSV(data.items, 'admins-export', [
      { key: 'first_name', label: 'First Name' },
      { key: 'last_name', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Date Joined' },
    ])
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Management"
        action={
          <Button
            variant="contained"
            onClick={() => setIsInviteModalOpen(true)}
            endIcon={<UserPlus className="text-white" />}
          >
            Invite
          </Button>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by admin id, name..."
          />
        </Box>
        <div className="flex gap-3">
          <FilterMenu
            options={[
              {
                label: 'Status',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ],
              },
              {
                label: 'Date Joined',
                key: 'date_joined',
                type: 'date-range',
              },
            ]}
            onFilterChange={handleFilterChange}
            activeFilters={{
              status: filters.status || 'all',
            }}
          />
          <ExportButton onClick={handleExport} />
        </div>
      </Box>

      <DataTable
        data={data?.items || []}
        columns={adminColumns}
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

      <InviteAdminModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  )
}
