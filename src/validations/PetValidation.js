const { body, param } = require('express-validator');

const PetValidation = {
  create: [
    body('owner_id')
      .notEmpty()
      .withMessage('Owner ID is required')
      .isInt()
      .withMessage('Owner ID must be a valid integer'),
    body('category_id')
      .notEmpty()
      .withMessage('Category ID is required')
      .isInt()
      .withMessage('Category ID must be a valid integer'),
    body('name')
      .notEmpty()
      .withMessage('Pet name is required')
      .isString()
      .withMessage('Pet name must be a valid string'),
    body('breed').optional().isString().withMessage('Breed must be a valid string'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
    body('gender')
      .optional()
      .isIn(['Đực', 'Cái'])
      .withMessage('Gender must be one of the following: Đực, Cái'),
    body('description').optional().isString().withMessage('Description must be a valid string'),
    body('medical_history')
      .optional()
      .isString()
      .withMessage('Medical history must be a valid string'),
  ],

  update: [
    param('id').isInt().withMessage('Pet ID must be a valid integer'),
    body('owner_id').optional().isInt().withMessage('Owner ID must be a valid integer'),
    body('category_id').optional().isInt().withMessage('Category ID must be a valid integer'),
    body('name').optional().isString().withMessage('Pet name must be a valid string'),
    body('breed').optional().isString().withMessage('Breed must be a valid string'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
    body('gender')
      .optional()
      .isIn(['Đực', 'Cái'])
      .withMessage('Gender must be one of the following: Đực, Cái'),
    body('description').optional().isString().withMessage('Description must be a valid string'),
    body('medical_history')
      .optional()
      .isString()
      .withMessage('Medical history must be a valid string'),
  ],

  getById: [param('id').isInt().withMessage('Pet ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Pet ID must be a valid integer')],

  getPetsByOwner: [param('owner_id').isInt().withMessage('Owner ID must be a valid integer')],

  getPetsByCategory: [
    param('category_id').isInt().withMessage('Category ID must be a valid integer'),
  ],

  getPetsByGender: [
    param('gender')
      .notEmpty()
      .withMessage('Gender is required')
      .isIn(['Male', 'Female', 'Unknown'])
      .withMessage('Gender must be one of the following: Male, Female, Unknown'),
  ],
};

module.exports = PetValidation;
