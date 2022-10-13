const axios = require('axios')

class HolomemberController{
    static async getChannel(req,res,next){
        try {
            let {data} = await axios({
                url:`https://api.holotools.app/v1/channels`,
                method:'GET'
            })
            res.status(200).json(data.channels)
        } catch (err) {
            next(err)
        }
    }
    static async getLiveById(req,res,next){
        try {
            const channel_id=req.params.id
            let {data} = await axios({
                url:`https://api.holotools.app/v1/live?channel_id=${channel_id}`,
                method:'GET'
            })
            res.status(200).json(data.live)
        } catch (err) {
            next(err)
        }
    }
    static async getUpcomingById(req,res,next){
        try {
            const channel_id=req.params.id
            let {data} = await axios({
                url:`https://api.holotools.app/v1/live?channel_id=${channel_id}`,
                method:'GET'
            })
            res.status(200).json(data.upcoming)
        } catch (err) {
            next(err)
        }
    }
}

module.exports=HolomemberController