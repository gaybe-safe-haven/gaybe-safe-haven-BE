import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import prisma from '../../src/db/prisma.config';
import { ShelterPost, ShelterWithRating, Shelter } from '../../src/shelter/shelter.types'
import { addRatings } from '../../src/shelter/shelter.service'
import { ReviewPost } from '../../src/reviews/review.types'


chai.use(chaiHttp);


describe('addRatings function', () => {
  let shelter: Shelter;

  beforeEach(async () => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      city: "Albany",
      zip: '78123',
      phoneNumber: '2134568765'
    };

    shelter = await prisma.shelter.create({ data: shelterParams });
  });

  it('can add null ratings to a shelter object', async() => {
   
    const shelterWithRatings: ShelterWithRating = await addRatings(shelter)

    expect(shelterWithRatings.avgClean).to.equal(null)
    expect(shelterWithRatings.avgSafety).to.equal(null)
    expect(shelterWithRatings.avgStaff).to.equal(null)
  })

  it('can add avg ratings to a shelter object with reviews', async() => {

    const review1Params: ReviewPost = {
      shelterId: shelter.id,
      cleanliness: 1.5,
      safety: 9.5,
      staff: 8.0
    }

    const review2Params: ReviewPost = {
      shelterId: shelter.id,
      cleanliness: 3.5,
      safety: 3.1,
      staff: 6.2
    }

    await prisma.review.createMany({ data: [review1Params, review2Params]})
    
    const shelterWithRatings: ShelterWithRating = await addRatings(shelter)

    expect(shelterWithRatings.avgClean).to.equal('2.5')
    expect(shelterWithRatings.avgSafety).to.equal('6.3')
    expect(shelterWithRatings.avgStaff).to.equal('7.1')
  })
})

