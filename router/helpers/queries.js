const db = require('../../database/db.js')

// house queries here
let dbQueries = {};

dbQueries.test = {};
dbQueries.getReviewsMeta = function(product) {
  let queryString = 'select rating, count from review_ratings where product_id=$1;';
  return db.query(queryString, [product])
}
// return a promise

dbQueries.getAvgCharacteristics = (product) => {
  let queryString = 'select * from average_characteristics where product_id=$1;';
  return db.query(queryString, [product])
}

dbQueries.getNumberRecommended = (product) => {
  let queryString = 'select count(*) from reviews where product_id=$1 AND recommended=true;';
  return db.query(queryString, [product])
}

module.exports = dbQueries