'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsultationReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConsultationReport.init({
    diagnosis: DataTypes.STRING,
    needSurgicalAction: DataTypes.BOOLEAN,
    needMedicalDrug: DataTypes.BOOLEAN,
    cost: DataTypes.INTEGER,
    AppointmnetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConsultationReport',
  });
  return ConsultationReport;
};