const {
	Order,
	OrderItem,
	Product,
	Service,
	Op,
} = require('../models');

const OrderController = {
	async createOrder(req, res) {
		const { customerId, items } = req.body;

		try {
			// Tính tổng tiền của đơn hàng
			const totalAmount = items.reduce(
				(total, item) =>
					total + item.price * item.quantity,
				0
			);

			// Tạo đơn hàng
			const order = await Order.create({
				customer_id: customerId,
				total_amount: totalAmount,
				status: 'Pending',
			});

			// Tạo danh sách sản phẩm/dịch vụ trong đơn hàng
			const orderItems = items.map((item) => ({
				order_id: order.id,
				product_id: item.productId,
				service_id: item.serviceId,
				quantity: item.quantity,
				unit_price: item.price,
				subtotal: item.price * item.quantity,
			}));

			// Lưu danh sách OrderItems vào DB
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

	async getAll(req, res) {
		try {
			// Lấy tất cả các đơn hàng, kèm theo thông tin sản phẩm/dịch vụ trong đơn hàng
			const orders = await Order.findAll({
				include: [
					{
						model: OrderItem,
						as: 'OrderItems',
						include: [
							{
								model: Product,
								as: 'Product',
								attributes: [
									'name',
									'price',
								],
							},
							{
								model: Service,
								as: 'Service',
								attributes: [
									'name',
									'price',
								],
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
						as: 'OrderItems',
						include: [
							{
								model: Product,
								as: 'Product',
								attributes: [
									'name',
									'price',
								],
							},
							{
								model: Service,
								as: 'Service',
								attributes: [
									'name',
									'price',
								],
							},
						],
					},
				],
			});
			if (!order)
				return res
					.status(404)
					.json({ message: 'Order not found' });
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
			const [updated] = await Order.update(
				{ status },
				{ where: { id } }
			);
			if (!updated)
				return res
					.status(404)
					.json({ message: 'Order not found' });
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
			if (!deleted)
				return res
					.status(404)
					.json({ message: 'Order not found' });
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

	async getOrdersByCustomer(req, res) {
		const { customerId } = req.params;
		try {
			const orders = await Order.findAll({
				where: { customer_id: customerId },
				include: [
					{
						model: OrderItem,
						as: 'OrderItems',
						include: [
							{
								model: Product,
								as: 'Product',
								attributes: [
									'name',
									'price',
								],
							},
							{
								model: Service,
								as: 'Service',
								attributes: [
									'name',
									'price',
								],
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
						as: 'OrderItems',
						include: [
							{
								model: Product,
								as: 'Product',
								attributes: [
									'name',
									'price',
								],
							},
							{
								model: Service,
								as: 'Service',
								attributes: [
									'name',
									'price',
								],
							},
						],
					},
				],
			});

			if (!order)
				return res
					.status(404)
					.json({ message: 'Order not found' });
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
						as: 'OrderItems',
						include: [
							{
								model: Product,
								as: 'Product',
								attributes: [
									'name',
									'price',
								],
							},
							{
								model: Service,
								as: 'Service',
								attributes: [
									'name',
									'price',
								],
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
			const totalRevenue =
				await Order.sum('total_amount');
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
