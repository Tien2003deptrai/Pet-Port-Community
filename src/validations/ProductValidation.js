const { body } = require('express-validator');

const create = [
  body('sales_center_id').notEmpty().withMessage('Sales Center ID is required'),
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

module.exports = { create };
