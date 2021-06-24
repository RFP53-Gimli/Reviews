const { Pool, Client } = require('pg')

// const client = new Client()
// await client.connect((err) => {
  //   if (err) {
    //     console.log('failed, ', err)
    //   } else {
      //     console.log('success')
      //   }
      // })
      //client.query()

const pool = new Pool({
  database: 'gimli',
  //port: 3211
});
pool.query('Select * from photos limit 5', (err, res) => {
  console.log(res.rows)
  pool.end()
})