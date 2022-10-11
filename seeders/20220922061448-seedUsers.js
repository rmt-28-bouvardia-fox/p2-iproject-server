'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = require('../data/users.json').map((e) => {
      return {
        ...e,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: bcrypt.hashSync(e.password, 8)
      }
    })
    // console.log(users)
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  },
}
