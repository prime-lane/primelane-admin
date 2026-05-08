import { Box, Skeleton } from '@mui/material'

export const CouponDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Breadcrumbs */}
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Skeleton variant="text" width={70} />
      <Skeleton variant="text" width={20} />
      <Skeleton variant="text" width={100} />
    </Box>

    {/* Header */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="text" width={180} height={36} />
          <Skeleton variant="rounded" width={60} height={24} />
        </Box>
        <Skeleton variant="text" width={200} height={20} />
      </Box>
      <Skeleton variant="rounded" width={110} height={40} />
    </Box>

    {/* Tabs */}
    <Box
      sx={{ display: 'flex', gap: 4, borderBottom: 1, borderColor: 'divider' }}
    >
      <Skeleton variant="text" width={80} height={40} />
      <Skeleton variant="text" width={110} height={40} />
    </Box>

    {/* Coupon details section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="text" width={120} height={20} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <Box
            key={i}
            sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
          >
            <Skeleton variant="text" width={100} height={16} />
            <Skeleton variant="text" width={140} height={22} />
          </Box>
        ))}
      </Box>
    </Box>

    {/* Usage summary */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="text" width={130} height={20} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  </div>
)
