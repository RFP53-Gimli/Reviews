const express = require('express');
const db = require('../database/db.js')

const app = express();
const port = 3000;
// parse the body
// import db connection

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

// select reviews.id, photos.url from reviews left join photos on photos.review_id = reviews.id where reviews.id= 5 order by helpfulnes desc limit 3 Offset 0;
app.get('/photos', (req, res) => {
  db.query('select * from photos where review_id=5', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //results[index].ph
      res.send(data)
    }
})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})