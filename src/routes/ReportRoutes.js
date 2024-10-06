const express = require('express');
const ReportController = require('../controllers/ReportController');
const router = express.Router();

router.get('/sales', ReportController.getSalesReport);

router.get(
	'/service-usage',
	ReportController.getServiceUsageReport
);

router.get(
	'/reviews',
	ReportController.getReviewStatistics
);

router.get('/users', ReportController.getUserStatistics);

router.get(
	'/products',
	ReportController.getProductStatistics
);

module.exports = router;
