const express = require('express');
const { ServiceController } = require('@controllers');
const { ServiceValidation } = require('@validations');
const router = express.Router();

router.post('/', ServiceValidation.create, ServiceController.create);

router.get('/', ServiceController.getAll);

router.get('/active', ServiceController.getActiveServices);

router.get('/count', ServiceController.countServices);

router.get('/:id', ServiceController.getById);

router.put('/:id', ServiceController.update);

router.delete('/:id', ServiceController.delete);

router.get('/doctor/:doctor_id', ServiceController.getServicesByDoctor);

router.get('/category/:category_id', ServiceController.getServicesByCategory);

module.exports = router;
