const { body, param } = require('express-validator');

const ServiceValidation = {
  create: [
    body('doctor_id')
      .notEmpty()
      .withMessage('Doctor ID is required')
      .isInt()
      .withMessage('Doctor ID must be a valid integer'),
    body('category_id')
      .notEmpty()
      .withMessage('Category ID is required')
      .isInt()
      .withMessage('Category ID must be a valid integer'),
    body('name')
      .notEmpty()
      .withMessage('Service name is required')
      .isString()
      .withMessage('Service name must be a valid string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a valid string'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),
  ],

  update: [
    param('id').isInt().withMessage('Service ID must be a valid integer'),
    body('name')
      .optional()
      .isString()
      .withMessage('Service name must be a valid string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a valid string'),
    body('price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),
  ],

  getById: [
    param('id').isInt().withMessage('Service ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Service ID must be a valid integer'),
  ],

  getServicesByDoctor: [
    param('doctor_id').isInt().withMessage('Doctor ID must be a valid integer'),
  ],

  getServicesByCategory: [
    param('category_id')
      .isInt()
      .withMessage('Category ID must be a valid integer'),
  ],
};

module.exports = ServiceValidation;
