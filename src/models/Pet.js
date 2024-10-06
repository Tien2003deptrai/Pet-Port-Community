const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define(
	'Pet',
	{
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		breed: {
			type: DataTypes.STRING(50),
		},
		age: {
			type: DataTypes.INTEGER,
		},
		gender: {
			type: DataTypes.ENUM(
				'Male',
				'Female',
				'Unknown'
			),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		medical_history: {
			type: DataTypes.TEXT,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		timestamps: true,
		tableName: 'Pets',
	}
);

module.exports = Pet;
