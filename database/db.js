const { Pool, Client } = require('pg')


const pool = new Pool({
  database: 'gimli',
  //port: 3211
});
pool.query('Select * from photos limit 5', (err, res) => {
  console.log(res.rows)
  pool.end()
})