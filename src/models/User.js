const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
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
  },
);

module.exports = User;
