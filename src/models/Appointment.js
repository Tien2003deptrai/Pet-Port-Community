const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define(
  'Appointment',
  {
    pet_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
      defaultValue: 'Scheduled',
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: 'Appointments',
    underscored: true,
  },
);

module.exports = Appointment;
