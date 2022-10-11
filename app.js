const express = require('express')
const app = express()
const axios = require('axios')
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', router)

app.get('/test', async (req,res) =>{
    try {
        const date = new Date().getTime()
        const publicK = `00c5e0760647c811c518da42ba6c88d2`
        const privateK = `385b9b343cde680ec511e8a94c2dca50e017c2d8`
        const hashUrl = date + privateK + publicK
        const hash = md5(hashUrl)
        console.log(hash)
        const movies = await axios({
            url: `https://gateway.marvel.com:443/v1/public/comics?ts=${date}&apikey=${publicK}&hash=${hash}`,
            method : `get`,
        })
        const thumbnails = movies.data.data.results.map(el =>{
            
            const tes = el.thumbnail.path +`.` + el.thumbnail.extension
            return {
                id : el.id,
                title : el.title,
                thumbnails : tes,  
                description : el.description,
                pages : el.pageCount,
                price : el.prices[0].price + ` $`   
            }
        })
        res.status(200).json(thumbnails)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(3002, () =>{
    console.log('listening to port')
})