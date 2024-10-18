const express = require('express');
const { OrderController } = require('@controllers');
const { OrderValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.get('/', OrderController.getAll);

router.post('/products', validate(OrderValidation.createOrderProduct), OrderController.createOrderProduct);

router.post('/services', validate(OrderValidation.createOrderService), OrderController.createOrderService);

router.get('/total-orders', OrderController.getTotalOrders);

router.get('/total-revenue', OrderController.calculateTotalRevenue);

router.get('/:id', validate(OrderValidation.getById), OrderController.getById);

router.put('/:id', validate(OrderValidation.update), OrderController.update);

router.delete('/:id', validate(OrderValidation.delete), OrderController.delete);

router.get('/pet_owner/:petOwner_id', validate(OrderValidation.getOrdersByCustomer), OrderController.getOrdersByPetOwner);

router.get('/details/:id', validate(OrderValidation.getById), OrderController.getOrderDetails);

router.get('/status/:status', validate(OrderValidation.getOrdersByStatus), OrderController.getOrdersByStatus);

module.exports = router;
