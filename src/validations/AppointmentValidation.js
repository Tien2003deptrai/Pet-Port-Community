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
    body('service_id')
      .notEmpty()
      .withMessage('Service ID is required')
      .isInt()
      .withMessage('Service ID must be a valid integer'),
    body('appointment_date')
      .notEmpty()
      .withMessage('Appointment date is required')
      .isISO8601()
      .withMessage('Appointment date must be valid'),
    body('notes')
      .optional()
      .isString()
      .withMessage('Notes must be a valid string'),
  ],

  update: [
    param('id').isInt().withMessage('Appointment ID must be a valid integer'),
    body('pet_owner_id')
      .optional()
      .isInt()
      .withMessage('Pet Owner ID must be a valid integer'),
    body('pet_id')
      .optional()
      .isInt()
      .withMessage('Pet ID must be a valid integer'),
    body('doctor_id')
      .optional()
      .isInt()
      .withMessage('Doctor ID must be a valid integer'),
    body('service_id')
      .optional()
      .isInt()
      .withMessage('Service ID must be a valid integer'),
    body('appointment_date')
      .optional()
      .isISO8601()
      .withMessage('Appointment date must be valid'),
    body('status')
      .optional()
      .isString()
      .withMessage('Status must be a valid string'),
    body('notes')
      .optional()
      .isString()
      .withMessage('Notes must be a valid string'),
  ],
};

module.exports = AppointmentValidation;
