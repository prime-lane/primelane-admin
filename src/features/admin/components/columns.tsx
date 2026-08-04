import { IconButton } from '@mui/material'
import { ArrowRightUp, MenuDots } from '@solar-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { StatusBadge } from '@/components/ui/status-badge'
import type { Admin } from '../types'
import { formatToLocalTimeZone } from '@/lib/utils'
import { AdminActionMenu } from './admin-action-menu'

interface AdminColumnActions {
  onEdit: (admin: Admin) => void
  onResetPassword: (admin: Admin) => void
  onToggleStatus: (admin: Admin) => void
  onResendInvite: (admin: Admin) => void
}

export const getAdminColumns = ({
  onEdit,
  onResetPassword,
  onToggleStatus,
  onResendInvite,
}: AdminColumnActions): ColumnDef<Admin>[] => [
  {
    accessorKey: 'custom_user_id',
    header: 'Admin ID',
    cell: (info) => (
      <span className="text-sm text-neutral-900">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'last_login_at',
    header: 'Last Active',
    cell: (info) => {
      const val = info.getValue() as string
      return (
        <span className="text-sm font-medium text-neutral-900">
          {val ? format(formatToLocalTimeZone(val), 'dd/MM/yyyy, hh:mma') : '-'}
        </span>
      )
    },
  },
  {
    accessorKey: 'first_name',
    header: 'Name/Role',
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-neutral-900">
          {row.original.first_name} {row.original.last_name}
        </span>
        <span className="text-xs text-neutral-500">
          {row.original.role_name || 'N/A'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    cell: (info) => (
      <a
        href={`mailto:${info.getValue() as string}`}
        className="flex items-center gap-1 cursor-pointer"
      >
        <span className="text-sm font-medium text-neutral-900">
          {info.getValue() as string}
        </span>
        <ArrowRightUp size={16} color="#9095A1" />
      </a>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue() as any} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <AdminActionMenu
        admin={row.original}
        onEdit={onEdit}
        onResetPassword={onResetPassword}
        onToggleStatus={onToggleStatus}
        onResendInvite={onResendInvite}
        trigger={(openMenu) => (
          <IconButton size="small" onClick={openMenu}>
            <MenuDots size={24} color="#525866" />
          </IconButton>
        )}
      />
    ),
  },
]
