const express = require('express');
const { CouponController } = require('@controllers');
const { CouponValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(CouponValidation.create), CouponController.create);

router.get('/', CouponController.getAll);

router.get('/active', CouponController.getActiveCoupons);

router.get('/:id', validate(CouponValidation.getById), CouponController.getById);

router.put('/:id', validate(CouponValidation.update), CouponController.update);

router.delete('/:id', validate(CouponValidation.delete), CouponController.delete);

router.get('/check/:code', validate(CouponValidation.checkCoupon), CouponController.checkCoupon);

router.get(
  '/discount-type/:discount_type',
  validate(CouponValidation.getCouponsByDiscountType),
  CouponController.getCouponsByDiscountType
);

module.exports = router;
