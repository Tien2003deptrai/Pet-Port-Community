// migrations/XXXXXX-create-appointments-table.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pet_owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      pet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      appointment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Scheduled', 'Completed', 'Cancelled'),
        defaultValue: 'Scheduled',
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Appointments');
  },
};
