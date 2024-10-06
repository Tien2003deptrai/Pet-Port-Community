const { body } = require('express-validator');

const create = [
	body('order_id')
		.notEmpty()
		.withMessage('Order ID is required'),
	body('amount')
		.isNumeric()
		.withMessage('Amount must be a number'),
	body('payment_method')
		.isIn([
			'Credit Card',
			'PayPal',
			'Bank Transfer',
			'Cash on Delivery',
		])
		.withMessage('Invalid payment method'),
];

module.exports = { create };
