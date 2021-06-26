const express = require('express');
const db = require('../database/db.js')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const dbQueries = require('./helpers/queries.js');
const helpers = require('./helpers/helpers.js')
app.use(bodyParser.json())

//console.log(dbQueries)
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
    .catch(err => {res.send(err)})
})
app.get('/reviews', (req, res) => {
  console.log(req.query)
  let page = req.query.page;
  let count = req.query.count;
  let sort = req.query.sort;
  let product = req.query.product_id;

  db.query('select * from reviews where product_id= $1 order by $2 desc limit $3 Offset $4;', [product, sort, count, (page - 1) * count])
   .then(data => {
     let test = [];
     let results = data.rows;
    results.forEach( (result, index) => {
      test.push(db.query('select * from photos where review_id=$1', [results[index].id])
      .then(data => {
        results[index].photos = data.rows;
      })
      )
     })
    return Promise.all(test).then( () => {
      return results
    })
   })
   .then(final => {
     // update materialized view
     res.send(final);
   })
   .catch(err => res.send(err))
})

app.post('/reviews', (req, res) => {
  //console.log(JSON.stringify(req.body))
  //res.send(req.body)
  // gather information from request
  let data = req.body;
  let reviewData = [data.product_id, data.rating, Date.now(), data.summary, data.body, data.recommended, data.name, data.email]
  // format data to add a new row to reviews table
  let text = 'insert into reviews (product_id, rating , date, summary, body, recommended, reviewer, reviewer_email, helpfulnes) values($1, $2, $3, $4, $5, $6, $7, $8, 0) returning id;';
  let photoData = data.photos;
  let photoText = 'insert into photos (review_id, url) values($1, $2)';
  let charData = data.characteristics;
  let charText = 'insert into characteristics_reviews (characteristics_id, review_id, value) values($1, $2, $3)';
  db.query(text, reviewData)
    .then(test => {
      let queries = [];
      photoData.forEach(photo => {
        // check that test.rows does what i want
        queries.push(db.query(photoText, [test.rows.id, photo]))
      })
      for (var k in charData) {
        queries.push(db.query(charText, [k, test.rows.id, charData[k]]))
      }
      return Promise.all(queries)
    })
    .then(reviewID => {
      //db.query('Refresh materialized view review_ratings')
      //db.query('Refresh materialized view average_characteristics')
      res.send('added')
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

app.put('/reviews/:reviewID/helpful', (req, res) => {
  //console.log(req.query)
  let reviewID = req.params.reviewID;
  // update the report to add 1 to helpfulness
  let queryString = 'update reviews set helpfulnes = helpfulnes + 1 where id=$1'
  db.query(queryString, [reviewID])
    .then( () => {
      res.status(204);
      res.end('good job');
    })
    .catch(err => {
      res.send(err);
    })
})

app.put('/reviews/:reviewID/report', (req, res) => {
  let reviewID = req.params.reviewID;
  // update the row to set report to true
  let queryString = 'update reviews set reported = true where id=$1'
  db.query(queryString, [reviewID])
    .then( () => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      res.send(err);
    })
  //res.send(req.params)
})


module.exports = app


//insert into reviews (product_id, rating , date, summary, body, recommended, reviewer, reviewer_email, helpfulnes) values(5, 3, 1519211809934, 'test', 'anotherone', true, 'bob', 'test@email.com', 0) returning id;

//insert into reviews (product_id, rating , date, summary, body, recommended, reviewer, reviewer_email, helpfulnes) values($1, $2, $3, $4, $5, $6, $7, $8, 0, 0) returning id;

// have product, use it to grab all related characterisit id
// use that to find the values for each characteristic
// select * from characteristics where product_id=5; // 1090ish to less than a second with an index at prod id
//select AVG(value) from characteristics_reviews where characteristics_id = 15; // 1900ish down to 3 with an index