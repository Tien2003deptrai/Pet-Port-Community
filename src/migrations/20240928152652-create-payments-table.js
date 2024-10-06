// migrations/XXXXXX-create-payments-table.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Payments', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Orders',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			payment_method: {
				type: Sequelize.ENUM(
					'Credit Card',
					'PayPal',
					'Bank Transfer',
					'Cash on Delivery'
				),
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM(
					'Pending',
					'Completed',
					'Failed',
					'Refunded'
				),
				defaultValue: 'Pending',
			},
			transaction_id: {
				type: Sequelize.STRING(100),
			},
			payment_date: {
				type: Sequelize.DATE,
			},
			createdAt: {
				type: Sequelize.TIMESTAMP,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updatedAt: {
				type: Sequelize.TIMESTAMP,
				defaultValue: Sequelize.literal('NOW()'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Payments');
	},
};
