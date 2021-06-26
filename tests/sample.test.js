const app = require('../router/index.js');
const supertest = require('supertest');
const request = supertest(app);


describe('Reviews/meta', () => {
  it('Successful reviews/meta get returns 200 status', async () => {
    const response = await request.get("/reviews/meta").send({
      product_id: '6'
    })
    //.expect(200).then(res => {}).catch(err => done(err))
    expect(response.statusCode).toBe(200);
    //response.end()
  } )
  it('should test that true === true', () => {
    expect(true).toBe(true)
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