
import { Review } from '@prisma/client'


export function serializeReview(review: Review) {
  if (review) {
    return {
      id: review.id,
      type: 'review',
      attributes: {
        shelterId: review.shelterId,
        cleanliness: review.cleanliness,
        safety: review.safety,
        staff: review.staff,
      },
    }
  } else {
    return { data: {} }
  }
}