const { body, param } = require('express-validator');

const CouponValidation = {
  create: [
    body('code')
      .notEmpty()
      .withMessage('Coupon code is required')
      .isString()
      .withMessage('Coupon code must be a valid string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a valid string'),
    body('discount_type')
      .notEmpty()
      .withMessage('Discount type is required')
      .isIn(['Percentage', 'Fixed Amount'])
      .withMessage('Discount type must be either Percentage or Fixed Amount'),
    body('discount_value')
      .notEmpty()
      .withMessage('Discount value is required')
      .isNumeric()
      .withMessage('Discount value must be a number'),
    body('start_date')
      .notEmpty()
      .withMessage('Start date is required')
      .isISO8601()
      .withMessage('Start date must be a valid date'),
    body('end_date')
      .notEmpty()
      .withMessage('End date is required')
      .isISO8601()
      .withMessage('End date must be a valid date'),
    body('product_id')
      .optional()
      .isInt()
      .withMessage('Product ID must be a valid integer'),
  ],

  update: [
    param('id').isInt().withMessage('Coupon ID must be a valid integer'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a valid string'),
    body('discount_type')
      .optional()
      .isIn(['Percentage', 'Fixed Amount'])
      .withMessage('Discount type must be either Percentage or Fixed Amount'),
    body('discount_value')
      .optional()
      .isNumeric()
      .withMessage('Discount value must be a number'),
    body('start_date')
      .optional()
      .isISO8601()
      .withMessage('Start date must be a valid date'),
    body('end_date')
      .optional()
      .isISO8601()
      .withMessage('End date must be a valid date'),
    body('product_id')
      .optional()
      .isInt()
      .withMessage('Product ID must be a valid integer'),
  ],

  getById: [
    param('id').isInt().withMessage('Coupon ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Coupon ID must be a valid integer'),
  ],

  checkCoupon: [
    param('code')
      .notEmpty()
      .withMessage('Coupon code is required')
      .isString()
      .withMessage('Coupon code must be a valid string'),
  ],

  getCouponsByDiscountType: [
    param('discount_type')
      .notEmpty()
      .withMessage('Discount type is required')
      .isIn(['Percentage', 'Fixed Amount'])
      .withMessage('Discount type must be either Percentage or Fixed Amount'),
  ],
};

module.exports = CouponValidation;
