const { Payment, Order, OrderItem, Product, Op } = require('@models');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const PaymentController = {
  async createPayment(req, res) {
    const { orderId } = req.body;
    const successUrl = `${process.env.BASE_URL}/shop`;
    const cancelUrl = `${process.env.BASE_URL}/cancel`;

    if (!/^https?:\/\//.test(successUrl) || !/^https?:\/\//.test(cancelUrl)) {
      return res.status(500).json({ error: 'Invalid BASE_URL configuration.' });
    }

    try {
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: OrderItem,
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name'],
              },
            ],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: order.OrderItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.Product.name },
            unit_amount: Math.round(item.unit_price * 100),
          },
          quantity: item.quantity,
        })),
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      await Payment.create({
        order_id: orderId,
        amount: order.total_amount,
        payment_method: 'Credit Card',
        status: 'Pending',
        transaction_id: session.id,
        payment_date: new Date(),
      });

      res.status(200).json({ success: true, id: session.id, url: session.url });
    } catch (error) {
      console.error('Error creating payment session:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async updatePaymentStatus(req, res) {
    const { paymentIntentId, status, orderId } = req.body;
    try {
      const paymentUpdated = await Payment.update(
        { status },
        { where: { transaction_id: paymentIntentId } }
      );

      if (!paymentUpdated[0]) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      await Order.update({ status: 'Completed' }, { where: { id: orderId } });

      res.status(200).json({ success: true, message: 'Payment and order status updated' });
    } catch (error) {
      console.error('Error updating payment or order status:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const payments = await Payment.findAll();
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Payment.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async getTotalPayments(req, res) {
    try {
      const totalPayments = await Payment.sum('amount');
      res.status(200).json({ success: true, data: totalPayments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async getPaymentsByOrderId(req, res) {
    const { orderId } = req.params;
    try {
      const payments = await Payment.findAll({ where: { order_id: orderId } });
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async getPaymentsByStatus(req, res) {
    const { status } = req.params;
    try {
      const payments = await Payment.findAll({ where: { status } });
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  async handleWebhook(req, res) {
    const event = req.body;
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          await Payment.update(
            { status: 'Completed' },
            { where: { transaction_id: paymentIntent.id } }
          );
          break;
        case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object;
          await Payment.update(
            { status: 'Failed' },
            { where: { transaction_id: failedPaymentIntent.id } }
          );
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      res.status(200).send({ received: true });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async getPaymentsInDateRange(req, res) {
    const { startDate, endDate } = req.params;
    try {
      const payments = await Payment.findAll({
        where: {
          payment_date: { [Op.between]: [new Date(startDate), new Date(endDate)] },
        },
      });
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
};

module.exports = PaymentController;
