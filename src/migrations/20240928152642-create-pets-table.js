// migrations/XXXXXX-create-pets-table.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING(50),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Unknown'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      medical_history: {
        type: Sequelize.TEXT,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('Pets');
  },
};
