const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
  }
);

module.exports = Location;
