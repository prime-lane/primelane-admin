import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material'
import { AltArrowDown } from '@solar-icons/react'
import { useState } from 'react'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
          justifyContent: 'flex-end',
          minHeight: '80px !important',
          
        }}
      >
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
              sx={{
                width: 27,
                height: 27,
                bgcolor: 'neutral.300',
                color: 'neutral.700',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              T
            </Avatar>
            <span className="text-base">Timothy</span>
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
            <MenuItem onClick={handleClose}><span className="text-base">Profile</span></MenuItem>
            <MenuItem onClick={handleClose}><span className="text-base">Logout</span></MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
