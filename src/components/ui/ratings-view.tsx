import { Card, CardContent } from '@mui/material'
import { Star } from '@solar-icons/react'
import { RatingsSkeleton } from './tab-skeletons'
import { StatsCard } from '@/features/customers/components/stats-card'

export interface RatingReview {
  id: string
  rating: number
  date: string
  title: string
  content: string
}

interface RatingsViewProps {
  averageRating: number
  totalReviews: number
  reviews: RatingReview[]
  isLoading?: boolean
}

const RatingBreakdownRow = ({
  star,
  count,
}: {
  star: number
  count: number
}) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[200px]">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            weight={i < star ? 'Bold' : 'Linear'}
            size={16}
            className={i < star ? 'text-yellow-400' : 'text-neutral-200'}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{count}</span>
    </div>
  )
}

const ReviewCard = ({ review }: { review: RatingReview }) => {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-900">{review.title}</h4>
          <span className="text-xs text-neutral-500">{review.date}</span>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              weight={i < review.rating ? 'Bold' : 'Linear'}
              size={14}
              className={
                i < review.rating ? 'text-yellow-400' : 'text-neutral-200'
              }
            />
          ))}
        </div>
        <p className="text-sm text-neutral-600 line-clamp-3">
          {review.content}
        </p>
      </CardContent>
    </Card>
  )
}

export const RatingsView = ({
  averageRating = 0,
  totalReviews = 0,
  reviews = [],
  isLoading,
}: RatingsViewProps) => {
  if (isLoading) return <RatingsSkeleton />

  const ratingCounts = reviews.reduce(
    (acc, review) => {
      const rating = Math.round(review.rating)
      acc[rating] = (acc[rating] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Ratings</h3>
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard label="Average Rating" value={`${averageRating} / 5.0`} />
          <StatsCard label="Total Reviews" value={`${totalReviews} Reviews`} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">5-Star Rating Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBreakdownRow
              key={star}
              star={star}
              count={ratingCounts[star] || 0}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Recent Reviews</h3>
        </div>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm text-center py-4">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  )
}
