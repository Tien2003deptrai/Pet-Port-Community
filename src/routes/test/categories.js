const express = require('express');
const router = express.Router();
const CategoriesController = require('../../controllers/test/CategoriesController');

router.get(
	'/product-count',
	CategoriesController.getCategoriesWithProductCount
);

module.exports = router;
