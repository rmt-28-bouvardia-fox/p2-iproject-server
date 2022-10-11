const axios = require('axios')

class Controller{

    static async getMusic(req,res,next){
        try {
            const music = await axios({
                url:``
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller