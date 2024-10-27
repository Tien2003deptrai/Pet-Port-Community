const express = require('express');
const { AdminController } = require('@controllers');
const router = express.Router();

router.post('/register-user', AdminController.registerUser);

module.exports = router;
