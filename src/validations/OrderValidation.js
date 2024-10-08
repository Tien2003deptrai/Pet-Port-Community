const { body, param } = require('express-validator');

const OrderValidation = {
  create: [
    body('customerId')
      .notEmpty().withMessage('Customer ID is required')
      .isInt().withMessage('Customer ID must be a valid integer'),
    body('items')
      .notEmpty().withMessage('Order items are required')
      .isArray().withMessage('Order items must be an array')
      .custom((value) => {
        if (!value.length) {
          throw new Error('Order items cannot be empty');
        }
        return true;
      }),
    body('items.*.productId').optional().isInt().withMessage('Product ID must be a valid integer'),
    body('items.*.serviceId').optional().isInt().withMessage('Service ID must be a valid integer'),
    body('items.*.quantity')
      .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('items.*.price')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],

  update: [
    param('id').isInt().withMessage('Order ID must be a valid integer'),
    body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage('Status must be one of the following: Pending, Processing, Shipped, Delivered, Cancelled'),
  ],

  getById: [
    param('id').isInt().withMessage('Order ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Order ID must be a valid integer'),
  ],

  getOrdersByCustomer: [
    param('customerId').isInt().withMessage('Customer ID must be a valid integer'),
  ],

  getOrdersByStatus: [
    param('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage('Status must be one of the following: Pending, Processing, Shipped, Delivered, Cancelled'),
  ],
};

module.exports = OrderValidation;
