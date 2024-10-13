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
      type: DataTypes.ENUM('City', 'District', 'Commune'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Locations',
    underscored: true,
  },
);

module.exports = Location;
