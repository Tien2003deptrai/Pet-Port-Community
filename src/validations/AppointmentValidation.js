const { body } = require('express-validator');

const create = [
  body('pet_owner_id').notEmpty().withMessage('Pet Owner ID is required'),
  body('pet_id').notEmpty().withMessage('Pet ID is required'),
  body('doctor_id').notEmpty().withMessage('Doctor ID is required'),
  body('service_id').notEmpty().withMessage('Service ID is required'),
  body('appointment_date')
    .isISO8601()
    .withMessage('Appointment date is required and must be valid'),
];

module.exports = { create };
