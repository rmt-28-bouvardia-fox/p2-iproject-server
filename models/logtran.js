'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogTran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     LogTran.belongsTo(models.User, {foreignKey : "UserId"})
     LogTran.belongsTo(models.Arisan, {foreignKey : "ArisanId"})

    }
  }
  LogTran.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ArisanId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LogTran',
  });
  LogTran.beforeCreate((app, opt) => {
    app.status = "Pending"
  })
  return LogTran;
};