const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fadilahagiel@gmail.com',
        pass: 'uqlmtxaranuzkdfr'
    }
})

function sendOTP(email) {
    const randomNumber = Math.floor(Math.random() * 9999)
    const options = {
        from: 'fadilahagiel@gmail.com',
        to: email,
        subject: 'Verify your email',
        text: `Input ${randomNumber} to verify your email`
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            return err
        }
    })
    return randomNumber
}

module.exports = sendOTP