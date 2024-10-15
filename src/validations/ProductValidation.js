const { body, param, query } = require('express-validator');

const ProductValidation = {
  create: [
    body('sales_center_id')
      .notEmpty()
      .withMessage('Sales Center ID is required')
      .isInt()
      .withMessage('Sales Center ID must be a valid integer'),
    body('category_id')
      .notEmpty()
      .withMessage('Category ID is required')
      .isInt()
      .withMessage('Category ID must be a valid integer'),
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isString()
      .withMessage('Name must be a valid string'),
    body('description').optional().isString().withMessage('Description must be a valid string'),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),
    body('stock_quantity')
      .optional()
      .isInt({ gt: -1 })
      .withMessage('Stock quantity must be a non-negative integer'),
    body('sku').optional().isString().withMessage('SKU must be a valid string'),
    body('images').optional().isArray().withMessage('Images must be an array of URLs'),
  ],

  update: [
    param('id').isInt().withMessage('Product ID must be a valid integer'),
    body('sales_center_id')
      .optional()
      .isInt()
      .withMessage('Sales Center ID must be a valid integer'),
    body('category_id').optional().isInt().withMessage('Category ID must be a valid integer'),
    body('name').optional().isString().withMessage('Name must be a valid string'),
    body('description').optional().isString().withMessage('Description must be a valid string'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock_quantity')
      .optional()
      .isInt({ gt: -1 })
      .withMessage('Stock quantity must be a non-negative integer'),
    body('sku').optional().isString().withMessage('SKU must be a valid string'),
    body('images').optional().isArray().withMessage('Images must be an array of URLs'),
  ],

  getById: [param('id').isInt().withMessage('Product ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Product ID must be a valid integer')],

  getProductsByOwner: [param('user_id').isInt().withMessage('User ID must be a valid integer')],

  filterProducts: [
    query('category_id').optional().isInt().withMessage('Category ID must be a valid integer'),
    query('min_price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Minimum price must be a positive number'),
    query('max_price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Maximum price must be a positive number'),
    query('is_active').optional().isBoolean().withMessage('is_active must be a boolean value'),
  ],
};

module.exports = ProductValidation;
