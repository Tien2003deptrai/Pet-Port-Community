const express = require('express');
const { CategoryController } = require('@controllers');
const { CategoryValidation } = require('@validations');
const { validate } = require('@middlewares');
const router = express.Router();

router.post('/', validate(CategoryValidation.create), CategoryController.create);

router.get('/', CategoryController.getAll);

router.get('/:id', validate(CategoryValidation.getById), CategoryController.getById);

router.put('/:id', validate(CategoryValidation.update), CategoryController.update);

router.delete('/:id', validate(CategoryValidation.delete), CategoryController.delete);

router.get('/type/:type', validate(CategoryValidation.getByType), CategoryController.getByType);

module.exports = router;
