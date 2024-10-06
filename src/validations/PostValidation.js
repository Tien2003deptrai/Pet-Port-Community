const { body } = require('express-validator');

const create = [
	body('user_id')
		.notEmpty()
		.withMessage('User ID is required'),
	body('title')
		.notEmpty()
		.withMessage('Title is required'),
	body('content')
		.notEmpty()
		.withMessage('Content is required'),
];

module.exports = { create };
