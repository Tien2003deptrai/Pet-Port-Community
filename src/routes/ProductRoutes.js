const express = require('express');
const { ProductController } = require('../controllers');
const ProductValidation = require('../validations/ProductValidation');
const router = express.Router();

router.post('/', ProductValidation.create, ProductController.create);

router.get('/', ProductController.getPaginatedAndSelectedProducts);

router.get('/all', ProductController.getAll);

router.get('/search', ProductController.search);

router.get('/active', ProductController.getActiveProducts);

router.get('/sorted', ProductController.getSortedProducts);

router.get('/with-seller', ProductController.getProductsWithSeller);

router.get('/with-category', ProductController.getProductsWithCategory);

router.get('/with-reviews', ProductController.getProductsWithReviews);

router.get('/filter', ProductController.filterProducts);

router.get('/:id', ProductController.getProductById);

module.exports = router;
