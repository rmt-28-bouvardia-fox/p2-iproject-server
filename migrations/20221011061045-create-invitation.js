'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      groomName: {
        type: Sequelize.STRING
      },
      fatherGroom: {
        type: Sequelize.STRING
      },
      motherGroom: {
        type: Sequelize.STRING
      },
      BrideName: {
        type: Sequelize.STRING
      },
      fatherBride: {
        type: Sequelize.STRING
      },
      motherBride: {
        type: Sequelize.STRING
      },
      weddingDate: {
        type: Sequelize.DATE
      },
      weddingLocation: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Invitations');
  }
};