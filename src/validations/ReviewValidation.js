const { body } = require('express-validator');

const create = [
	body('reviewer_id')
		.notEmpty()
		.withMessage('Reviewer ID is required'),
	body('rating')
		.isInt({ min: 1, max: 5 })
		.withMessage('Rating must be between 1 and 5'),
	body('comment').optional(),
];

module.exports = { create };
