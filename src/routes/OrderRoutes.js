const express = require('express');
const { OrderController } = require('../controllers');
const OrderValidation = require('../validations/orderValidation');
const router = express.Router();

router.post(
	'/',
	OrderValidation.create,
	OrderController.createOrder
);

router.get('/', OrderController.getAll);

router.get('/total-orders', OrderController.getTotalOrders);

router.get(
	'/total-revenue',
	OrderController.calculateTotalRevenue
);

router.get('/:id', OrderController.getById);

router.put('/:id', OrderController.update);

router.delete('/:id', OrderController.delete);

router.get(
	'/customer/:customerId',
	OrderController.getOrdersByCustomer
);

router.get('/details/:id', OrderController.getOrderDetails);

router.get(
	'/status/:status',
	OrderController.getOrdersByStatus
);

module.exports = router;
