const express = require('express');
const { ServiceController } = require('@controllers');
const { ServiceValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(ServiceValidation.create), ServiceController.create);

router.get('/', ServiceController.getAll);

router.get('/active', ServiceController.getActiveServices);

router.get('/count', ServiceController.countServices);

router.get('/:id', validate(ServiceValidation.getById), ServiceController.getById);

router.put('/:id', validate(ServiceValidation.update), ServiceController.update);

router.delete('/:id', validate(ServiceValidation.delete), ServiceController.delete);

router.get(
  '/doctor/:doctor_id',
  validate(ServiceValidation.getServicesByDoctor),
  ServiceController.getServicesByDoctor
);

router.get(
  '/category/:category_id',
  validate(ServiceValidation.getServicesByCategory),
  ServiceController.getServicesByCategory
);

module.exports = router;
