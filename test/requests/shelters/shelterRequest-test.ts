import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

type ShelterPost = {
  name: string
  streetAddress: string
  state: string
  zip: number
}

describe('Post Shelter', () => {
  it('create a shelter given a name and address', (done) => {
    const shelterParams: ShelterPost = {
      name: 'Golden Sun',
      streetAddress: '1234 Black St',
      state: 'NY',
      zip: 78123,
    }

    // post to '/api/v1/shelters' with shelter params
    chai
    .request(app)
    .post('/api/v1/shelters')
    .send(shelterParams)
    .end((err, res) => {
      // expect response to be 201 ok
      expect(res).to.have.status(201);
      done();
    })

    // expect structure of the response

    // check last shelter in database against shelter params
  })
})

describe('GET shelters/:shelterid', () => {
  it('can return a shelter with the given id', (done) => {
    //Fetch shelter
    chai
    .request(app)
    .get('/api/v1/shelters/2')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.key('data');
      expect(res.body.data.id).to.equal(2);
      expect(res.body.data.type).to.equal('shelter');
      expect(res.body.data.attributes.name).to.equal('Golden Sun');
      expect(res.body.data.attributes.streetAddress).to.equal('1234 Black St');
      expect(res.body.data.attributes.state).to.equal('NY');
      expect(res.body.data.attributes.zip).to.equal(78123);
      done();
    })
  })
})
