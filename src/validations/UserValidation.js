const { body } = require('express-validator');

const register = [
	body('username')
		.notEmpty()
		.withMessage('Username is required'),
	body('password')
		.isLength({ min: 6 })
		.withMessage(
			'Password must be at least 6 characters long'
		),
	body('email').isEmail().withMessage('Email is invalid'),
];

const login = [
	body('email').isEmail().withMessage('Email is invalid'),
	body('password')
		.notEmpty()
		.withMessage('Password is required'),
];

module.exports = { register, login };
