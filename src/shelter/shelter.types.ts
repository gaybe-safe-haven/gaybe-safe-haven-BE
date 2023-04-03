import { Shelter as PrismaShelter } from '@prisma/client'

export type Shelter = Omit<PrismaShelter, "updatedAt" | "createdAt">

export type ShelterPost = {
  name: string
  streetAddress: string
  state: string
  zip: number
  phoneNumber: string
  websiteUrl?: string
}

export type ShelterWithRating = Shelter & {
  avgClean: number | null;
  avgSafety: number | null;
  avgStaff: number | null;
}
