import { Skeleton, Box } from '@mui/material'

export const PricingConfigSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" width={250} height={40} sx={{ mb: 6 }} />

      <div className="max-w-lg mx-auto space-y-10">
        <section className="space-y-4">
          <Skeleton variant="text" width={150} height={24} />
          <div className="space-y-4">
            {Array.from(new Array(5)).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="rounded" width={80} height={28} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export const PricingConfigDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl">
      {/* Breadcrumbs */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={20} />
        <Skeleton variant="text" width={80} />
      </Box>

      {/* Header */}
      <div className="flex justify-between items-center mt-6 mb-12">
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </div>

      <div className="max-w-lg mx-auto space-y-10">
        {/* Trip fare Section */}
        <section className="space-y-6">
          <Skeleton variant="text" width={100} height={28} />

          <div className="space-y-4">
            {Array.from(new Array(3)).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton
                  variant="text"
                  width={200}
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="rounded" width="100%" height={56} />
              </div>
            ))}
          </div>
        </section>

        {/* Cancellation fee Section */}
        <section className="space-y-6">
          <Skeleton variant="text" width={150} height={28} />

          <div className="space-y-4">
            {Array.from(new Array(2)).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton
                  variant="text"
                  width={200}
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="rounded" width="100%" height={56} />
              </div>
            ))}
          </div>
        </section>

        {/* Platform Commission Section */}
        <section className="space-y-6">
          <Skeleton variant="text" width={180} height={28} />

          <div className="space-y-1">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={200} height={16} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width="100%" height={56} />
          </div>
        </section>
      </div>
    </div>
  )
}
