const express = require('express');

const app = express();
const port = 3000;
// parse the body

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})