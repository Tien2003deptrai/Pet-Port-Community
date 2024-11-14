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
    gender: {
      type: DataTypes.ENUM('Nam', 'Nữ', 'Khác'),
      type: DataTypes.STRING(8),
      defaultValue: 'Nam',
    },
    role: {
      type: DataTypes.JSON,
      defaultValue: ['PetOwner'],
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
    },
    date_of_birth: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING(255),
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
    cccd: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    cccd_front_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cccd_back_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // Doctor-specific fields
    clinic_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    practice_certificate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opening_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closing_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    doctor_avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    certificate_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_doctor_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // Seller-specific fields
    store_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    store_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    business_license: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    store_logo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    business_license_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    store_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_store_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
