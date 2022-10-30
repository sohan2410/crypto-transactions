require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333
const db = require('./configs/db')
const client = require('./configs/redis')
app.use(express.json())

app.use('/api/user', require('./routes/user'))
app.use('/api/coins', require('./routes/coin'))
app.get('/', (_, res) => {
  res.send('Crypto transaction server is up and running 🚀')
})
// Error handler
app.use(require('./middlewares/exceptions/handler'))

app.listen(port, () => {
  console.log(`Server is up and runnign on port ${port}`)
})
db()
client.connect().then(() => console.log(`Redis client connected successfully`))
