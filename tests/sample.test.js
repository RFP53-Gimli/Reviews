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
    const response = await request.get("/reviews/")
    //.expect(200).then(res => {}).catch(err => done(err))
    expect(response.statusCode).toBe(200);
    //response.end()
  } )
  // should default to page 1
  it('When page not provided it defaults to 1', async () => {
    const response = await request.get("/reviews?product_id=5&sort=helpfulness/")
    expect(response.statusCode).toBe(200);
    const body = response.body;
    expect(body.page).toBe(1);
  } )
  // should default to count 5
  it('When count not provided it defaults to 5', async () => {
    const response = await request.get("/reviews?product_id=5&page=1&sort=helpfulness/")
    expect(response.statusCode).toBe(200);
    const body = response.body;
    expect(body.count).toBe(5);
    expect(body.results.length).toBe(5);
  } )
  it('Count controls how many results are returned', async () => {
    const response = await request.get("/reviews?product_id=5&count=6&sort=helpfulness&page=1/")
    expect(response.statusCode).toBe(200);
    const body = response.body;
    expect(body.count).toBe(6);
    expect(body.results.length).toBe(6);
    const res = await request.get("/reviews?product_id=5&count=1&sort=helpfulness&page=1/")
    expect(res.statusCode).toBe(200);
    const body2 = res.body;
    expect(body2.count).toBe(1);
    expect(body2.results.length).toBe(1);
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
