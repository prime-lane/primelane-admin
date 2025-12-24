import { Skeleton } from '@mui/material'

export const IdentitySkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from(new Array(3)).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={82}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Ride Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from(new Array(3)).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={82}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Details List Section */}
      <div className="space-y-4">
        <Skeleton variant="text" width={150} height={24} />
        <div className="flex flex-col gap-1">
          {Array.from(new Array(10)).map((_, i) => (
            <div key={i} className="flex items-center py-3 gap-4">
              <Skeleton variant="text" width={20} />
              <Skeleton variant="text" width={160} />
              <div className="w-4" /> {/* Spacer for hyphen */}
              <Skeleton variant="text" width={200} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const RatingsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="space-y-4">
        <Skeleton variant="text" width={100} height={24} />
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={82}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={82}
            sx={{ borderRadius: 2 }}
          />
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="space-y-4">
        <Skeleton variant="text" width={200} height={24} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
          {Array.from(new Array(5)).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 w-full max-w-[200px]">
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width={30} height={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton
            variant="rounded"
            width={100}
            height={32}
            sx={{ borderRadius: 100 }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from(new Array(4)).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={150}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const LicenseSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton variant="text" width={200} height={24} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from(new Array(5)).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={82}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const VehicleSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <Skeleton variant="text" width={150} height={24} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from(new Array(5)).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={82}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-4">
        <Skeleton variant="text" width={180} height={24} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(new Array(5)).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
