const { body, param } = require('express-validator');

const UserValidation = {
  register: [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Invalid phone number'),
  ],

  login: [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],

  verifyEmail: [
    body('code').notEmpty().withMessage('Verification code is required'),
  ],

  resetPassword: [
    param('token').notEmpty().withMessage('Reset token is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],

  updateUser: [
    param('userId').isInt().withMessage('User ID must be a valid integer'),
    body('username')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
  ],

  deleteUser: [
    param('id').isInt().withMessage('User ID must be a valid integer'),
  ],

  manageUserRoles: [
    body('userId').isInt().withMessage('User ID must be a valid integer'),
    body('role').notEmpty().withMessage('Role is required'),
  ],

  updateAvatar: [
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
  ],
};

module.exports = UserValidation;
