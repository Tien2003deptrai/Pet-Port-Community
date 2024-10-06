const { body } = require('express-validator');

const create = [
	body('post_id')
		.notEmpty()
		.withMessage('Post ID is required'),
	body('user_id')
		.notEmpty()
		.withMessage('User ID is required'),
	body('content')
		.notEmpty()
		.withMessage('Content is required'),
];

module.exports = { create };
