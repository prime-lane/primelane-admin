import { IconButton, Menu, MenuItem } from '@mui/material'
import { MenuDots } from '@solar-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import type { Role } from '../../types'

const ActionMenu = ({ role }: { role: Role }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    console.log(role.id)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <MenuItem onClick={handleClose}>
          <span className='text-sm font-medium text-[#262626]'>Edit Permissions</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className='text-sm font-medium text-[red]'>Delete Role</span>
        </MenuItem>
      </Menu>
    </>
  )
}

export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: 'Role',
    cell: ({ row }) => (
      <span className="font-medium text-neutral-900">{row.original.name}</span>
    ),
  },
  {
    header: 'Created By',
    cell: () => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-900">-</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionMenu role={row.original} />,
  },
]
