const { body, param } = require('express-validator');

const OrderValidation = {
  createOrderProduct: [
    body('petOwner_id')
      .notEmpty()
      .withMessage('Pet Owner ID is required')
      .isInt()
      .withMessage('Pet Owner ID must be a valid integer'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('Order items must be an array with at least one item'),
    body('items.*.productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .isInt()
      .withMessage('Product ID must be a valid integer'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],

  update: [
    param('id').isInt().withMessage('Order ID must be a valid integer'),
    body('status')
      .optional()
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage(
        'Status must be one of the following: Pending, Processing, Shipped, Delivered, Cancelled'
      ),
  ],

  getById: [param('id').isInt().withMessage('Order ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Order ID must be a valid integer')],

  getOrdersByCustomer: [
    param('petOwner_id').isInt().withMessage('Pet Owner ID must be a valid integer'),
  ],

  getOrdersByStatus: [
    param('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .withMessage(
        'Status must be one of the following: Pending, Processing, Shipped, Delivered, Cancelled'
      ),
  ],
};

module.exports = OrderValidation;
