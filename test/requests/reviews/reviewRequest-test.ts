import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import prisma from '../../../src/db/prisma.config';

chai.use(chaiHttp);

type ReviewPost = {
  shelterId: number
  cleanliness: number
  safety: number
  staff: number
}

type ShelterPost = {
  name: string
  streetAddress: string
  state: string
  zip: number
  phoneNumber: string
}

const shelterData: ShelterPost = {
  name: 'Queer Little Fellas',
  streetAddress: '1234 Gay St.',
  state: 'CO',
  zip: 42069,
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

      expect(res.body.data.attributes.cleanliness).to.eq(10);

      expect(res.body.data.attributes.safety).to.eq(10)

      expect(res.body.data.attributes.staff).to.eq(9.8)

  })
})
