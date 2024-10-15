const express = require('express');
const { OrderController } = require('@controllers');
const { OrderValidation } = require('@validations');
const router = express.Router();

router.get('/', OrderController.getAll);

router.post('/products', OrderValidation.createOrderProduct, OrderController.createOrderProduct);

router.post('/services', OrderValidation.createOrderService, OrderController.createOrderProduct);

router.get('/total-orders', OrderController.getTotalOrders);

router.get('/total-revenue', OrderController.calculateTotalRevenue);

router.get('/:id', OrderController.getById);

router.put('/:id', OrderController.update);

router.delete('/:id', OrderController.delete);

router.get('/pet_owner/:petOwner_id', OrderController.getOrdersByPetOwner);

router.get('/details/:id', OrderController.getOrderDetails);

router.get('/status/:status', OrderController.getOrdersByStatus);

module.exports = router;
