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

  it('create a shelter given a name and address and phone number AND a websiteurl', async() => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765',
      websiteUrl: "www.fake.com"
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
    expect(res.body.data.attributes.websiteUrl).to.equal('www.fake.com');
    expect(res.body.data.attributes.verified).to.equal(false);
  })

  it('can return an error if given invalid post data', async() =>{
    const shelterParams = {
      name: 'Test',
      streetAddress: '55555',
      state: 'NY',
      zip: 1,
      phoneNumber: 2134568765
    }

    const res = await chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)

    expect(res).to.have.status(400)
    expect(res.body.errors)
  })

  it('can return an error if given duplicate shelter data', async() => {
    const shelterParams = {
      name: 'Test',
      streetAddress: '55555',
      state: 'NY',
      zip: 12334,
      phoneNumber: '2134568765'
    }

    await chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)

    const shelterParams2 = {
      name: 'Test',
      streetAddress: '55555',
      state: 'NY',
      zip: 12334,
      phoneNumber: '2134568765'
    }

    const res = await chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams2)

    expect(res).to.have.status(422)
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

  it('can return a 404 if the shelterId does not exist', async() => {
    const res = await chai
    .request(app)
    .get('/api/v1/shelters/999999999')

    expect(res.status).to.equal(404)
    expect(res.body.error).to.equal('No Shelter found')
  })

  it('can return a validation error if the shelterId is not a number', async() => {
    const res = await chai
    .request(app)
    .get('/api/v1/shelters/badString')

    expect(res.status).to.equal(400)
    expect(res.body.errors[0].message).to.equal('Expected number, received nan')
  })
})

describe('GET shelters', () => {
  it('can return all shelters', async () => {
    const shelterParams1: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    const shelterParams2: ShelterPost = {
      name: 'Silver Hand Hounds',
      streetAddress: '945 Timmult Drive',
      state: 'CA',
      zip: 234195,
      phoneNumber: '1234567890',
      websiteUrl: 'www.google.com'
    }

    const shelter1 = await prisma.shelter.create({ data: shelterParams1 })
    const shelter2 = await prisma.shelter.create({ data: shelterParams2 })

    const review1Params: ReviewPost = {
      shelterId: shelter1.id,
      cleanliness: 1.5,
      safety: 9.5,
      staff: 8.0
    }

    const review2Params: ReviewPost = {
      shelterId: shelter2.id,
      cleanliness: 3.5,
      safety: 3.1,
      staff: 6.2
    }

    await prisma.review.createMany({ data: [review1Params, review2Params] })

    //Fetch shelter
    const res = await chai
    .request(app)
    .get('/api/v1/shelters')

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.key('data');
    expect(res.body.data).to.be.a('array');
    expect(res.body.data.length).to.equal(2);

    expect(res.body.data[0].type).to.equal('shelter');
    expect(res.body.data[0].id).to.equal(shelter1.id);
    expect(res.body.data[0].attributes.name).to.equal('Golden Sun');
    expect(res.body.data[0].attributes.streetAddress).to.equal('1234 Black St');
    expect(res.body.data[0].attributes.state).to.equal('NY');
    expect(res.body.data[0].attributes.zip).to.equal(78123);
    expect(res.body.data[0].attributes.avgClean).to.equal(1.5);
    expect(res.body.data[0].attributes.avgSafety).to.equal(9.5);
    expect(res.body.data[0].attributes.avgStaff).to.equal(8.0);

    expect(res.body.data[1].type).to.equal('shelter');
    expect(res.body.data[1].id).to.equal(shelter2.id);
    expect(res.body.data[1].attributes.name).to.equal('Silver Hand Hounds');
    expect(res.body.data[1].attributes.streetAddress).to.equal('945 Timmult Drive');
    expect(res.body.data[1].attributes.state).to.equal('CA');
    expect(res.body.data[1].attributes.zip).to.equal(234195);
    expect(res.body.data[1].attributes.avgClean).to.equal(3.5);
    expect(res.body.data[1].attributes.avgSafety).to.equal(3.1);
    expect(res.body.data[1].attributes.avgStaff).to.equal(6.2);
  })
})

describe('GET shelters', () => {
  it('can return all shelters', async () => {
    const shelterParams1: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
      phoneNumber: '2134568765'
    }

    const shelterParams2: ShelterPost = {
      name: 'Silver Hand Hounds',
      streetAddress: '945 Timmult Drive',
      state: 'CA',
      zip: 234195,
      phoneNumber: '1234567890',
      websiteUrl: 'www.google.com'
    }

    const shelter1 = await prisma.shelter.create({ data: shelterParams1 })
    const shelter2 = await prisma.shelter.create({ data: shelterParams2 })

    const review1Params: ReviewPost = {
      shelterId: shelter1.id,
      cleanliness: 1.5,
      safety: 9.5,
      staff: 8.0
    }

    const review2Params: ReviewPost = {
      shelterId: shelter2.id,
      cleanliness: 3.5,
      safety: 3.1,
      staff: 6.2
    }

    await prisma.review.createMany({ data: [review1Params, review2Params] })

    //Fetch shelter
    const res = await chai
    .request(app)
    .get('/api/v1/shelters')

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.key('data');
    expect(res.body.data).to.be.a('array');
    expect(res.body.data.length).to.equal(2);

    expect(res.body.data[0].type).to.equal('shelter');
    expect(res.body.data[0].id).to.equal(shelter1.id);
    expect(res.body.data[0].attributes.name).to.equal('Golden Sun');
    expect(res.body.data[0].attributes.streetAddress).to.equal('1234 Black St');
    expect(res.body.data[0].attributes.state).to.equal('NY');
    expect(res.body.data[0].attributes.zip).to.equal(78123);
    expect(res.body.data[0].attributes.avgClean).to.equal(1.5);
    expect(res.body.data[0].attributes.avgSafety).to.equal(9.5);
    expect(res.body.data[0].attributes.avgStaff).to.equal(8.0);

    expect(res.body.data[1].type).to.equal('shelter');
    expect(res.body.data[1].id).to.equal(shelter2.id);
    expect(res.body.data[1].attributes.name).to.equal('Silver Hand Hounds');
    expect(res.body.data[1].attributes.streetAddress).to.equal('945 Timmult Drive');
    expect(res.body.data[1].attributes.state).to.equal('CA');
    expect(res.body.data[1].attributes.zip).to.equal(234195);
    expect(res.body.data[1].attributes.avgClean).to.equal(3.5);
    expect(res.body.data[1].attributes.avgSafety).to.equal(3.1);
    expect(res.body.data[1].attributes.avgStaff).to.equal(6.2);
  })
})
