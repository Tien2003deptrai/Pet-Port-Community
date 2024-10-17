const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wishlist = sequelize.define(
  'Wishlist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    petOwner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Wishlists',
  }
);

module.exports = Wishlist;
