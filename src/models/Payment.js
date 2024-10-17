const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Refunded'),
      defaultValue: 'Pending',
    },
    transaction_id: {
      type: DataTypes.STRING(100),
    },
    payment_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: 'Payments',
  }
);

module.exports = Payment;
