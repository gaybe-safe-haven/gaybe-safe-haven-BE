import { Shelter } from '@prisma/client'

export function serializeShelter(shelter: Shelter | null) {
  if (shelter) {
    return {
      id: shelter.id,
      type: 'shelter',
      attributes: {
        name: shelter.name,
        streetAddress: shelter.streetAddress,
        state: shelter.state,
        zip: shelter.zip,
        websiteUrl: shelter.websiteUrl,
        phoneNumber: shelter.phoneNumber,
        verified: shelter.verified,
      },
    }
  } else {
    return { data: {} }
  }
}
