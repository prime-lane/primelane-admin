import { Button, Card, CardContent } from '@mui/material'
import { Star } from '@solar-icons/react'
import { format } from 'date-fns'
import type { CustomerStats } from '../api/use-customer-stats'
import type { Review } from '../types'
import { StatsCard } from './stats-card'
import { RatingsSkeleton } from '@/components/ui/tab-skeletons'

interface CustomerRatingsProps {
  stats?: CustomerStats
  reviews?: Review[]
  isLoading?: boolean
}


const RatingBreakdownRow = ({
  star,
  count,
  // total,
}: {
  star: number
  count: number
  total: number
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

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-900">
            {review.reviewer.first_name} {review.reviewer.last_name}
          </h4>
          <span className="text-xs text-neutral-500">
            {format(new Date(review.created_at), 'yyyy-MM-dd')}
          </span>
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
          {review.feedback}
        </p>
      </CardContent>
    </Card>
  )
}

export const CustomerRatings = ({
  stats,
  reviews = [],
  isLoading,
}: CustomerRatingsProps) => {
  if (isLoading) return <RatingsSkeleton />

  const averageRating = stats?.average_rating || 0
  const totalReviews = reviews.length

  // Calculate rating breakdown
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
          {/* <StatsCard label="Last 30 Days Rating" value={last30DaysRating} /> */}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">5-Star Rating Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
          <RatingBreakdownRow
            star={5}
            count={ratingCounts[5] || 0}
            total={totalReviews}
          />
          <RatingBreakdownRow
            star={4}
            count={ratingCounts[4] || 0}
            total={totalReviews}
          />
          <RatingBreakdownRow
            star={3}
            count={ratingCounts[3] || 0}
            total={totalReviews}
          />
          <RatingBreakdownRow
            star={2}
            count={ratingCounts[2] || 0}
            total={totalReviews}
          />
          <RatingBreakdownRow
            star={1}
            count={ratingCounts[1] || 0}
            total={totalReviews}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Recent Reviews</h3>
          <Button
            variant="text"
            sx={{
              bgcolor: 'neutral.100',
              fontWeight: 500,
              fontSize: '0.875rem',
              borderRadius: '100px',
              textTransform: 'none',
              px: 2,
              py: 1,
              height: 'fit-content',
              minWidth: 'auto',
              '&:hover': {
                bgcolor: 'neutral.200',
              },
            }}
          >
            View more
          </Button>
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
