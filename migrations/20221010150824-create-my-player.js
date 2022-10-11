'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyPlayers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TeamId: {
        references: {
          model: 'Teams',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      starter: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      PlayerId: {
        references: {
          model: 'Players',
          key: 'id'
        },
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('MyPlayers');
  }
};