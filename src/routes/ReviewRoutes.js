const express = require('express');
const { ReviewController } = require('@controllers');
const { ReviewValidation } = require('@validations');
const router = express.Router();

router.post('/', ReviewValidation.create, ReviewController.create);

router.get('/', ReviewController.getAll);

router.get('/average-rating', ReviewController.getAverageRating);

router.get('/product/:product_id', ReviewController.getReviewsByProduct);

router.get('/pet_owner/:reviewer_id', ReviewController.getReviewsByPetOwner);

router.get('/service/:service_id', ReviewController.getReviewsByService);

router.get('/best-worst', ReviewController.getBestAndWorstReview);

router.put('/verify/:id', ReviewController.verifyReview);

router.get('/count', ReviewController.countReviews);

router.get('/:id', ReviewController.getById);

router.put('/:id', ReviewController.update);

router.delete('/:id', ReviewController.delete);

module.exports = router;
