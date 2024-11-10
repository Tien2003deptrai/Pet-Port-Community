const express = require('express');
const { authenticateJWT } = require('../middlewares');
const router = express.Router();

// test
router.use('/blogs', require('./test/blog'));
// router.use('/posts', require('./test/post'))
router.use('/categories', require('./test/categories'));

// api routes
router.use('/auth', require('./UserRoutes'));
router.use('/orders', require('./OrderRoutes'));
router.use('/payments', require('./PaymentRoutes'));
router.use('/categories', require('./CategoryRoutes'));
router.use('/pets', require('./PetRoutes'));
router.use('/products', require('./ProductRoutes'));
router.use('/appointments', require('./AppointmentRoutes'));
router.use('/posts', require('./PostRoutes'));
router.use('/comments', require('./CommentRoutes'));
router.use('/reviews', require('./ReviewRoutes'));
router.use('/coupons', require('./CouponRoutes'));
router.use('/admin', require('./AdminRoutes'));

// test report
router.use('/reports', authenticateJWT, require('./ReportRoutes'));

module.exports = router;
