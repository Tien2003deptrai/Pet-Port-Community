const express = require('express');
const { CategoryController } = require('../controllers');
const CategoryValidation = require('../validations/CategoryValidation');
const router = express.Router();

router.post('/', CategoryValidation.create, CategoryController.create);

router.get('/', CategoryController.getAll);

router.get('/:id', CategoryController.getById);

router.put('/:id', CategoryController.update);

router.delete('/:id', CategoryController.delete);

router.get('/type/:type', CategoryController.getByType);

module.exports = router;
