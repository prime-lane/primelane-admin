import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Coupon } from '../types'

interface CouponActionMenuProps {
  coupon: Coupon
  trigger: (openMenu: (event: React.MouseEvent<HTMLElement>) => void) => ReactNode
  onEdit: (coupon: Coupon) => void
  onExportUsage: (coupon: Coupon) => void
  onToggle: (coupon: Coupon) => void
  isExporting?: boolean
  stopPropagation?: boolean
}

const baseItemSx = {
  justifyContent: 'center',
  py: 3,
  px: 3,
  borderRadius: '0px',
}

export const CouponActionMenu = ({
  coupon,
  trigger,
  onEdit,
  onExportUsage,
  onToggle,
  isExporting = false,
  stopPropagation = false,
}: CouponActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setAnchorEl(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (stopPropagation) event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const withOptionalStop = (event: React.MouseEvent<HTMLElement>) => {
    if (stopPropagation) event.stopPropagation()
  }

  return (
    <>
      {trigger(handleOpen)}
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
          onClick={(event) => {
            withOptionalStop(event)
            onEdit(coupon)
            handleClose()
          }}
          sx={{
            ...baseItemSx,
            bgcolor: '#F3F4F6',
            '&:hover': { bgcolor: '#EAECEF' },
          }}
        >
          <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
            Edit Coupon
          </span>
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            withOptionalStop(event)
            onExportUsage(coupon)
            handleClose()
          }}
          disabled={isExporting}
          sx={{
            ...baseItemSx,
            bgcolor: '#F3F4F6',
            '&:hover': { bgcolor: '#EAECEF' },
          }}
        >
          <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
            {isExporting ? 'Exporting...' : 'Export Usage Record'}
          </span>
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            withOptionalStop(event)
            onToggle(coupon)
            handleClose()
          }}
          sx={{
            ...baseItemSx,
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
