const express = require('express');
const router = express.Router();

// test
router.use('/blogs', require('./test/blog'));
// router.use('/posts', require('./test/post'))
router.use('/categories', require('./test/categories'));

// api routes
router.use('/auth', require('./UserRoutes'));
router.use('/orders', require('./OrderRoutes'));
router.use('/payments', require('./PaymentRoutes'));
router.use('/locations', require('./LocationRoutes'));
router.use('/categories', require('./CategoryRoutes'));
router.use('/pets', require('./PetRoutes'));
router.use('/products', require('./ProductRoutes'));
router.use('/services', require('./ServiceRoutes'));
router.use('/appointments', require('./AppointmentRoutes'));
router.use('/posts', require('./PostRoutes'));
router.use('/comments', require('./CommentRoutes'));
router.use('/likes', require('./LikeRoutes'));
router.use('/reviews', require('./ReviewRoutes'));
router.use('/coupons', require('./CouponRoutes'));
router.use('/wishlists', require('./WishlistRoutes'));

// test report
router.use('/reports', require('./ReportRoutes'));

module.exports = router;
