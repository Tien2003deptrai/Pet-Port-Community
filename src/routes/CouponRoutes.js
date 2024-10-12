const express = require('express');
const { CouponController } = require('@controllers');
const { CouponValidation } = require('@validations');
const router = express.Router();

router.post('/', CouponValidation.create, CouponController.create);

router.get('/', CouponController.getAll);

router.get('/active', CouponController.getActiveCoupons);

router.get('/:id', CouponController.getById);

router.put('/:id', CouponController.update);

router.delete('/:id', CouponController.delete);

router.get('/check/:code', CouponController.checkCoupon);

router.get(
  '/discount-type/:discount_type',
  CouponController.getCouponsByDiscountType,
);

module.exports = router;
