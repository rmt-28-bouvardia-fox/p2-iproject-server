'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { onDelete : 'cascade', onUpdate : 'cascade'})
    }
  }
  Order.init({
    orderNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Order number can't be empty`
        },
        notNull : {
          msg : `Order number can't be empty`
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Status Order can't be empty`
        },
        notNull : {
          msg : `Status Order can't be empty`
        }
      }
    },
    comicId: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Comic id can't be empty`
        },
        notNull : {
          msg : `Comic id can't be empty`
        }
      }
    },
    comicName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Comic name can't be empty`
        },
        notNull : {
          msg : `Comic name can't be empty`
        }
      }
    },
    comicImageUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Comic Image Url can't be empty`
        },
        notNull : {
          msg : `Comic Image Url can't be empty`
        }
      }
    },
    price : DataTypes.INTEGER,
    order_id : DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};