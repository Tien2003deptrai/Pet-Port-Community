const { body, param } = require('express-validator');

const PaymentValidation = {
  create: [
    body('orderId')
      .notEmpty()
      .withMessage('Order ID is required')
      .isInt()
      .withMessage('Order ID must be a valid integer'),
    body('items')
      .notEmpty()
      .withMessage('Payment items are required')
      .isArray()
      .withMessage('Payment items must be an array')
      .custom(value => {
        if (!value.length) {
          throw new Error('Payment items cannot be empty');
        }
        return true;
      }),
    body('items.*.name')
      .notEmpty()
      .withMessage('Item name is required')
      .isString()
      .withMessage('Item name must be a valid string'),
    body('items.*.priceInCents')
      .isInt({ min: 0 })
      .withMessage('Price must be a non-negative integer'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  ],

  updatePaymentStatus: [
    body('paymentIntentId')
      .notEmpty()
      .withMessage('Payment Intent ID is required')
      .isString()
      .withMessage('Payment Intent ID must be a valid string'),
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Pending', 'Completed', 'Failed'])
      .withMessage('Status must be one of the following: Pending, Completed, Failed'),
    body('orderId')
      .notEmpty()
      .withMessage('Order ID is required')
      .isInt()
      .withMessage('Order ID must be a valid integer'),
  ],

  getById: [param('id').isInt().withMessage('Payment ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Payment ID must be a valid integer')],

  getPaymentsByOrderId: [param('orderId').isInt().withMessage('Order ID must be a valid integer')],

  getPaymentsByStatus: [
    param('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Pending', 'Completed', 'Failed'])
      .withMessage('Status must be one of the following: Pending, Completed, Failed'),
  ],

  getPaymentsInDateRange: [
    param('startDate').isISO8601().withMessage('Start date must be a valid date'),
    param('endDate').isISO8601().withMessage('End date must be a valid date'),
  ],
};

module.exports = PaymentValidation;
