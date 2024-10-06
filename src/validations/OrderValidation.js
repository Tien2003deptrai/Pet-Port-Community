const { body } = require('express-validator');

const create = [
	body('customer_id')
		.notEmpty()
		.withMessage('Customer ID is required'),
	body('total_amount')
		.isNumeric()
		.withMessage('Total amount must be a number'),
];

module.exports = { create };
