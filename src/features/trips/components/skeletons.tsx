import { Skeleton, Box } from '@mui/material'

export const TripDetailsSkeleton = () => {
  return (
    <div className="space-y-9">
      <div>
        {/* Breadcrumbs */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={20} />
          <Skeleton variant="text" width={100} />
        </Box>

        {/* Header */}
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width={150} height={40} />
        </div>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {/* Parties Involved */}
        <div className="grid grid-cols-1 gap-2">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-neutral-100 last:border-0 pb-4">
              <Skeleton variant="text" width={160} height={20} />
              <Skeleton variant="text" width={200} height={20} />
            </div>
            <div className="flex items-center gap-4 border-b border-neutral-100 last:border-0 pb-4">
              <Skeleton variant="text" width={160} height={20} />
              <Skeleton variant="text" width={200} height={20} />
            </div>
          </div>
        </div>

        {/* Trip Info */}
        <div className="grid grid-cols-1 gap-2">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex flex-col gap-6">
            {Array.from(new Array(4)).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-neutral-100 last:border-0 pb-4"
              >
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={150} height={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-1 gap-2">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex flex-col gap-6">
            {Array.from(new Array(2)).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-neutral-100 last:border-0 pb-4"
              >
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={250} height={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Financial Info */}
        <div className="grid grid-cols-1 gap-4">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex flex-col gap-6">
            {Array.from(new Array(3)).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-neutral-100 last:border-0 pb-4"
              >
                <Skeleton variant="text" width={160} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
