const { Order, OrderItem, Product, Service, OrderService, sequelize } = require('@models');

const OrderController = {
  async createOrderProduct(req, res) {
    const { petOwner_id, items } = req.body;

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const transaction = await sequelize.transaction();
    try {
      const order = await Order.create(
        {
          petOwner_id,
          total_amount: totalAmount,
          status: 'Pending',
        },
        { transaction }
      );

      // Chuẩn bị dữ liệu cho các mục đơn hàng
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      }));

      // Tạo các mục đơn hàng trong cơ sở dữ liệu
      await OrderItem.bulkCreate(orderItems, { transaction });

      // Xác nhận transaction
      await transaction.commit();
      res.status(201).json({ success: true, orderId: order.id, totalAmount });
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating order:', error);
      res.status(500).send({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const orders = await Order.findAndCountAll({
        include: [
          {
            model: OrderItem,
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
        limit,
        offset,
      });

      const totalPages = Math.ceil(orders.count / limit);

      res.status(200).json({
        success: true,
        data: orders.rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: orders.count,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: error.message,
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
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(201).json({ success: true, data: order });
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
      res.status(201).json({ success: true, data: updatedOrder });
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
      res.status(201).json({ success: true, message: 'Delete successfully' });
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
        success: true,
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
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      res.status(200).json({ success: true, data: orders });
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
      res.status(200).json({ success: true, data: order });
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
            as: 'OrderItems',
            include: [
              {
                model: Product,
                as: 'Product',
                attributes: ['name', 'price'],
              },
            ],
          },
        ],
      });
      res.status(200).json({ success: true, data: orders });
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
      res.status(200).json({ success: true, data: totalRevenue });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = OrderController;
