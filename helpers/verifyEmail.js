const axios = require('axios');

function verifyEmail(req, res, next){
    const {email} = req.body
    const options = {
        method: 'GET',
        url: 'https://email-checker.p.rapidapi.com/verify/v1',
        params: {email},
        headers: {
          'X-RapidAPI-Key': '933ff4e29amshc9bebe50b519898p189fdfjsn8478560147d8',
          'X-RapidAPI-Host': 'email-checker.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          res.status(200).json(response)
      }).catch(function (error) {
          next(error)
      });
}

module.exports = verifyEmail