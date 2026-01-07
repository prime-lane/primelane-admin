import { ErrorState } from '@/components/ui/loading-error-states'
import { useGetAllReviews } from '@/features/customers/api/use-customers'
import type { Review } from '@/features/customers/types'
import { formatDate } from '@/utils/table-utils'
import { Card, CardContent, Pagination, Skeleton } from '@mui/material'
import { Star } from '@solar-icons/react'
import { useState } from 'react'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const reviewerName = `${review.reviewer.first_name} ${review.reviewer.last_name}`

  return (
    <Card>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-neutral-900">{reviewerName}</h4>
          <span className="text-xs text-neutral-500">
            {formatDate(review.created_at)}
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
        <p className="text-sm text-neutral-600">{review.feedback}</p>
      </CardContent>
    </Card>
  )
}

export const Reviews = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetAllReviews()

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" width={200} height={40} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from(new Array(6)).map((_, i) => (
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
    )
  }

  if (error) {
    return <ErrorState message="Failed to load reviews" />
  }

  const reviews = data?.items || []
  const totalPages = data?.pagination?.total_pages || 1

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">All reviews</h2>
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-neutral-500 text-sm text-center py-8">
            No reviews available.
          </p>
        )}
      </div>
    </>
  )
}
