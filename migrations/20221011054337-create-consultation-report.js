'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConsultationReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diagnosis: {
        allowNull: false,
        type: Sequelize.STRING
      },
      needSurgicalAction: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      needMedicalDrug: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      AppointmnetId: {
        allowNull: false,
        references: {
          model: "Appointments",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
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
    await queryInterface.dropTable('ConsultationReports');
  }
};