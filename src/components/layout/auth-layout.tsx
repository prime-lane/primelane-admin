import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import MainIllustration from '@/assets/illustrations/cars-in-circle.svg'
import { colors } from '@/theme/colors'

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          background: colors.gray[100],
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          position: 'relative',
          gap: '93px',
          display: { xs: 'none', md: 'flex' },

        }}
      >
        <img
          src={MainIllustration}
          alt="Manage Primelane"
          className='w-[400px] max-w-full'
        />

        <div className="text-center max-w-[480px] space-y-[210px]">
          <Typography variant="h5">MANAGE PRIMELANE</Typography>

          <Typography fontSize={12} lineHeight={-18} color="neutral.500">
            <span className='text-balance'>
              Primelane helps you not only memorize scripture but to let it
              transform your heart, one verse at a time.
            </span>
          </Typography>
        </div>
      </Box>

      {/* Right Side - Content */}
      <div
        
        className='w-full lg:w-1/2 flex flex-col items-center justify-center py-16 lg:py-32 relative gap-[93px] h-full p-4 lg:p-0 max-w-7xl'
      >
        <Box sx={{ width: '100%', maxWidth: '480px' }}>
          <Outlet />
        </Box>
      </div>
    </div>
  )
}
