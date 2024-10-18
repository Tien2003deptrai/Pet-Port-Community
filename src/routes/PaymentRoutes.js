const express = require('express');
const { PaymentController } = require('@controllers');
const { PaymentValidation } = require('@validations');
const { validate } = require('@middlewares');

const router = express.Router();

router.post('/', validate(PaymentValidation.create), PaymentController.createPayment);

router.post('/payment-status', validate(PaymentValidation.updatePaymentStatus), PaymentController.updatePaymentStatus);

router.get('/', PaymentController.getAll);

router.get('/:id', validate(PaymentValidation.getById), PaymentController.getById);

router.delete('/:id', validate(PaymentValidation.delete), PaymentController.delete);

router.get('/total', PaymentController.getTotalPayments);

router.get('/order/:orderId', validate(PaymentValidation.getPaymentsByOrderId), PaymentController.getPaymentsByOrderId);

router.get('/status/:status', validate(PaymentValidation.getPaymentsByStatus), PaymentController.getPaymentsByStatus);

router.get('/date-range/:startDate/:endDate', validate(PaymentValidation.getPaymentsInDateRange), PaymentController.getPaymentsInDateRange);

router.post('/webhook', PaymentController.handleWebhook);

module.exports = router;
