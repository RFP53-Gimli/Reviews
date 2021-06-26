const { Pool, Client } = require('pg')
const login = require('./doNotCommit.js')

const pool = new Pool(login.creds);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  }
}
