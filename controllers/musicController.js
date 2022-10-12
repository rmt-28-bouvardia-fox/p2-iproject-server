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
            let music = []
            for(let i = 0; i < track.length ;i++){
                let data = {
                    id: ++i,
                    name : track[i].name,
                    artist : track[i].artistName,
                    cover : "https://i.scdn.co/image/ab67616d0000b2737da6f8edfd0404b5c52de3eb",
                    source : track[i].previewURL,
                    favorited:false
                }
                music.push(data)
                data = {}
            }
            res.status(200).json(music)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller