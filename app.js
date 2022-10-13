if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
require('./helpers/mongoose')

const express = require('express')
const errorHandlers = require('./midddleware/errorHandlers')
const router = require('./routes')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const validator = require('validator')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.use(errorHandlers)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})