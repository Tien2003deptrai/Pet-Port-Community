const { body, param } = require('express-validator');

const LikeValidation = {
  create: [
    body('petOwner_Id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('post_id').optional().isInt().withMessage('Post ID must be a valid integer'),
    body('comment_id').optional().isInt().withMessage('Comment ID must be a valid integer'),
  ],

  delete: [param('id').isInt().withMessage('Like ID must be a valid integer')],

  deleteAllLikesByUser: [
    param('petOwner_Id').isInt().withMessage('User ID must be a valid integer'),
  ],

  getLikesByPost: [
    param('post_id')
      .notEmpty()
      .withMessage('Post ID is required')
      .isInt()
      .withMessage('Post ID must be a valid integer'),
  ],

  getLikesByComment: [
    param('comment_id')
      .notEmpty()
      .withMessage('Comment ID is required')
      .isInt()
      .withMessage('Comment ID must be a valid integer'),
  ],

  checkIfLiked: [
    body('petOwner_Id')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be a valid integer'),
    body('post_id').optional().isInt().withMessage('Post ID must be a valid integer'),
    body('comment_id').optional().isInt().withMessage('Comment ID must be a valid integer'),
  ],

  getTotalLikes: [
    param('post_id').optional().isInt().withMessage('Post ID must be a valid integer'),
    param('comment_id').optional().isInt().withMessage('Comment ID must be a valid integer'),
  ],
};

module.exports = LikeValidation;
