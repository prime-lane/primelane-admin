import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { FilterMenu } from '@/components/ui/filter-menu'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { buildQueryParams, formatDateToLocal } from '@/lib/utils'
import { downloadExport } from '@/utils/export-utils'
import { Box, Button } from '@mui/material'
import { UserPlus } from '@solar-icons/react'
import { useState, useMemo, useCallback } from 'react'
import { useQueryState, parseAsString } from 'nuqs'
import { useAdmins } from './api/use-admins'
import { getAdminColumns } from './components/columns'
import { InviteAdminModal } from './components/invite-admin-modal'
import { EditAdminModal } from './components/edit-admin-modal'
import { useDebounce } from '@/hooks/use-debounce'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'
import { useManageUserStatus } from '@/features/shared/api/use-users'
import { useInitializePasswordReset } from '@/features/auth/api/use-auth'
import type { Admin } from './types'

export const AdminManagement = () => {
  const { page, setPage, pageSize, setPageSize, search, setSearch } =
    useTableParams()

  const [status, setStatus] = useQueryState('status', parseAsString)
  const [startDate, setStartDate] = useQueryState('start_date', parseAsString)
  const [endDate, setEndDate] = useQueryState('end_date', parseAsString)

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [statusTargetId, setStatusTargetId] = useState<string | undefined>()

  const debouncedSearch = useDebounce(search, 500)

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

  const { mutate: manageStatus } = useManageUserStatus(statusTargetId)
  const { mutate: initializePasswordReset } = useInitializePasswordReset()

  const handleFilterChange = (key: string, value: any) => {
    setPage(1)
    if (key === 'status') {
      setStatus(value.toLowerCase() === 'all' ? null : value.toLowerCase())
    } else if (key === 'date_joined') {
      setStartDate(value.start ? formatDateToLocal(value.start) : null)
      setEndDate(value.end ? formatDateToLocal(value.end) : null)
    }
  }

  const handleToggleStatus = useCallback(
    (admin: Admin) => {
      setStatusTargetId(admin.id)
      const action = admin.status === 'active' ? 'deactivate' : 'activate'
      manageStatus({ action })
    },
    [manageStatus],
  )

  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    const params = buildQueryParams({
      search: debouncedSearch || undefined,
      user_type: 'admin',
      ...filters,
    })
    const qs = params.toString()
    setIsExporting(true)
    try {
      await downloadExport(`/users${qs ? `?${qs}` : ''}`)
    } finally {
      setIsExporting(false)
    }
  }

  const columns = useMemo(
    () =>
      getAdminColumns({
        onEdit: (admin) => setEditingAdmin(admin),
        onResetPassword: (admin) => {
          initializePasswordReset({ user_id: admin.id })
        },
        onToggleStatus: handleToggleStatus,
      }),
    [handleToggleStatus, initializePasswordReset],
  )

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
                    { label: 'Pending', value: 'pending' },
                    { label: 'Active', value: 'active' },
                    { label: 'Deactivated', value: 'deactivated' },
                  ],
                },
                {
                  label: 'Date Joined',
                  key: 'date_joined',
                  type: 'date-range',
                },
              ]}
              onFilterChange={handleFilterChange}
              activeFilters={{ status: status || 'all' }}
            />
          </PermissionGate>
          <PermissionGate permission="admin_management:export">
            <ExportButton onClick={handleExport} isLoading={isExporting} />
          </PermissionGate>
        </div>
      </Box>

      <DataTable
        data={data?.items || []}
        columns={columns}
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

      {editingAdmin && (
        <EditAdminModal
          open={Boolean(editingAdmin)}
          onClose={() => setEditingAdmin(null)}
          admin={editingAdmin}
        />
      )}
    </div>
  )
}
