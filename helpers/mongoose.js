const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const uri = 'mongodb+srv://fadilahagiel:ayambakar1@cluster0.uojn3ps.mongodb.net/Dream_Football'
mongoose.connect(uri);

const client = new MongoClient(uri);


// const player1 = new Player({
//     name: 'Modric',
//     rating: 8,
//     position: 'Midfielder',
//     number: 10,
//     team: 'Real Madrid',
//     photo: 'this is a photo'
// });

// player1.save().then((player) => console.log(player, 'berhasil'));