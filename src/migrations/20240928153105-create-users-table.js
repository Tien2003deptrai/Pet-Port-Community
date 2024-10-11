'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      role: {
        type: Sequelize.ENUM('PetOwner', 'SalesCenter', 'Doctor', 'Admin'),
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING(100),
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
      },
      address: {
        type: Sequelize.STRING(255),
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      avatar_url: {
        type: Sequelize.STRING(255),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      reset_password_token: {
        type: Sequelize.STRING(255),
      },
      reset_password_expires_at: {
        type: Sequelize.DATE,
      },
      verification_token: {
        type: Sequelize.STRING(255),
      },
      verification_token_expires_at: {
        type: Sequelize.DATE,
      },
      business_name: {
        type: Sequelize.STRING(100),
      },
      license_number: {
        type: Sequelize.STRING(50),
      },
      tax_id: {
        type: Sequelize.STRING(20),
      },
      website: {
        type: Sequelize.STRING(255),
      },
      business_description: {
        type: Sequelize.TEXT,
      },
      opening_hours: {
        type: Sequelize.TEXT,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
      },
      createdAt: {
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
