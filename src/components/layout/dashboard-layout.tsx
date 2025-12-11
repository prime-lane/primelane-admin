import { Outlet } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Paper
        sx={{
          width: 240,
          borderRadius: 0,
          display: { xs: 'none', md: 'block' },
        }}
        elevation={1}
      >
        <Box p={2}>Sidebar</Box>
      </Paper>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
