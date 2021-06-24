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
  // make a query with the imported db connection using these params
  //db.query('Select * from photos where id=5', [], (err, res) => {console.log(res)})
  db.query('Select * from photos where review_id=$1 limit $2', ['9', count], (err, test) => {
    if (err) {
      console.log(err);
    }
    res.send(test.rows)
  })
})

app.get('/photos', (req, res) => {

  res.send('photo')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})