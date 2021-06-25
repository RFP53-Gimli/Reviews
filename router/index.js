const express = require('express');
const db = require('../database/db.js')

const app = express();
const port = 3000;
// parse the body
// import db connection
app.get('/reviews/meta', (req, res) => {
  let product = req.query.product_id;
  let response = {
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
// select reviews.id, photos.url from reviews left join photos on photos.review_id = reviews.id where reviews.id= 5 order by helpfulnes desc limit 3 Offset 0;
// app.get('/photos', (req, res) => {
//   db.query('select * from photos where review_id=5', (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       //results[index].ph
//       res.send(data)
//     }
// })
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})