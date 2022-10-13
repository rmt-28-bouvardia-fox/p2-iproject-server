const mongoose = require('mongoose')


const PlayerM = mongoose.model('Player', {
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
})

module.exports = PlayerM