'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyPlayer.belongsTo(models.Team)
      MyPlayer.belongsTo(models.Player)
    }
  }
  MyPlayer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TeamId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER,
    starter: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'MyPlayer',
    hooks: {
      beforeCreate(myPlayer) {
        myPlayer.starter = false
      }
    }
  });
  return MyPlayer;
};