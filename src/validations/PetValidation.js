const { body } = require('express-validator');

const create = [
  body('owner_id').notEmpty().withMessage('Owner ID is required'),
  body('name').notEmpty().withMessage('Pet name is required'),
  body('gender')
    .isIn(['Male', 'Female', 'Unknown'])
    .withMessage('Invalid gender'),
];

module.exports = { create };
