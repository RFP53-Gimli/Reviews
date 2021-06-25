const express = require('express');
const db = require('../database/db.js')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/reviews/meta', (req, res) => {
  let product = req.query.product_id;
  let response = {
    product_id: product,
    ratings: {},
    recommended: 0,
    characteristics: {}
  };
  db.query('select rating, count from review_ratings where product_id=$1;', [product])
    .then(results => {
      //console.log(results.rows)
      var data = results.rows
      results.rows.forEach((result, index) => {
        response.ratings[result.rating] = result.count
      })
      return db.query('select * from average_characteristics where product_id=$1;', [product])
        .then(results => {
          //console.log(results.rows)
          var data = results.rows
          results.rows.forEach((result, index) => {
            //response.ratings[result.rating] = result.count
            response.characteristics[result.name] = {
              value: result.avg
            }
          })
          //res.send(response);
        })
      //res.send(response)
    })
    .then(results => {
      return db.query('select count(*) from reviews where product_id=$1 AND recommended=true;', [product])
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
  let text = 'insert into reviews product_id, rating, date, summary, body, recommended, reviewer, reviewer_email, helpfulnes values $1, $2, $3, $4, $5, $6, $7, $8, 0';
  let photoData = data.photos;
  let photoText = 'insert into photos (review_id, url) values ($1, $2)'
  db.query(text, reviewData)
    .then(test => {
      photoData.forEach(photo => {
        // check that test.rows does what i want
        db.query(photoText, [test.rows[0], dataphoto.url])
      })
      res.send('added')
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  // query review table data
    // update materialized views
  // query to add photos to photo table
  // send res.status = 200
})

app.put('/reviews/:reviewID/helpful', (req, res) => {
  //console.log(req.query)
  let reviewID = req.params.reviewID;
  // update the report to add 1 to helpfulness
  res.send(req.params)
})

app.put('/reviews/:reviewID/report', (req, res) => {
  let reviewID = req.params.reviewID;
  // update the row to set report to true
  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// insert into reviews (product_id, rating, date, summary, body, recommended, reviewer, reviewer_email, helpfulnes) values (5, 3, 1519211809934, 'test, 'test 23', true, 'bob', 'test@email.com', 0) Returning id;'