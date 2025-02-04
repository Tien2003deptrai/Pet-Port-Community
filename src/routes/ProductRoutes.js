const express = require('express');
const { ProductController } = require('@controllers');
const { ProductValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(ProductValidation.create), ProductController.create);

router.get('/', ProductController.getPaginatedAndSelectedProducts);

router.get('/panigated', ProductController.getPaginatedProducts);

router.get('/all', ProductController.getAll);

router.get('/search', ProductController.search);

router.get('/active', ProductController.getActiveProducts);

router.get('/sorted', ProductController.getSortedProducts);

router.get('/with-seller', ProductController.getProductsWithSeller);

router.get('/with-category', ProductController.getProductsWithCategory);

router.get('/with-reviews', ProductController.getProductsWithReviews);

router.get(
  '/filter',
  validate(ProductValidation.getById),
  validate(ProductValidation.filterProducts),
  ProductController.filterProducts
);

router.get(
  '/top-rating',
  validate(ProductValidation.delete),
  ProductController.getTopRatedProducts
);

router.get('/:id', ProductController.getProductById);

module.exports = router;
