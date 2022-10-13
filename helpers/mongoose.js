const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const PlayerM = require('../models/playerMongoDB');
const Opponent = require('../models/opponent')
const {getPlayers, getOpponents} = require('./getData');
const uri = 'mongodb+srv://fadilahagiel:ayambakar1@cluster0.uojn3ps.mongodb.net/Dream_Football'
mongoose.connect(uri);

const client = new MongoClient(uri);

const madridId = 541
const manUId = 33
const manCityId = 50
const psgId = 85
const livId = 40
const arsId = 42
const barId = 529
const munId = 157
const acmId = 489
const juvId = 496

const seedPlayers = async () => { 
    const madridPlayers = await getPlayers(madridId)
    const manUPlayers = await getPlayers(manUId)
    const manCityPlayers = await getPlayers(manCityId)
    const psgPlayers = await getPlayers(psgId)
    
    
    PlayerM.insertMany(madridPlayers)
    PlayerM.insertMany(manUPlayers)
    PlayerM.insertMany(manCityPlayers)
    PlayerM.insertMany(psgPlayers)
    console.log('berhasil seeding players');
}

const seedOpponents = async () => {
    const rma = await getOpponents(madridId)
    const mUnited = await getOpponents(manUId)
    const mCity = await getOpponents(manCityId)
    const PSG = await getOpponents(psgId)
    const liv = await getOpponents(livId)
    const ars = await getOpponents(arsId)
    const bar = await getOpponents(barId)
    const mun = await getOpponents(munId)
    const acm = await getOpponents(acmId)
    const juv = await getOpponents(juvId)
    const opponents = [rma, mUnited, mCity, PSG, liv, ars, bar, mun, acm, juv]
    Opponent.insertMany(opponents)
    console.log('berhasil seeding opponents');
}

// seedPlayers
// seedOpponents()


