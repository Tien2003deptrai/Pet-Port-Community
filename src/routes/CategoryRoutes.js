const express = require('express');
const { CategoryController } = require('@controllers');
const { CategoryValidation } = require('@validations');
const router = express.Router();

router.post('/', CategoryValidation.create, CategoryController.create);

router.get('/', CategoryValidation.update, CategoryController.getAll);

router.get('/:id', CategoryValidation.getById, CategoryController.getById);

router.put('/:id', CategoryValidation.update, CategoryController.update);

router.delete('/:id', CategoryValidation.delete, CategoryController.delete);

router.get(
  '/type/:type',
  CategoryValidation.getByType,
  CategoryController.getByType,
);

module.exports = router;
