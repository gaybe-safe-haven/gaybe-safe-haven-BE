import { Shelter as PrismaShelter } from '@prisma/client'
import { z } from 'zod'

export type Shelter = Omit<PrismaShelter, "updatedAt" | "createdAt">

const shelterPostValidator = z.object({
  name: z.string(),
  streetAddress: z.string(),
  state: z.string(), 
  zip: z.coerce.number().min(10000).max(99999),
  phoneNumber: z.coerce.string(),
  websiteUrl: z.optional(z.string())
})
export type ShelterPost = z.infer<typeof shelterPostValidator>

export const shelterValidators = {
  shelterId: z.coerce.number(),
  postData: shelterPostValidator
}

export type ShelterWithRating = Shelter & {
  avgClean: number | null;
  avgSafety: number | null;
  avgStaff: number | null;
}
