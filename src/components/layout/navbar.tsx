import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material'
import { AltArrowDown, HamburgerMenu } from '@solar-icons/react'
import { useState } from 'react'
import {
  useCurrentUser,
  useLogout,
} from '@/features/auth/hooks/use-current-user'
import { getInitials } from '@/lib/utils'

interface NavbarProps {
  onSidebarOpen?: () => void
}

export const Navbar = ({ onSidebarOpen }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { data: user } = useCurrentUser()
  const logout = useLogout()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    logout()
  }

  const displayName = user ? user.first_name : 'User'
  const avatarInitials = user
    ? getInitials(user.first_name, user.last_name)
    : 'U'

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        // width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        // ml: { md: `${DRAWER_WIDTH}px` },
        bgcolor: 'neutral.50',
        px: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: { md: 'flex-end', xs: 'space-between' },
          minHeight: '80px !important',
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarOpen}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <HamburgerMenu size={30} />
        </IconButton>
        <div className="flex items-center">
          <IconButton
            onClick={handleClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Avatar
              src={user?.image_url || undefined}
              sx={{
                width: 27,
                height: 27,
                bgcolor: 'neutral.300',
                color: 'neutral.700',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {avatarInitials}
            </Avatar>
            <span className="text-base">{displayName}</span>
            <AltArrowDown size={16} color="#000" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              mt: 1,
            }}
          >
            <MenuItem onClick={handleLogout}>
              <span className="text-sm text-neutral-500">Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
