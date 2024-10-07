const { body } = require('express-validator');

const create = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('post_id')
    .optional()
    .notEmpty()
    .withMessage('Post ID is required if provided'),
  body('comment_id')
    .optional()
    .notEmpty()
    .withMessage('Comment ID is required if provided'),
];

module.exports = { create };
