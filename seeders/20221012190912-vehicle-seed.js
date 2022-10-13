'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
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
   const data = JSON.parse(fs.readFileSync('./vehicles.json','utf-8'))
   const fixedData = data.map((att) => {
    return {
      "name": att.name,
      "description": att.description,
      "imageUrl": att.imageUrl,
      "capacity": att.capacity,
      "perDay": att.perDay,
      "perWeek": att.perWeek,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }
   })
   await queryInterface.bulkInsert('Vehicles', fixedData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Vehicles', null, {})
  }
};
