const { Pool, Client } = require('pg')

const pool = new Pool()
const client = new Client()
await client.connect((err, pass) => {
  if (err) {
    console.log('failed, ', err)
  } else {
    console.log('success')
  }
})

client.query()
