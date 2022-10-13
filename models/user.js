'use strict';
const {generateHash} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:`Username must unique`},
      validate:{
        notNull:{msg:`Username is required`},
        notEmpty:{msg:`Username is required`},
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:`Email must unique`},
      validate:{
        notNull:{msg:`Email is required`},
        notEmpty:{msg:`Email is required`},
        isEmail:{msg:`Invalid email format`}
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:`Password must unique`},
      validate:{
        notNull:{msg:`Password is required`},
        notEmpty:{msg:`Password is required`},
      }
    },
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING,
    orderId: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    accountStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    if(!instance.amount){
      instance.amount=100000
    }
    if(!instance.message){
      instance.message=`Support Our Idol`
    }
    instance.orderId=new Date().getTime()
    instance.paymentStatus="pending",
    instance.accountStatus="Reguler"
    instance.password=generateHash(instance.password)
  })
  return User;
};