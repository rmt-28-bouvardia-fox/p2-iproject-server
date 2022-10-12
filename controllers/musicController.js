const axios = require('axios')
const url = `https://api.napster.com//v2.2/tracks/top`
const where = require('lodash')

class Controller{

    static async getMusic(req,res,next){
        try {
            const { data } = await axios({
                method:'get',
                url:`${url}`,
                params:{
                    apikey:process.env.apikey
                }
            })
            const track = data.tracks
            const music = where(track,{ isStreamable : true })
            res.status(200).json(music)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller