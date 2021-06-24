const { Pool, Client } = require('pg')
//const login = require('/doNotCommit.js')

const pool = new Pool({
  database: 'gimli',
  //port: 3211
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  }
}
