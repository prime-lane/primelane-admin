import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatCurrency, formatToLocalTimeZone, fromKobo } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/status-badge'
import { IconButton } from '@mui/material'
import { MenuDots } from '@solar-icons/react'
import type { Coupon } from '../types'
import { CouponActionMenu } from './coupon-action-menu'

export const getCouponColumns = (
  onEdit: (coupon: Coupon) => void,
  onExportUsage: (coupon: Coupon) => void,
  onToggle: (coupon: Coupon) => void,
): ColumnDef<Coupon>[] => [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-neutral-900">
        {row.original.code}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Date Created',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.created_at
          ? format(formatToLocalTimeZone(row.original.created_at), 'dd/MM/yyyy, hh:mma')
          : '—'}
      </span>
    ),
  },
  {
    accessorKey: 'usage_type',
    header: 'Coupon Usage',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {row.original.usage_type === 'one_time' ? 'One-time' : 'Multiple use'}
      </span>
    ),
  },
  {
    accessorKey: 'discount_value',
    header: 'Coupon Value',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {row.original.discount_type === 'fixed'
          ? formatCurrency(fromKobo(row.original.discount_value))
          : `${row.original.discount_value}%`}
      </span>
    ),
  },
  {
    accessorKey: 'usage_count',
    header: 'No. of Uses',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-600">
        {row.original.usage_count}
      </span>
    ),
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge status={row.original.is_active ? 'active' : 'inactive'} />
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionMenu
        coupon={row.original}
        onEdit={onEdit}
        onExportUsage={onExportUsage}
        onToggle={onToggle}
      />
    ),
  },
]

const ActionMenu = ({
  coupon,
  onEdit,
  onExportUsage,
  onToggle,
}: {
  coupon: Coupon
  onEdit: (coupon: Coupon) => void
  onExportUsage: (coupon: Coupon) => void
  onToggle: (coupon: Coupon) => void
}) => (
  <CouponActionMenu
    coupon={coupon}
    onEdit={onEdit}
    onExportUsage={onExportUsage}
    onToggle={onToggle}
    stopPropagation
    trigger={(openMenu) => (
      <IconButton size="small" onClick={openMenu}>
        <MenuDots size={24} color="#525866" />
      </IconButton>
    )}
  />
)
