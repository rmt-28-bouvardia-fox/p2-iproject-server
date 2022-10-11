'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsToMany(models.Player, {as:'Players' , through: models.MyPlayer})
      Team.belongsTo(models.User)
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name is required' }
      }
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Logo is required' },
        notEmpty: { msg: 'Logo is required' }
      }
    },
    money: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    plays: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    totalRating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};