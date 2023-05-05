const connectToMongo = require ('./db.js');
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/metroroute'));
app.use('/api/ticket', require('./routes/ticket'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


