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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      groomName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fatherGroom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      motherGroom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      BrideName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fatherBride: {
        allowNull: false,
        type: Sequelize.STRING
      },
      motherBride: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weddingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      weddingLocation: {
        allowNull: false,
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