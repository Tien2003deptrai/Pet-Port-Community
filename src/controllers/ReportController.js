const {
	Order,
	Product,
	Service,
	Review,
	User,
	sequelize,
} = require('../models');

const ReportController = {
	// Báo cáo doanh thu
	async getSalesReport(req, res) {
		try {
			const salesData = await Order.findAll({
				attributes: [
					[
						sequelize.fn(
							'SUM',
							sequelize.col('total_amount')
						),
						'totalSales',
					],
					[
						sequelize.fn(
							'COUNT',
							sequelize.col('id')
						),
						'totalOrders',
					],
					[
						sequelize.fn(
							'DATE',
							sequelize.col('createdAt')
						),
						'date',
					],
				],
				group: ['date'],
				order: [['date', 'DESC']],
			});
			res.json(salesData);
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},

	// Số lượng dịch vụ đã sử dụng
	async getServiceUsageReport(req, res) {
		try {
			const serviceData = await Service.findAll({
				attributes: [
					'name',
					[
						sequelize.fn(
							'COUNT',
							sequelize.col('id')
						),
						'usageCount',
					],
				],
				group: ['id'],
			});
			res.json(serviceData);
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},

	// Thống kê đánh giá
	async getReviewStatistics(req, res) {
		try {
			const totalReviews = await Review.count();
			const averageRating = await Review.findOne({
				attributes: [
					[
						sequelize.fn(
							'AVG',
							sequelize.col('rating')
						),
						'averageRating',
					],
				],
			});
			res.json({
				totalReviews,
				averageRating:
					averageRating.averageRating || 0,
			});
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},

	// Thống kê người dùng
	async getUserStatistics(req, res) {
		try {
			const totalUsers = await User.count();
			const activeUsers = await User.count({
				where: { is_active: true },
			});
			res.json({
				totalUsers,
				activeUsers,
			});
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},

	// Thống kê sản phẩm
	async getProductStatistics(req, res) {
		try {
			const totalProducts = await Product.count();
			const activeProducts = await Product.count({
				where: { is_active: true },
			});
			const outOfStockProducts = await Product.count({
				where: { stock_quantity: 0 },
			});
			res.json({
				totalProducts,
				activeProducts,
				outOfStockProducts,
			});
		} catch (error) {
			res.status(500).json({
				message: 'Server error',
				error,
			});
		}
	},
};

module.exports = ReportController;
