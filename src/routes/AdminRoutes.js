const express = require('express');
const { AdminController } = require('@controllers');
const router = express.Router();

router.post('/register-user', AdminController.registerUser);

router.put('/role/:userId', AdminController.manageUserRoles);

router.post('/upgrade-to-doctor', AdminController.UpgradeToDoctor);

router.post('/avatar', AdminController.updateAvatar);

module.exports = router;
