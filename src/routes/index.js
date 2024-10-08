const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middlewares');
const router = express.Router();

// test
router.use('/blogs', require('./test/blog'));
// router.use('/posts', require('./test/post'))
router.use('/categories', require('./test/categories'));

// api routes
router.use('/auth', require('./UserRoutes'));
router.use('/orders', authenticateJWT, require('./OrderRoutes'));
router.use('/payments', authenticateJWT, require('./PaymentRoutes'));
router.use('/locations', authenticateJWT, require('./LocationRoutes'));
router.use('/categories', authenticateJWT, require('./CategoryRoutes'));
router.use('/pets', authenticateJWT, require('./PetRoutes'));
router.use('/products', authenticateJWT, authorizeRole(['PetOwner']), require('./ProductRoutes'));
router.use('/services', authenticateJWT, require('./ServiceRoutes'));
router.use('/appointments', authenticateJWT, require('./AppointmentRoutes'));
router.use('/posts', authenticateJWT, require('./PostRoutes'));
router.use('/comments', authenticateJWT, require('./CommentRoutes'));
router.use('/likes', authenticateJWT, require('./LikeRoutes'));
router.use('/reviews', authenticateJWT, require('./ReviewRoutes'));
router.use('/coupons', authenticateJWT, require('./CouponRoutes'));
router.use('/wishlists', authenticateJWT, require('./WishlistRoutes'));

// test report
router.use('/reports', require('./ReportRoutes'));

module.exports = router;
