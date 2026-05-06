import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/status-badge'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MenuDots } from '@solar-icons/react'
import { useState } from 'react'
import type { Coupon } from '../types'

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
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          setAnchorEl(e.currentTarget)
        }}
      >
        <MenuDots size={24} color="#525866" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              width: 180,
              p: 1,
              boxShadow: '0px 8px 24px rgba(16, 24, 40, 0.08)',
              borderRadius: '2px',
            },
          },
          list: {
            sx: {
              p: 0,
              display: 'grid',
              gap: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            onEdit(coupon)
            handleClose()
          }}
          sx={{
            justifyContent: 'center',
            py: 3,
            px: 3,
            borderRadius: '0px',
            bgcolor: '#F3F4F6',
            '&:hover': { bgcolor: '#EAECEF' },
          }}
        >
          <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
            Edit Coupon
          </span>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            onExportUsage(coupon)
            handleClose()
          }}
          sx={{
            justifyContent: 'center',
            py: 3,
            px: 3,
            borderRadius: '0px',
            bgcolor: '#F3F4F6',
            '&:hover': { bgcolor: '#EAECEF' },
          }}
        >
          <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
            Export Usage Record
          </span>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            onToggle(coupon)
            handleClose()
          }}
          sx={{
            justifyContent: 'center',
            py: 3,
            px: 3,
            borderRadius: '0px',
            bgcolor: coupon.is_active ? '#FDEEEE' : '#EBF8EF',
            '&:hover': {
              bgcolor: coupon.is_active ? '#FBE3E3' : '#DDF2E3',
            },
          }}
        >
          <span
            className="text-xs font-medium uppercase tracking-tight"
            style={{ color: coupon.is_active ? '#DC2626' : '#16A34A' }}
          >
            {coupon.is_active ? 'Disable Coupon' : 'Enable Coupon'}
          </span>
        </MenuItem>
      </Menu>
    </>
  )
}

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
          ? format(new Date(row.original.created_at), 'dd/MM/yyyy')
          : '—'}
      </span>
    ),
  },
  {
    accessorKey: 'usage_type',
    header: 'Coupon Usage',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {row.original.usage_type === 'one_time'
          ? 'One-time per customer'
          : 'Multiple use'}
      </span>
    ),
  },
  {
    accessorKey: 'discount_value',
    header: 'Coupon Value',
    cell: ({ row }) => (
      <span className="text-sm text-neutral-800">
        {row.original.discount_type === 'fixed'
          ? formatCurrency(row.original.discount_value)
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
