import { Box, Skeleton } from '@mui/material'

export const DetailsSkeleton = () => {
  return (
    <Box>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={20} />
        <Skeleton variant="text" width={120} />
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 6,
        }}
      >
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Skeleton variant="circular" width={51} height={51} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Skeleton variant="text" width={200} height={32} />
            <Skeleton variant="text" width={150} height={20} />
          </Box>
          <Skeleton variant="rounded" width={80} height={24} />
        </Box>
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          mb: 6,
          display: 'flex',
          gap: 4,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="text" width={80} height={40} />
        <Skeleton variant="text" width={100} height={40} />
        <Skeleton variant="text" width={80} height={40} />
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Personal Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {Array.from(new Array(5)).map((_, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
              >
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={150} height={24} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Trip Summary */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            {Array.from(new Array(4)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={110}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
