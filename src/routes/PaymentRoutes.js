const express = require('express');
const { PaymentController } = require('../controllers');
const PaymentValidation = require('../validations/paymentValidation');

const router = express.Router();

router.post(
	'/',
	PaymentValidation.create,
	PaymentController.createPayment
);

router.post(
	'/payment-status',
	PaymentController.updatePaymentStatus
);

router.get('/', PaymentController.getAll);

router.get('/:id', PaymentController.getById);

router.delete('/:id', PaymentController.delete);

router.get('/total', PaymentController.getTotalPayments);

router.get(
	'/order/:orderId',
	PaymentController.getPaymentsByOrderId
);

router.get(
	'/status/:status',
	PaymentController.getPaymentsByStatus
);

router.get(
	'/date-range/:startDate/:endDate',
	PaymentController.getPaymentsInDateRange
);

router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;
