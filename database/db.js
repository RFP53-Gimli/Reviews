const { Pool, Client } = require('pg')


const pool = new Pool({
  database: 'gimli',
  //port: 3211
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
