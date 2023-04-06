import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import prisma from '../../../src/db/prisma.config';
import { ShelterPost } from '../../../src/shelter/shelter.types'
import { ReviewPost } from '../../../src/reviews/review.types'

chai.use(chaiHttp);

const shelterData: ShelterPost = {
  name: 'Queer Little Fellas',
  streetAddress: '1234 Gay St.',
  state: 'CO',
  city: 'Denver',
  zip: '12345',
  phoneNumber: '1234567890'
}


describe('Post Review', () => {
  let shelter: any;

  beforeEach(async () => {
    shelter = await prisma.shelter.create({data: shelterData});
  })

  it('create a review with given attributes', async () => {
    const reviewData: ReviewPost = {
      shelterId: shelter.id,
      cleanliness: 10,
      safety: 10,
      staff: 9.8 
    }

    const res = await chai
    .request(app)
    .post('/api/v1/reviews')
    .send(reviewData)
      expect(res).to.have.status(201);

      expect(res.body.data.id).to.be.a('number');

      expect(res.body.data.type).to.eq('review');

      expect(res.body.data.attributes.shelterId).to.be.a('number');
      expect(res.body.data.attributes.shelterId).to.eq(shelter.id);

      expect(res.body.data.attributes.cleanliness).to.eq('10.0');

      expect(res.body.data.attributes.safety).to.eq('10.0')

      expect(res.body.data.attributes.staff).to.eq('9.8')

  })

  it('can return a 422 if shelterId does not exist', async () => {
    const reviewData: ReviewPost = {
      shelterId: 5000,
      cleanliness: 10,
      safety: 10,
      staff: 9.8 
    }

    const res = await chai
    .request(app)
    .post('/api/v1/reviews')
    .send(reviewData)

    expect(res.status).to.eq(422)
    expect(res.body.error.message).to.eq("Foreign Key constraint failed. Attempted to rate shelter that does not exist")
  })

  it('can return a 400 if given invalid data', async () => {
    const reviewData: ReviewPost = {
      shelterId: shelter.id,
      cleanliness: 1000000,
      safety: 0,
      staff: 1000 
    }

    const res = await chai
    .request(app)
    .post('/api/v1/reviews')
    .send(reviewData)

    expect(res.status).to.eq(400)
    expect(res.body.errors[0].field).to.eq('cleanliness')
    expect(res.body.errors[0].code).to.eq('too_big')
    expect(res.body.errors[0].message).to.eq('Number must be less than or equal to 10')

    expect(res.body.errors[1].field).to.eq('staff')
    expect(res.body.errors[1].code).to.eq('too_big')
    expect(res.body.errors[1].message).to.eq('Number must be less than or equal to 10')
  })
})
