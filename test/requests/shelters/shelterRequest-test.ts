import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { beforeEach } from 'mocha';
import prisma from '../../../src/db/prisma.config';

chai.use(chaiHttp);

type ShelterPost = {
  name: string
  streetAddress: string
  state: string
  zip: number
  phoneNumber: string
}

describe('Post Shelter', () => {
  beforeEach(() => {
    const deleteReviews = prisma.review.deleteMany();
    const deleteShelters = prisma.shelter.deleteMany();
    prisma.$transaction([deleteReviews, deleteShelters])
  })
  it('create a shelter given a name and address', (done) => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    // post to '/api/v1/shelters' with shelter params
    chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)
    .end((err, res) => {
      // expect response to be 201 ok
      expect(res).to.have.status(201);
      // look at body of response
      expect(res.body).to.have.key('data');

      
      // expect structure of the response
      expect(res.body.data.id).to.exist;
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.type).to.equal('shelter');
      expect(res.body.data.attributes.name).to.equal('Golden Sun');
      expect(res.body.data.attributes.streetAddress).to.equal('1234 Black St');
      expect(res.body.data.attributes.state).to.equal('NY');
      expect(res.body.data.attributes.zip).to.equal(78123);
      expect(res.body.data.attributes.phoneNumber).to.equal('2134568765');
      expect(res.body.data.attributes.websiteUrl).to.equal(null);
      expect(res.body.data.attributes.verified).to.equal(false);
      done();
    })


    // check last shelter in database against shelter params
  })
})

describe('GET shelters/:shelterid', () => {
  it('can return a shelter with the given id', async () => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    const shelter = await prisma.shelter.create({ data: shelterParams })
    //Fetch shelter
    chai
    .request(app)
    .get(`/api/v1/shelters/${shelter.id}`)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.key('data');
      expect(res.body.data.id).to.equal(shelter.id);
      expect(res.body.data.type).to.equal('shelter');
      expect(res.body.data.attributes.name).to.equal('Golden Sun');
      expect(res.body.data.attributes.streetAddress).to.equal('1234 Black St');
      expect(res.body.data.attributes.state).to.equal('NY');
      expect(res.body.data.attributes.zip).to.equal(78123);
    })
  })
})
