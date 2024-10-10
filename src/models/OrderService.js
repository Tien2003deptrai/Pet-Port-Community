const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderService = sequelize.define(
    'OrderService',
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'OrderServices',
    },
);

module.exports = OrderService;
