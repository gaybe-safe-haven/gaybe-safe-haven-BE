import { ShelterWithRating } from '../shelter/shelter.types'
import { Serialized, Serializer } from '../serializers/serializer.types'

export const serializeShelter: Serializer<ShelterWithRating> = function (
  shelter: ShelterWithRating
): Serialized<ShelterWithRating> {
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
      avgStaff: shelter.avgStaff,
      avgClean: shelter.avgClean,
      avgSafety: shelter.avgSafety,
    },
  }
}
