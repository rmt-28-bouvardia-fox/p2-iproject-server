'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsToMany(models.Team, {as: 'Team' , through: models.MyPlayer })
    }
  }
  Player.init({
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    position: DataTypes.STRING,
    number: DataTypes.INTEGER,
    team: DataTypes.STRING,
    photo: DataTypes.STRING
    // photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};