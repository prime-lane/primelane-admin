import { ExportButton, SearchInput } from '@/components/ui/data-controls'
import { DataTable } from '@/components/ui/data-table'
import { PageHeader } from '@/components/ui/page-header'
import { exportToCSV } from '@/utils/export-utils'
import { useDebounce } from '@/hooks/use-debounce'
import { Box, Button } from '@mui/material'
import { UserCross } from '@solar-icons/react'
import { useMemo, useState } from 'react'

import {
  useCreateRole,
  useDeleteRole,
  usePaginatedRoles,
  useUpdateRole,
} from '../api/use-admins'
import type { Role } from '../types'
import { getRoleColumns } from './components/columns'
import { DeleteRoleModal } from './components/delete-role-modal'
import { RoleModal } from './components/role-modal'
import { useTableParams } from '@/hooks/use-table-params'
import { PermissionGate } from '@/components/ui/permission-gate'

export const RolesManagement = () => {
  const { page, setPage, pageSize, setPageSize, search, setSearch } =
    useTableParams()

  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)

  const createRole = useCreateRole()
  const updateRole = useUpdateRole()
  const deleteRole = useDeleteRole()

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = usePaginatedRoles({
    page,
    page_size: pageSize,
    search: debouncedSearch,
  })

  const handleCreate = () => {
    setEditingRole(null)
    setRoleModalOpen(true)
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setRoleModalOpen(true)
  }

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role)
  }

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      deleteRole.mutate(roleToDelete.id, {
        onSuccess: () => setRoleToDelete(null),
      })
    }
  }

  const handleRoleSubmit = (data: { name: string; permissions: string[] }) => {
    if (editingRole) {
      updateRole.mutate(
        { id: editingRole.id, data },
        {
          onSuccess: () => setRoleModalOpen(false),
        },
      )
    } else {
      createRole.mutate(data, {
        onSuccess: () => setRoleModalOpen(false),
      })
    }
  }

  const handleExport = () => {
    if (!data?.items) return
    exportToCSV(data.items, 'roles-export', [
      { key: 'name', label: 'Role Name' },
      { key: 'permissions', label: 'Number of Permissions' },
      { key: 'createdAt', label: 'Created At' },
    ])
  }

  const columns = useMemo(
    () => getRoleColumns(handleEdit, handleDeleteClick),
    [],
  )

  const isSaving = createRole.isPending || updateRole.isPending

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        action={
          <PermissionGate permission="rbac:create_role">
            <Button
              variant="contained"
              onClick={handleCreate}
              endIcon={<UserCross className="text-white" />}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'neutral.800' },
              }}
            >
              Create
            </Button>
          </PermissionGate>
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
          <ExportButton onClick={handleExport} />
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

      <RoleModal
        open={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSubmit={handleRoleSubmit}
        initialData={editingRole}
        isLoading={isSaving}
      />

      <DeleteRoleModal
        open={Boolean(roleToDelete)}
        onClose={() => setRoleToDelete(null)}
        onConfirm={handleConfirmDelete}
        roleName={roleToDelete?.name}
        isLoading={deleteRole.isPending}
      />
    </div>
  )
}
