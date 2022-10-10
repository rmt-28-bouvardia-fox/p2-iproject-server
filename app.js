if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const port = 3000 || process.env.PORT
const cors = require("cors")
const router = require("./router")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(router)


app.listen(port, () => {
    console.log(`Listening Individual Project on Port : ${port}`)
})