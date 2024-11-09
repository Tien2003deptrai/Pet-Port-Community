const { body, param } = require('express-validator');

const AppointmentValidation = {
  create: [
    body('pet_owner_id')
      .notEmpty()
      .withMessage('Pet Owner ID is required')
      .isInt()
      .withMessage('Pet Owner ID must be a valid integer'),

    body('pet_id')
      .notEmpty()
      .withMessage('Pet ID is required')
      .isInt()
      .withMessage('Pet ID must be a valid integer'),

    body('doctor_id')
      .notEmpty()
      .withMessage('Doctor ID is required')
      .isInt()
      .withMessage('Doctor ID must be a valid integer'),
    body('appointment_date')
      .notEmpty()
      .withMessage('Appointment date is required')
      .isISO8601()
      .withMessage('Appointment date must be valid'),
    body('appointment_time').notEmpty().withMessage('Appointment time is required'),
    body('notes')
      .optional()
      .isString()
      .withMessage('Notes must be a valid string')
      .isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters'),
  ],

  update: [
    param('id')
      .notEmpty()
      .withMessage('Appointment ID is required')
      .isInt()
      .withMessage('Appointment ID must be a valid integer'),

    body('appointment_date').optional().isISO8601().withMessage('Appointment date must be valid'),
    body('appointment_time').notEmpty().withMessage('Appointment time is required'),
    body('status')
      .optional()
      .isIn(['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'])
      .withMessage('Status must be one of Scheduled, Completed, Rescheduled, Cancelled'),

    body('notes')
      .optional()
      .isString()
      .withMessage('Notes must be a valid string')
      .isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters'),
  ],

  getById: [
    param('id')
      .notEmpty()
      .withMessage('Appointment ID is required')
      .isInt()
      .withMessage('Appointment ID must be a valid integer'),
  ],

  delete: [
    param('id')
      .notEmpty()
      .withMessage('Appointment ID is required')
      .isInt()
      .withMessage('Appointment ID must be a valid integer'),
  ],

  getByPetOwner: [
    param('pet_owner_id')
      .notEmpty()
      .withMessage('Pet Owner ID is required')
      .isInt()
      .withMessage('Pet Owner ID must be a valid integer'),
  ],

  getByDoctor: [
    param('doctor_id')
      .notEmpty()
      .withMessage('Doctor ID is required')
      .isInt()
      .withMessage('Doctor ID must be a valid integer'),
  ],

  getByStatus: [
    param('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'])
      .withMessage('Status must be one of Scheduled, Completed, Rescheduled, Cancelled'),
  ],

  checkAppointmentConflict: [
    body('doctor_id')
      .notEmpty()
      .withMessage('Doctor ID is required')
      .isInt()
      .withMessage('Doctor ID must be a valid integer'),

    body('appointment_date')
      .notEmpty()
      .withMessage('Appointment date is required')
      .isISO8601()
      .withMessage('Appointment date must be valid')
      .custom(value => {
        if (new Date(value) <= new Date()) {
          throw new Error('Appointment date must be in the future');
        }
        return true;
      }),
  ],
};

module.exports = AppointmentValidation;
