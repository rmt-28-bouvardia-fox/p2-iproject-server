if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const port = 3000
const errorHandler = require('./middleware/errorhandler')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errorHandler);

app.listen(port, () => {
    console.log('litsen to port', port)
})