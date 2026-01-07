import type { Review, UserRideStats } from '../types'
import { RatingsView } from '@/components/ui/ratings-view'

interface DriverRatingsProps {
  stats?: UserRideStats
  reviews?: Review[]
  isLoading?: boolean
}

export const DriverRatings = ({
  stats,
  reviews = [],
  isLoading,
}: DriverRatingsProps) => {
  return (
    <RatingsView
      averageRating={stats?.average_rating || 0}
      totalReviews={reviews.length}
      reviews={reviews}
      isLoading={isLoading}
    />
  )
}
