'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Users", "longtitude", Sequelize.INTEGER)
    await queryInterface.addColumn("Users", "latitude", Sequelize.INTEGER)
    await queryInterface.removeColumn("Users", "address",{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn("Users", "longtitude")
     await queryInterface.removeColumn("Users", "latitude")
  }
};
