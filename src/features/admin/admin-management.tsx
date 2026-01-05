import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { FilterMenu } from '@/components/ui/filter-menu'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { exportToCSV } from '@/utils/export-utils'
import { Box, Button } from '@mui/material'
import { UserPlus } from '@solar-icons/react'
import { useState } from 'react'
import { useQueryState, parseAsString } from 'nuqs'
import { useAdmins } from './api/use-admins'
import { adminColumns } from './components/columns'
import { InviteAdminModal } from './components/invite-admin-modal'

import { useDebounce } from '@/hooks/use-debounce'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'
import { formatDateToLocal } from '@/lib/utils'

export const AdminManagement = () => {
  const { page, setPage, pageSize, setPageSize, search, setSearch } =
    useTableParams()

  const [status, setStatus] = useQueryState('status', parseAsString)
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  // Sync state to filters object for API hook
  const filters = {
    status: status || undefined,
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  }

  const { data, isLoading } = useAdmins({
    page,
    page_size: pageSize,
    search: debouncedSearch,
    ...filters,
  })

  // Handle filter changes via URL updates
  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setStatus(value.toLowerCase() === 'all' ? null : value.toLowerCase())
    } else if (key === 'date_joined') {
      setStartDate(value.start ? formatDateToLocal(value.start) : null)
      setEndDate(value.end ? formatDateToLocal(value.end) : null)
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
          <PermissionGate permission="admin_management:invite">
            <Button
              variant="contained"
              onClick={() => setIsInviteModalOpen(true)}
              endIcon={<UserPlus className="text-white" />}
            >
              Invite
            </Button>
          </PermissionGate>
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
          <PermissionGate permission="admin_management:filter">
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
                status: status || 'all',
              }}
            />
          </PermissionGate>
          <PermissionGate permission="admin_management:export">
            <ExportButton onClick={handleExport} />
          </PermissionGate>
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
