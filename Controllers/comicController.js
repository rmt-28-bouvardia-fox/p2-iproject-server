const md5 = require('md5')
const axios = require('axios')
const date = new Date().getTime()
const publicK = process.env.PUBLIC_KEY
const privateK = process.env.PRIVATE_KEY
const hashUrl = date + privateK + publicK
const hash = md5(hashUrl)

class ComicController{
    
    static async getComics(req,res,next){
        try {
            const {page, title} = req.query
            const offset = page * 9 - 9
            let params = {
                ts : date,
                apikey : publicK,
                hash : hash,
                offset : offset,
                limit : 9,
            }
            if(title){
                params.title = title
            }
            const {data} = await axios({
                url: `https://gateway.marvel.com:443/v1/public/comics`,
                method : `get`,
                params : params
            })
            const result = data.data.results
            
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getComic(req,res,next){
        try {
            const {comicId} = req.params
            const {data} = await axios({
                url : `https://gateway.marvel.com:443/v1/public/comics/${comicId}`,
                method : `get`,
                params : {
                    ts : date,
                    apikey : publicK,
                    hash : hash
                }
            })
            const result = data.data.results[0]
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ComicController