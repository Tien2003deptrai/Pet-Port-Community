const {
  Order,
  OrderItem,
  Product,
  Service,
  OrderService,
} = require('@models');

const OrderController = {
  async createOrderProduct(req, res) {
    const { petOwner_id, items } = req.body;

    try {
      const totalAmount = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const order = await Order.create({
        petOwner_id: petOwner_id,
        total_amount: totalAmount,
        status: 'Pending',
      });

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      await OrderItem.bulkCreate(orderItems);

      res.status(201).send({
        orderId: order.id,
        totalAmount,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send({ error: error.message });
    }
  },

  async createOrderService(req, res) {
    const { petOwner_id, items } = req.body;

    try {
      const totalAmount = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const order = await Order.create({
        petOwner_id: petOwner_id,
        total_amount: totalAmount,
        status: 'Pending',
      });

      const orderServices = items.map((item) => ({
        order_id: order.id,
        service_id: item.serviceId,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      await OrderService.bulkCreate(orderServices);

      res.status(201).send({
        orderId: order.id,
        totalAmount,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['name', 'price'],
              },
            ],
          },
          {
            model: OrderService,
            include: [
              {
                model: Service,
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['name', 'price'],
              },
            ],
          },
          {
            model: OrderService,
            include: [
              {
                model: Service,
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const [updated] = await Order.update({ status }, { where: { id } });
      if (!updated) return res.status(404).json({ message: 'Order not found' });
      const updatedOrder = await Order.findByPk(id);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Order.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Order not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getTotalOrders(req, res) {
    try {
      const totalOrders = await Order.count();
      res.status(200).json({
        totalOrders: totalOrders,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getOrdersByPetOwner(req, res) {
    const { petOwner_id } = req.params;
    try {
      const orders = await Order.findAll({
        where: { petOwner_id: petOwner_id },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['name', 'price'],
              },
            ],
          },
          {
            model: OrderService,
            include: [
              {
                model: Service,
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getOrderDetails(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['name', 'price'],
              },
            ],
          },
          {
            model: OrderService,
            include: [
              {
                model: Service,
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });

      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getOrdersByStatus(req, res) {
    const { status } = req.params;
    try {
      const orders = await Order.findAll({
        where: { status },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['name', 'price'],
              },
            ],
          },
          {
            model: OrderService,
            include: [
              {
                model: Service,
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async calculateTotalRevenue(req, res) {
    try {
      const totalRevenue = await Order.sum('total_amount');
      res.json({ totalRevenue });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = OrderController;
