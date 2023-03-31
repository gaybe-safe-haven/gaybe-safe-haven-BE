import { Shelter } from '@prisma/client'

export function serializeShelter(shelter: Shelter) {
  return {
    id: shelter.id,
    type: 'shelter',
    attributes: {
      name: shelter.name,
      streetAddress: shelter.streetAddress,
      state: shelter.state,
      zip: shelter.zip,
      phoneNumber: shelter.phoneNumber,
      websiteUrl: shelter.websiteUrl,
      verified: shelter.verified
    }
  }
}
