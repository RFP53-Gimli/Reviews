const { Pool, Client } = require('pg')


const pool = new Pool({});
pool.query('Select * from photos limit 5', (err, res) => {
  console.log(res.rows)
  pool.end()
})
