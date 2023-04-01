import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import prisma from '../../../src/db/prisma.config';
import { ShelterPost } from '../../../src/shelter/shelter.types'
import { ReviewPost } from '../../../src/reviews/review.types'

chai.use(chaiHttp);

describe('Post Shelter', () => {
  it('create a shelter given a name and address', async() => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    // post to '/api/v1/shelters' with shelter params
    const res = await chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)

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
    expect(res.body.data.attributes.avgClean).to.equal(null);
    expect(res.body.data.attributes.avgSafety).to.equal(null);
    expect(res.body.data.attributes.avgStaff).to.equal(null);
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
    const res = await chai
    .request(app)
    .get(`/api/v1/shelters/${shelter.id}`)

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.key('data');
    expect(res.body.data.id).to.equal(shelter.id);
    expect(res.body.data.type).to.equal('shelter');
    expect(res.body.data.attributes.name).to.equal('Golden Sun');
    expect(res.body.data.attributes.streetAddress).to.equal('1234 Black St');
    expect(res.body.data.attributes.state).to.equal('NY');
    expect(res.body.data.attributes.zip).to.equal(78123);
    expect(res.body.data.attributes.avgClean).to.equal(null);
    expect(res.body.data.attributes.avgSafety).to.equal(null);
    expect(res.body.data.attributes.avgStaff).to.equal(null);
  })

  it('can return a shelter with avg ratings', async () => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    const shelter = await prisma.shelter.create({ data: shelterParams })

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
    
    const res = await chai
    .request(app)
    .get(`/api/v1/shelters/${shelter.id}`)

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.key('data');
    expect(res.body.data.id).to.equal(shelter.id);
    expect(res.body.data.type).to.equal('shelter');
    expect(res.body.data.attributes.name).to.equal('Golden Sun');
    expect(res.body.data.attributes.streetAddress).to.equal('1234 Black St');
    expect(res.body.data.attributes.state).to.equal('NY');
    expect(res.body.data.attributes.zip).to.equal(78123);
    expect(res.body.data.attributes.avgClean).to.equal(2.5);
    expect(res.body.data.attributes.avgSafety).to.equal(6.3);
    expect(res.body.data.attributes.avgStaff).to.equal(7.1);
  })
})
