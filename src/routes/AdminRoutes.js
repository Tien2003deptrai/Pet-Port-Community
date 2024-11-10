const express = require('express');
const { AdminController } = require('@controllers');
const router = express.Router();

router.post('/avatar', AdminController.updateAvatar);

router.post('/upgrade-to-doctor', AdminController.UpgradeToDoctor);

router.post('/approve-doctor/:userId', AdminController.ApproveDoctor);

router.post('/upgrade-to-seller', AdminController.UpgradeToSeller);

router.post('/approve-seller/:userId', AdminController.ApproveSeller);

router.post('/avatar', AdminController.updateAvatar);

module.exports = router;
