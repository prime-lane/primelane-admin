import { IconButton } from '@mui/material'
import { ArrowRightUp, MenuDots } from '@solar-icons/react'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { StatusBadge } from '@/components/ui/status-badge'
import type { Admin } from '../types'

export const adminColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'id',
    header: 'Admin ID',
    cell: (info) => (
      <span className="text-sm text-neutral-900">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'last_active_at',
    header: 'Last Active',
    cell: (info) => {
      const val = info.getValue() as string
      return (
        <span className="text-sm font-medium text-neutral-900">
          {val ? format(new Date(val), 'dd/MM/yyyy') : '-'}
        </span>
      )
    },
  },
  {
    accessorKey: 'first_name',
    header: 'Name/Role',
    cell: ({ row }) => (
      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium text-neutral-900">
          {row.original.first_name} {row.original.last_name}
        </span>
        <span className="text-xs text-neutral-500">
          {row.original.user_type}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    cell: (info) => (
      <a href={`mailto:${info.getValue() as string}`} className="flex items-center gap-1 cursor-pointer">
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
    cell: () => (
      <IconButton size="small">
        <MenuDots size={24} color="#525866" />
      </IconButton>
    ),
  },
]
