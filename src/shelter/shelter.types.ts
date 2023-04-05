import { Shelter as PrismaShelter } from '@prisma/client'
import { z } from 'zod'
import validator from 'validator'

export type Shelter = Omit<PrismaShelter, "updatedAt" | "createdAt">

const shelterPostValidator = z.object({
  name: z.string(),
  streetAddress: z.string(),
  state: z.string(), 
  city: z.string(),
  zip: z.string().refine((value) => validator.isPostalCode(value, "US"), {
    message: "Invalid US postal code",
  }),
  phoneNumber: z.coerce.string(),
  websiteUrl: z.optional(z.string().refine((value) => (value === '' || validator.isURL(value, { require_protocol: false })), {
    message: "Invalid website URL",
  })),
})
export type ShelterPost = z.infer<typeof shelterPostValidator>

export const shelterValidators = {
  shelterId: z.coerce.number(),
  postData: shelterPostValidator
}

export type ShelterWithRating = Shelter & {
  avgClean: string | null;
  avgSafety: string | null;
  avgStaff: string | null;
}
