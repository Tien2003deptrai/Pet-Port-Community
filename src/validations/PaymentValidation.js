const { body, param } = require('express-validator');

const PaymentValidation = {
  create: [
    body('orderId')
      .notEmpty()
      .withMessage('Order ID is required')
      .isInt()
      .withMessage('Order ID must be a valid integer'),
    ,
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
