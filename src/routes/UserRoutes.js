const express = require('express');
const { UserController } = require('../controllers');
const UserValidation = require('../validations/UserValidation');
const router = express.Router();

router.post(
	'/register',
	UserValidation.register,
	UserController.register
);
router.post(
	'/login',
	UserValidation.login,
	UserController.login
);
router.post('/logout', UserController.logout);

router.post('/verify-email', UserController.verifyEmail);
router.post(
	'/forgot-password',
	UserController.forgotPassword
);
router.post(
	'/reset-password/:token',
	UserController.resetPassword
);

router.post('/refresh-token', UserController.refreshToken);

module.exports = router;
