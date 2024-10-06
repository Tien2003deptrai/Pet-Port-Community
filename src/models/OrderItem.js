const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define(
	'OrderItem',
	{
		order_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
		},
		service_id: {
			type: DataTypes.INTEGER,
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
		tableName: 'OrderItems',
	}
);

module.exports = OrderItem;
