const express = require('express');
const { AdminController } = require('@controllers');
const router = express.Router();

router.post('/register-user', AdminController.registerUser);

router.post('/avatar', AdminController.updateAvatar);

router.put('/role/:userId', AdminController.manageUserRoles);

router.post('/upgrade-to-doctor', AdminController.UpgradeToDoctor);

router.post('/approve-doctor/:userId', AdminController.ApproveDoctor);

router.post('/avatar', AdminController.updateAvatar);

module.exports = router;
