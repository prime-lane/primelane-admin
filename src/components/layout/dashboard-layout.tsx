import { DRAWER_WIDTH, NAV_ITEMS } from '@/config/dashboard'
import { Logout } from '@solar-icons/react'
import { Outlet } from 'react-router-dom'
import { Box, Drawer } from '@mui/material'
import logo from '../../assets/icon/logo.svg'
import { SidebarNavItem } from './sidebar-nav-item'
import { Navbar } from './navbar'
import { useLogout } from '@/features/auth/hooks/use-current-user'

export const DashboardLayout = () => {
  const logout = useLogout()
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            border: 0,
            bgcolor: 'neutral .50',
          },
        }}
      >
        <Box className="h-20 flex items-center px-8">
          <img src={logo} alt="Primelane Logo" className="h-10" />
        </Box>

        <nav className="flex-1 px-3 py-5 space-y-3 overflow-auto">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              to={item.to}
              hasSubmenu={item.hasSubmenu}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <SidebarNavItem
            label="Log Out"
            icon={Logout}
            variant="button"
            onClick={() => logout()}
          />
        </div>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <div className="flex-1 py-2 px-4 max-w-7xl">
          <Outlet />
        </div>
      </Box>
    </Box>
  )
}
