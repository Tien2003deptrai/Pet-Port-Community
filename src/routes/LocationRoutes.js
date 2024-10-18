const express = require('express');
const { LocationController } = require('@controllers');
const { LocationValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(LocationValidation.create), LocationController.create);

router.get('/', LocationController.getAll);

router.get('/:id', validate(LocationValidation.getById), LocationController.getById);

router.put('/:id', validate(LocationValidation.update), LocationController.update);

router.delete('/:id', validate(LocationValidation.delete), LocationController.delete);

router.get('/type/:type', validate(LocationValidation.getByType), LocationController.getByType);

module.exports = router;
