const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    sales_center_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    images: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: 'Products',
  },
);

module.exports = Product;
