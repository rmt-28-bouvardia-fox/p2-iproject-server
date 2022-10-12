const mongoose = require('mongoose')
const { getOpponents } = require('../helpers/getData')


const Opponent = mongoose.model('Opponent', {
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
})


module.exports = Opponent