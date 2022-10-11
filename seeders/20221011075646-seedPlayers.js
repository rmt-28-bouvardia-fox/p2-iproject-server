'use strict';
const axios = require('axios');
const getPlayers = require('../helpers/getData');
const madridId = 541
const manUId = 33
const manCityId = 50
const psgId = 85
const teams = [madridId, manUId, manCityId, psgId]


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // teams.forEach((el) => {
      
    // })
    let players = []
    const madridPlayers = await getPlayers(madridId)
    await queryInterface.bulkInsert('Players', madridPlayers, {})
    const manUPlayers = await getPlayers(manUId)
    await queryInterface.bulkInsert('Players', manUPlayers, {})
    const manCityPlayers = await getPlayers(manCityId)
    await queryInterface.bulkInsert('Players', manCityPlayers, {})
    const psgPlayers = await getPlayers(psgId)
    await queryInterface.bulkInsert('Players', psgPlayers, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Players', null, {});
  }
};
