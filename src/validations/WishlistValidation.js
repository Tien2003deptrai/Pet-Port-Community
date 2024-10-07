const { body } = require('express-validator');

const create = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('product_id').optional(),
  body('service_id').optional(),
];

module.exports = { create };
