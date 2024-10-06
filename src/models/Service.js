const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define(
	'Service',
	{
		doctor_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: true,
		tableName: 'Services',
	}
);

module.exports = Service;
