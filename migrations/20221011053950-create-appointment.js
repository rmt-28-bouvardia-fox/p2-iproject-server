'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chiefComplaint: {
        allowNull: false,
        type: Sequelize.STRING
      },
      symptom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      appointmentDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        defaultValue: "Uncomplete",
        type: Sequelize.STRING
      },
      PatientId: {
        allowNull: false,
        references: {
          model: "Patients",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: Sequelize.INTEGER
      },
      DoctorId: {
        allowNull: false,
        references: {
          model: "Doctors",
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
    await queryInterface.dropTable('Appointments');
  }
};