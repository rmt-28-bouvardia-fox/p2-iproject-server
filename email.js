const nodemailer = require('nodemailer')
function sendMail(user){
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    })

    const options = {
        from : process.env.EMAIL,
        to : user.email,
        subject : 'Welcoming Email',
        text: `Welcome and Enjoy`
    }

    return transporter.sendMail(options, (err,info) =>{
        if(err){
            throw(err)
        } 
        console.log(`success send mail to ${user.email}`)
    })
}

module.exports = sendMail