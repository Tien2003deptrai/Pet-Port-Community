const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wishlist = sequelize.define(
  'Wishlist',
  {
    petOwner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    service_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'Wishlists',
  },
);

module.exports = Wishlist;
