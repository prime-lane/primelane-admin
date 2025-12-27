import type { Review, UserRideStats } from '../types'
import { RatingsView, type RatingReview } from '@/components/ui/ratings-view'
import { format } from 'date-fns'

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
  const normalizedReviews: RatingReview[] = reviews.map((review) => ({
    id: review.id,
    rating: review.rating,
    date: format(new Date(review.created_at), 'yyyy-MM-dd'),
    title: 'Rider Review',
    content: review.comment,
  }))

  return (
    <RatingsView
      averageRating={stats?.average_rating || 0}
      totalReviews={reviews.length}
      reviews={normalizedReviews}
      isLoading={isLoading}
    />
  )
}
