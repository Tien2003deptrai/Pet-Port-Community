const { body, param } = require('express-validator');

const CommentValidation = {
  create: [
    body('post_id')
      .notEmpty()
      .withMessage('Post ID is required')
      .isInt()
      .withMessage('Post ID must be a valid integer'),
    body('petOwner_Id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('content')
      .notEmpty()
      .withMessage('Content is required')
      .isString()
      .withMessage('Content must be a valid string'),
  ],

  update: [
    param('id').isInt().withMessage('Comment ID must be a valid integer'),
    body('content')
      .optional()
      .isString()
      .withMessage('Content must be a valid string'),
  ],

  getById: [
    param('id').isInt().withMessage('Comment ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Comment ID must be a valid integer'),
  ],

  getCommentsByPost: [
    param('post_id')
      .notEmpty()
      .withMessage('Post ID is required')
      .isInt()
      .withMessage('Post ID must be a valid integer'),
  ],

  getCommentsByUser: [
    param('petOwner_Id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
  ],

  checkCommentExists: [
    param('id').isInt().withMessage('Comment ID must be a valid integer'),
  ],
};

module.exports = CommentValidation;
