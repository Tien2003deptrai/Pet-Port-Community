const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 255],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 100],
      },
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    role: {
      type: DataTypes.ENUM('PetOwner', 'SalesCenter', 'Doctor', 'Admin'),
      defaultValue: 'PetOwner',
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    location_id: {
      type: DataTypes.INTEGER,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    reset_password_token: {
      type: DataTypes.STRING(255),
    },
    reset_password_expires_at: {
      type: DataTypes.DATE,
    },
    verification_token: {
      type: DataTypes.STRING(255),
    },
    verification_token_expires_at: {
      type: DataTypes.DATE,
    },
    business_name: {
      type: DataTypes.STRING(100),
    },
    license_number: {
      type: DataTypes.STRING(50),
    },
    tax_id: {
      type: DataTypes.STRING(20),
    },
    website: {
      type: DataTypes.STRING(255),
    },
    business_description: {
      type: DataTypes.TEXT,
    },
    opening_hours: {
      type: DataTypes.TEXT,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
    },
  },
  {
    timestamps: true,
    tableName: 'Users',

    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        unique: true,
        fields: ['username'],
      },
    ],
  }
);

module.exports = User;
