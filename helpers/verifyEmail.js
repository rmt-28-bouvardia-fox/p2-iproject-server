const axios = require('axios');
const { stringify } = require('querystring');

function verifyEmail(req, res, next){
    const {email} = req.body
    const options = {
        method: 'GET',
        url: 'https://api.apilayer.com/email_verification/check?email='+ email,
        Headers: {
            apikey: 'lM07I8nFwDouINZ0QF09fXWBY75qK0TQ'
        }
      };
      axios.request(options)
      .then(function (response) {
        console.log(response)
          res.status(200).json(response)
      })
      .catch(function (error) {
          next(error)
      });
}

module.exports = verifyEmail