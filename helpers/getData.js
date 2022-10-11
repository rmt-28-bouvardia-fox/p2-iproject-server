'use strict';
const axios = require('axios');
const apiSportUrl = 'https://v3.football.api-sports.io'
let xRapidApiHost = `v3.football.api-sports.io`
let xRapidApiKey = `f994994322f91099d8b50c0659c88b12`

async function getPlayers(TeamId) {
    let players = []
    var { data } = await axios({
        url: `${apiSportUrl}/players/squads?team=${TeamId}`,
        methods: 'GET',
        headers: {
            "x-rapid-host": xRapidApiHost,
            "x-rapidapi-key": xRapidApiKey
        }
    })
    const getPlayers = await data.response[0].players
    const getTeam = await data.response[0].team.name
    let rating = 0
    await getPlayers.forEach((el) => {
        if (el.number) {
            if (el.number <= 10) {
                rating = Math.random() * 1.5 + 8
            } else if (el.number <= 20) {
                rating = Math.random() * 1.5 + 7
            } else if (el.number <= 30) {
                rating = Math.random() * 1.5 + 6
            } else {
                rating = Math.random() * 1.5 + 6
            }
            let player = {
                name: el.name,
                team: getTeam,
                rating: Number(rating.toFixed(2)),
                position: el.position,
                photo: el.photo,
                number: el.number,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            players.push(player)
        }
    });
    return players

}
module.exports = getPlayers