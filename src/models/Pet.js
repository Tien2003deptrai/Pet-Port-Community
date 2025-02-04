const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define(
  'Pet',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    breed: {
      type: DataTypes.STRING(50),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.ENUM('Cái', 'Đực'),
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
    images: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: 'Pets',
  }
);

module.exports = Pet;
