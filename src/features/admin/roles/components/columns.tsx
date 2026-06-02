import { IconButton, Menu, MenuItem } from '@mui/material'
import { MenuDots } from '@solar-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { Role } from '../../types'
import { usePermissionsContext } from '@/hooks/permissions-context'

const ActionMenu = ({
  role,
  onEdit,
  onDelete,
}: {
  role: Role
  onEdit: (role: Role) => void
  onDelete: (role: Role) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { hasPermission } = usePermissionsContext()

  const canEdit = hasPermission('rbac:update_role')
  const canDelete = hasPermission('rbac:delete_role')

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit(role)
    handleClose()
  }

  const handleDelete = () => {
    onDelete(role)
    handleClose()
  }

  if (!canEdit && !canDelete) return null

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MenuDots size={24} color="#525866" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {canEdit && (
          <MenuItem
            onClick={handleEdit}
            sx={{ bgcolor: '#F3F4F6', justifyContent: 'center' }}
          >
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-tight">
              Edit Permissions
            </span>
          </MenuItem>
        )}
        {canDelete && (
          <MenuItem onClick={handleDelete}>
            <span className="text-sm font-medium text-red-400 uppercase tracking-tight text-center">
              Delete Role
            </span>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export const getRoleColumns = (
  onEdit: (role: Role) => void,
  onDelete: (role: Role) => void,
): ColumnDef<Role>[] => [
  {
    accessorKey: 'name',
    header: 'Role',
    cell: ({ row }) => (
      <span className="font-medium text-neutral-900">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'permissions',
    header: 'Number of Permissions',
    cell: ({ row }) => (
      <span className="font-medium text-neutral-900">
        {row.original.permissions.length}
      </span>
    ),
  },
  {
    accessorKey: 'creator_first_name',
    header: 'Created By',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-900">{`${row.original.creator_first_name} ${row.original.creator_last_name}`}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionMenu role={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
]
