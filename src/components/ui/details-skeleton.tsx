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
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: 2 }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </Box>
  )
}
