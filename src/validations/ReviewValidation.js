const { body, param } = require('express-validator');

const ReviewValidation = {
  create: [
    body('petOwner_Id')
      .notEmpty()
      .withMessage('Reviewer ID is required')
      .isInt()
      .withMessage('Reviewer ID must be a valid integer'),
    body('product_id').optional().isInt().withMessage('Product ID must be a valid integer'),
    body('service_id').optional().isInt().withMessage('Service ID must be a valid integer'),
    body('rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('title').optional().isString().withMessage('Title must be a valid string'),
    body('comment').optional().isString().withMessage('Comment must be a valid string'),
    body('is_verified_purchase')
      .optional()
      .isBoolean()
      .withMessage('is_verified_purchase must be a boolean'),
  ],

  update: [
    param('id').isInt().withMessage('Review ID must be a valid integer'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('title').optional().isString().withMessage('Title must be a valid string'),
    body('comment').optional().isString().withMessage('Comment must be a valid string'),
  ],

  getById: [param('id').isInt().withMessage('Review ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Review ID must be a valid integer')],

  verifyReview: [param('id').isInt().withMessage('Review ID must be a valid integer')],
};

module.exports = ReviewValidation;
