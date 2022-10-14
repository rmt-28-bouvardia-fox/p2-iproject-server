const axios = require('axios');
const { stringify } = require('querystring');

class ThirdApiController{
    static async verifyEmail(req,res,next){
        const {email} = req.body
        const options = {
        method: 'GET',
        url: 'https://emailvalidation.abstractapi.com/v1/?api_key=5e9aa63c7234481fa39b58d19739fb67&email='+email,
        params: {
            api_key:'5e9aa63c7234481fa39b58d19739fb67',
            email,
        },
        headers: {
        //   'X-RapidAPI-Key': '933ff4e29amshc9bebe50b519898p189fdfjsn8478560147d8',
        //   'X-RapidAPI-Host': 'email-checker.p.rapidapi.com'
            }
        };
        try{
            const response = await axios(options)
            const message = response.data
            res.status(200).json(message)
        }catch(err){
            next(err)
        }
        // axios.request(options)
        // .then(function (response) {
        //   res.status(200).json(response)
        // }).catch(function (error) {
        //   next(error)
        // });
    }
}

module.exports = ThirdApiController