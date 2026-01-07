import type { CustomerStats } from '../api/use-customer-stats'
import type { Review } from '../types'
import { RatingsView } from '@/components/ui/ratings-view'

interface CustomerRatingsProps {
  stats?: CustomerStats
  reviews?: Review[]
  isLoading?: boolean
}

export const CustomerRatings = ({
  stats,
  reviews = [],
  isLoading,
}: CustomerRatingsProps) => {
  return (
    <RatingsView
      averageRating={stats?.average_rating || 0}
      totalReviews={reviews.length}
      reviews={reviews}
      isLoading={isLoading}
    />
  )
}
