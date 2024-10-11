const { body, param } = require('express-validator');

const CategoryValidation = {
  create: [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a valid string'),
    body('type')
      .notEmpty()
      .withMessage('Type is required')
      .isIn(['Product', 'Service', 'Pet'])
      .withMessage('Type must be one of the following: Product, Service, Pet'),
  ],

  update: [
    param('id').isInt().withMessage('Category ID must be a valid integer'),
    body('name')
      .optional()
      .isString()
      .withMessage('Name must be a valid string'),
    body('type')
      .optional()
      .isIn(['Product', 'Service', 'Pet'])
      .withMessage('Type must be one of the following: Product, Service, Pet'),
  ],

  getById: [
    param('id').isInt().withMessage('Category ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Category ID must be a valid integer'),
  ],

  getByType: [
    param('type')
      .notEmpty()
      .withMessage('Type is required')
      .isIn(['Product', 'Service', 'Pet'])
      .withMessage('Type must be one of the following: Product, Service, Pet'),
  ],
};

module.exports = CategoryValidation;
