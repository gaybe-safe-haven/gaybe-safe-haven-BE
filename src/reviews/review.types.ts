import { z } from 'zod'

export const reviewPostValidator = z.object({
  shelterId: z.coerce.number(),
  cleanliness: z.coerce.number().min(0).max(10),
  safety: z.coerce.number().min(0).max(10),
  staff: z.coerce.number().min(0).max(10)
})

export type ReviewPost = z.infer<typeof reviewPostValidator>
