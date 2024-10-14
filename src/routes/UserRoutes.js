const express = require('express');
const { UserController } = require('@controllers');
const { UserValidation } = require('@validations');
const router = express.Router();

router.post('/register', UserValidation.register, UserController.register);
router.post('/login', UserValidation.login, UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh-token', UserController.refreshToken);
router.post('/verify-email', UserController.verifyEmail);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password/:token', UserController.resetPassword);



module.exports = router;
