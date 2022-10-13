if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config()
}

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/index');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log (`listening on port ${port}`)
})