const db = require('../../database/db.js')

// house queries here
let dbQueries = {};

// select * from characteristics where product_id=5; // 1090ish to less than a second with an index at prod id
//select AVG(value) from characteristics_reviews where characteristics_id = 15; // 1900ish down to 3 with an index
// select c.id, c.name  from characteristics where product_id=5
// select c.name, c.id, AVG(cr.value) from characteristics c join characteristics_reviews cr on c.id = cr.characteristics_id where c.product_id=$1 group by c.name, c.id ;
//select product_id, rating, count(rating) from reviews where product_id=5 group by product_id, rating;

dbQueries.test = {};
dbQueries.getReviewsMeta = function(product) {
  let queryString = 'select product_id, rating, count(rating) from reviews where product_id=$1 group by product_id, rating;';
  return db.query(queryString, [product])
    // .then(data => {
    //   let results = data.rows;
    //   // save name

    // })
}
// return a promise

dbQueries.getAvgCharacteristics = (product) => {
  //let queryString = 'select * from average_characteristics where product_id=$1;';
  let test = 'select c.name, c.id, AVG(cr.value) from characteristics c join characteristics_reviews cr on c.id = cr.characteristics_id where c.product_id=$1 group by c.name, c.id ;'
  return db.query(test, [product])
}

dbQueries.getNumberRecommended = (product) => {
  let queryString = 'select count(*) from reviews where product_id=$1 AND recommended=true;';
  return db.query(queryString, [product])
}

dbQueries.getReviews = (...qInfo) => {
  let queryString = 'select *, (select jsonb_agg(p) from photos p where p.review_id =r.id) from reviews r where product_id=$1 order by $2 desc limit $3 Offset $4;';
  return db.query(queryString, qInfo)
}

module.exports = dbQueries