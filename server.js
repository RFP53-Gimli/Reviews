const app = require('./router/index.js')
const port = 3000;

//console.log(app)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})