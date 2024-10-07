const { body } = require('express-validator');

const create = [
  body('doctor_id').notEmpty().withMessage('Doctor ID is required'),
  body('name').notEmpty().withMessage('Service name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

module.exports = { create };
