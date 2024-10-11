const express = require('express');
const { LocationController } = require('@controllers');
const { LocationValidation } = require('@validations');
const router = express.Router();

router.post('/', LocationValidation.create, LocationController.create);

router.get('/', LocationController.getAll);

router.get('/:id', LocationController.getById);

router.put('/:id', LocationController.update);

router.delete('/:id', LocationController.delete);

router.get('/type/:type', LocationController.getByType);

module.exports = router;
