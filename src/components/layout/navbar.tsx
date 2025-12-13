import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material'
import { DRAWER_WIDTH } from '@/config/dashboard'

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        bgcolor: 'neutral.50',
        borderBottom: 1,
        borderColor: 'neutral.200',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'flex-end',
          minHeight: '80px !important',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                bgcolor: 'neutral.100',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'neutral.300',
                color: 'neutral.700',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              T
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                color: 'neutral.900',
                fontWeight: 500,
              }}
            >
              Timothy
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
