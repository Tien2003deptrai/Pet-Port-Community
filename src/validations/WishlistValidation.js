const { body, param } = require('express-validator');

const WishlistValidation = {
  create: [
    body('user_id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('product_id').optional().isInt().withMessage('Product ID must be a valid integer'),
    body('service_id').optional().isInt().withMessage('Service ID must be a valid integer'),
  ],

  delete: [param('id').isInt().withMessage('Wishlist item ID must be a valid integer')],

  deleteAll: [
    param('user_id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
  ],

  countWishlistItems: [
    param('user_id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
  ],

  checkItemExists: [
    body('user_id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('product_id').optional().isInt().withMessage('Product ID must be a valid integer'),
    body('service_id').optional().isInt().withMessage('Service ID must be a valid integer'),
  ],
};

module.exports = WishlistValidation;
