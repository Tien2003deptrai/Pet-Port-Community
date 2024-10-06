const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define(
	'Location',
	{
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM(
				'City',
				'District',
				'Commune'
			),
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: 'Locations',
	}
);

module.exports = Location;
