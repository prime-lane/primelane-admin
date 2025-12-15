import {
  Button,
  Card,
  CardContent
} from '@mui/material'
import { Star } from '@solar-icons/react'
import type { CustomerStats } from '../api/use-customer-stats'
import { StatsCard } from './stats-card'

interface CustomerRatingsProps {
  stats?: CustomerStats
}

// Mock data for reviews since API doesn't provide them yet
const REVIEWS = [
  {
    id: 1,
    name: 'Sarah A.',
    date: '1982-01-01',
    rating: 4,
    comment:
      'Driver was professional, car was clean, and the ride was smooth. Highly recommended.',
  },
  {
    id: 2,
    name: 'Michael O.',
    date: '1982-01-01',
    rating: 3,
    comment: 'Quick pickup and respectful, but the AC wasn’t cooling well.',
  },
  {
    id: 3,
    name: 'Daniel K.',
    date: '1982-01-01',
    rating: 3,
    comment: 'Good driving but arrived 5 minutes late.',
  },
  {
    id: 4,
    name: 'Daniel K.',
    date: '1982-01-01',
    rating: 4,
    comment: 'Good driving but arrived 5 minutes late.',
  },
]

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

const ReviewCard = ({ review }: { review: (typeof REVIEWS)[0] }) => {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-900">{review.name}</h4>
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
          {review.comment}
        </p>
      </CardContent>
    </Card>
  )
}

export const CustomerRatings = ({ stats }: CustomerRatingsProps) => {
  const averageRating = stats?.average_rating || 4.7
  // Mock totals for display
  const totalReviews = 128
  const last30DaysRating = 4.8

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Ratings</h3>
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard label="Average Rating" value={`${averageRating} / 5.0`} />
          <StatsCard label="Total Reviews" value={`${totalReviews} Reviews`} />
          <StatsCard label="Last 30 Days Rating" value={last30DaysRating} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">5-Star Rating Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
          <RatingBreakdownRow star={5} count={102} total={totalReviews} />
          <RatingBreakdownRow star={4} count={18} total={totalReviews} />
          <RatingBreakdownRow star={3} count={6} total={totalReviews} />
          <RatingBreakdownRow star={2} count={1} total={totalReviews} />
          <RatingBreakdownRow star={1} count={0} total={totalReviews} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Recent Reviews</h3>
          <Button variant="text" sx={{ color: 'neutral.500' }}>
            View more
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
