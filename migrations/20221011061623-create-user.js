'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique : true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique : true
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      firstName : {
        type : Sequelize.STRING,
        allowNull : false
      },
      lastName : {
        type : Sequelize.STRING,
        allowNull : false
      },
      address: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};