const md5 = require('md5')
const axios = require('axios')
const date = new Date().getTime()
const publicK = process.env.PUBLIC_KEY
const privateK = process.env.PRIVATE_KEY
const hashUrl = date + privateK + publicK
const hash = md5(hashUrl)

class CharacterController {

    static async getAllCharacters(req,res,next){
        try {
            const {data} = await axios ({
                url : `https://gateway.marvel.com:443/v1/public/characters`,
                params : {
                    ts : date,
                    apikey : publicK,
                    hash : hash,
                    limit : 10,
                },
                method : 'get'
            })
            res.status(200).json(data.data.results)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CharacterController