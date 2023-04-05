import { Review } from '@prisma/client'

export function serializeReview(review: Review) {
  return {
    id: review.id,
    type: 'review',
    attributes: {
      shelterId: review.shelterId,
      cleanliness: review.cleanliness?.toFixed(1),
      safety: review.safety?.toFixed(1),
      staff: review.staff?.toFixed(1),
    },
  }
}
