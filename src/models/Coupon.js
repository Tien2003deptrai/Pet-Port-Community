const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define(
  'Coupon',
  {
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    discount_type: {
      type: DataTypes.ENUM('Percentage', 'Fixed Amount'),
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Coupons',
  }
);

module.exports = Coupon;
