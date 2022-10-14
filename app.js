const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/userRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

app.listen(port, (err, req) => {
    if(err){
        console.log(err)
    }else{
        console.log('App Vehicle Rent is online at port 3000')
    }
})