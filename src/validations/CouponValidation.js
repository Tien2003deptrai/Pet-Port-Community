const { body } = require('express-validator');

const create = [
  body('code').notEmpty().withMessage('Coupon code is required'),
  body('discount_type')
    .isIn(['Percentage', 'Fixed Amount'])
    .withMessage('Invalid discount type'),
  body('discount_value')
    .isNumeric()
    .withMessage('Discount value must be a number'),
];

module.exports = { create };
