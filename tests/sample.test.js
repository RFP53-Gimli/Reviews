const app = require('../router/index.js');
const supertest = require('supertest');
const request = supertest(app);


describe('Reviews/meta', () => {
  it('Successful reviews/meta get returns 200 status', async () => {
    const response = await request.get("/reviews/meta?product_id=5")
    //.expect(200).then(res => {}).catch(err => done(err))
    expect(response.statusCode).toBe(200);
  } )

  it('Response includes the correct product Id', async () => {
    const response = await request.get("/reviews/meta?product_id=5")
    expect(response.body.product_id).toBe('5')
  })
  it('Response includes ratings, characteristics and recommended keys which have object properties', async () => {
    const response = await request.get("/reviews/meta?product_id=5")
    const body = response.body;
    expect(typeof body.characteristics).toBe('object');
    expect(typeof body.recommended).toBe('object');
    expect(typeof body.ratings).toBe('object');
  })
})

describe('Reviews', () => {
  it('Successful reviews returns returns 200 status', async () => {
    const response = await request.get("/reviews").send({
      product_id: '6'
    })
    //.expect(200).then(res => {}).catch(err => done(err))
    expect(response.statusCode).toBe(200);
    //response.end()
  } )
})

describe('Put Helpfulness', () => {
  it('Successful put returns 204', async () => {
    const response = await request.put("/reviews/5/helpful")
    expect(response.statusCode).toBe(204);

  } )
})

describe('Put Report', () => {
  it('teSuccessful put returns 204t', async () => {
    const response = await request.put("/reviews/5/report")
    expect(response.statusCode).toBe(204);

  } )
})