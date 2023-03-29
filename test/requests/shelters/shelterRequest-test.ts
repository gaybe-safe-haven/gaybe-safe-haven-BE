import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { Shelter } from '@prisma/client';

chai.use(chaiHttp);

type ShelterPost = {
  name: string
  streetAddress: string
  state: string
  zip: number
}

describe('Post Shelter', () => {
  it('create a shelter given a name and address', () => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123
    }

    // post to '/api/v1/shelters' with shelter params
    chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)
    .end((err, res) => {
      expect(err).to.be.null;
      // expect response to be 201 ok
      expect(res).to.have.status(201);
    })

    // expect structure of the response
    
    // check last shelter in database against shelter params
  })
})