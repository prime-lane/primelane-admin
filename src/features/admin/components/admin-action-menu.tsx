import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Admin } from '../types'
import { usePermissionsContext } from '@/hooks/permissions-context'

interface AdminActionMenuProps {
  admin: Admin
  trigger: (
    openMenu: (event: React.MouseEvent<HTMLElement>) => void,
  ) => ReactNode
  onEdit: (admin: Admin) => void
  onResetPassword: (admin: Admin) => void
  onToggleStatus: (admin: Admin) => void
  onResendInvite: (admin: Admin) => void
}

const baseItemSx = {
  justifyContent: 'center',
  py: 3,
  px: 3,
  borderRadius: '0px',
}

export const AdminActionMenu = ({
  admin,
  trigger,
  onEdit,
  onResetPassword,
  onToggleStatus,
  onResendInvite,
}: AdminActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { hasPermission } = usePermissionsContext()

  const canEdit = hasPermission('admin_management:edit')
  const canResendInvite =
    admin.status === 'pending' && hasPermission('admin_management:invite')

  const handleClose = () => setAnchorEl(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const stop = (event: React.MouseEvent<HTMLElement>) => event.stopPropagation()

  const isActive = admin.status === 'active'

  if (!canEdit && !canResendInvite) return null

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
              width: 200,
              p: 1,
              boxShadow: '0px 8px 24px rgba(16, 24, 40, 0.08)',
              borderRadius: '2px',
            },
          },
          list: {
            sx: { p: 0, display: 'grid', gap: 0.5 },
          },
        }}
      >
        {canEdit && (
          <MenuItem
            onClick={(event) => {
              stop(event)
              onEdit(admin)
              handleClose()
            }}
            sx={{
              ...baseItemSx,
              bgcolor: '#F3F4F6',
              '&:hover': { bgcolor: '#EAECEF' },
            }}
          >
            <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
              Edit Account
            </span>
          </MenuItem>
        )}

        {canResendInvite && (
          <MenuItem
            onClick={(event) => {
              stop(event)
              onResendInvite(admin)
              handleClose()
            }}
            sx={{
              ...baseItemSx,
              bgcolor: '#F3F4F6',
              '&:hover': { bgcolor: '#EAECEF' },
            }}
          >
            <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
              Resend Invite
            </span>
          </MenuItem>
        )}

        {canEdit && (
          <MenuItem
            onClick={(event) => {
              stop(event)
              onResetPassword(admin)
              handleClose()
            }}
            sx={{
              ...baseItemSx,
              bgcolor: '#F3F4F6',
              '&:hover': { bgcolor: '#EAECEF' },
            }}
          >
            <span className="text-xs font-medium uppercase tracking-tight text-neutral-500">
              Reset Password
            </span>
          </MenuItem>
        )}

        {canEdit && (
          <MenuItem
            onClick={(event) => {
              stop(event)
              onToggleStatus(admin)
              handleClose()
            }}
            sx={{
              ...baseItemSx,
              bgcolor: isActive ? '#FDEEEE' : '#EBF8EF',
              '&:hover': { bgcolor: isActive ? '#FBE3E3' : '#DDF2E3' },
            }}
          >
            <span
              className="text-xs font-medium uppercase tracking-tight"
              style={{ color: isActive ? '#DC2626' : '#16A34A' }}
            >
              {isActive ? 'Deactivate Account' : 'Activate Account'}
            </span>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
