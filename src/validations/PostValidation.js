const { body, param, query } = require('express-validator');

const PostValidation = {
  create: [
    body('petOwner_Id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title must be a valid string'),
    body('content')
      .notEmpty()
      .withMessage('Content is required')
      .isString()
      .withMessage('Content must be a valid string'),
    body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
  ],

  update: [
    param('id').isInt().withMessage('Post ID must be a valid integer'),
    body('title').optional().isString().withMessage('Title must be a valid string'),
    body('content').optional().isString().withMessage('Content must be a valid string'),
    body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
  ],

  getById: [param('id').isInt().withMessage('Post ID must be a valid integer')],

  delete: [param('id').isInt().withMessage('Post ID must be a valid integer')],

  getPostsByUser: [param('petOwner_Id').isInt().withMessage('User ID must be a valid integer')],

  searchPostsByTitle: [
    query('title')
      .notEmpty()
      .withMessage('Title query is required')
      .isString()
      .withMessage('Title must be a valid string'),
  ],
};

module.exports = PostValidation;
