const md5 = require('md5')
const axios = require('axios')

class ComicController{
    
    static async getComics(req,res,next){
        try {
            const date = new Date().getTime()
            const publicK = `00c5e0760647c811c518da42ba6c88d2`
            const privateK = `385b9b343cde680ec511e8a94c2dca50e017c2d8`
            const hashUrl = date + privateK + publicK
            const hash = md5(hashUrl)
            const {data} = await axios({
                url: `https://gateway.marvel.com:443/v1/public/comics?ts=${date}&apikey=${publicK}&hash=${hash}`,
                method : `get`,
            })
            const result = data.data.results
            
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ComicController