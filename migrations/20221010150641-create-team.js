'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      money: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 20000
      },
      points: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      plays: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wins: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalRating: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
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
    await queryInterface.dropTable('Teams');
  }
};