const { body } = require('express-validator');

const create = [
  body('order_id').notEmpty().withMessage('Order ID is required'),
  body('product_id').optional(),
  body('service_id').optional(),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit_price').isNumeric().withMessage('Unit price must be a number'),
  body('subtotal').isNumeric().withMessage('Subtotal must be a number'),
];

module.exports = { create };
