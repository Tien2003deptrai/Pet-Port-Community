const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Order',
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ),
      defaultValue: 'Pending',
    },
  },
  {
    timestamps: true,
    tableName: 'Orders',
  },
);

module.exports = Order;
