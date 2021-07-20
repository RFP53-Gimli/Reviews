const newrelic = require('newrelic');
const express = require('express');
const db = require('../database/db.js')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const dbQueries = require('./helpers/queries.js');
const helpers = require('./helpers/helpers.js')
app.use(bodyParser.json())

app.get('/reviews/meta', (req, res) => {
  let product = req.query.product_id;
  let response = {
    product_id: product
  };
  dbQueries.getReviewsMeta(product)
    .then(results => {
      response.ratings = helpers.appendRatings(results.rows);
      return dbQueries.getAvgCharacteristics(product)
        .then(results => {
          response.characteristics = helpers.appendCharacteristics(results.rows)
        })
    })
    .then(results => {
      return dbQueries.getNumberRecommended(product)
    })
    .then(results => {
      response.recommended = results.rows[0]
      res.send(response)
    }
    )
    .catch(err => {
      res.status(400)
      res.send(err)
    })
})
app.get('/reviews', (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let count = req.query.count ? parseInt(req.query.count) : 5;
  let sort = req.query.sort;
  let product = req.query.product_id;
  let response = { product, page, count }
  dbQueries.getReviews(product, sort, count, (page - 1) * count)
    .then(data => {
      response.results = data.rows
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
})

app.post('/reviews', (req, res) => {
  let data = req.body;
  let reviewData = [data.product_id, data.rating, Date.now(), data.summary, data.body, data.recommended, data.name, data.email]
  let text = 'insert into reviews (product_id, rating , date, summary, body, recommended, reviewer, reviewer_email, helpfulness) values($1, $2, $3, $4, $5, $6, $7, $8, 0) returning id;';

  let photoData = data.photos;
  let photoText = 'insert into photos (review_id, url) values($1, $2)';
  let charData = data.characteristics;
  let charText = 'insert into characteristics_reviews (characteristics_id, review_id, value) values($1, $2, $3)';
  db.query(text, reviewData)
    .then(test => {
      let queries = [];
      photoData.forEach(photo => {
        queries.push(db.query(photoText, [test.rows[0].id, photo]))
      })
      for (var k in charData) {
        queries.push(db.query(charText, [k, test.rows.id, charData[k]]))
      }
      return Promise.all(queries)
    })
    .then(reviewID => {
      res.send('added')
    })
    .catch(err => {
      res.status(400)
      res.send(err)
    })
})

app.put('/reviews/:reviewID/helpful', (req, res) => {
  let reviewID = req.params.reviewID;
  let queryString = 'update reviews set helpfulness = helpfulness + 1 where id=$1'
  db.query(queryString, [reviewID])
    .then( () => {
      res.status(204);
      res.end('good job');
    })
    .catch(err => {
      res.status(400)
      res.send(err);
    })
})

app.put('/reviews/:reviewID/report', (req, res) => {
  let reviewID = req.params.reviewID;
  let queryString = 'update reviews set reported = true where id=$1'
  db.query(queryString, [reviewID])
    .then( () => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      res.status(400)
      res.send(err);
    })
})


module.exports = app
