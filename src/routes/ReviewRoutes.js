const express = require('express');
const { ReviewController } = require('@controllers');
const { ReviewValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(ReviewValidation.create), ReviewController.create);

router.get('/', ReviewController.getAll);

router.get('/average-rating', ReviewController.getAverageRating);

router.get(
  '/product/:product_id',
  validate(ReviewValidation.getById),
  ReviewController.getReviewsByProduct
);

router.get(
  '/pet_owner/:reviewer_id',
  validate(ReviewValidation.getById),
  ReviewController.getReviewsByPetOwner
);

router.get('/best-worst', ReviewController.getBestAndWorstReview);

router.put('/verify/:id', validate(ReviewValidation.verifyReview), ReviewController.verifyReview);

router.get('/count', ReviewController.countReviews);

router.get('/:id', validate(ReviewValidation.getById), ReviewController.getById);

router.put('/:id', validate(ReviewValidation.update), ReviewController.update);

router.delete('/:id', validate(ReviewValidation.delete), ReviewController.delete);

module.exports = router;
