const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const PlayerM = require('../models/playerMongoDB');
const getPlayers = require('./getData');
const uri = 'mongodb+srv://fadilahagiel:ayambakar1@cluster0.uojn3ps.mongodb.net/Dream_Football'
mongoose.connect(uri);

const client = new MongoClient(uri);

const madridId = 541
const manUId = 33
const manCityId = 50
const psgId = 85

const seedPlayers = async () => { 
    const madridPlayers = getPlayers(madridId)
    const manUPlayers = getPlayers(manUId)
    const manCityPlayers = getPlayers(manCityId)
    const psgPlayers = getPlayers(psgId)
    
    
    PlayerM.insertMany(madridPlayers)
    PlayerM.insertMany(manUPlayers)
    PlayerM.insertMany(manCityPlayers)
    PlayerM.insertMany(psgPlayers)
}


