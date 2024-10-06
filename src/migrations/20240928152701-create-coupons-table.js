'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Coupons', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			code: {
				type: Sequelize.STRING(50),
				unique: true,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			discount_type: {
				type: Sequelize.ENUM(
					'Percentage',
					'Fixed Amount'
				),
				allowNull: false,
			},
			discount_value: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			start_date: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			end_date: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Products',
					key: 'id',
				},
				onDelete: 'SET NULL',
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
		await queryInterface.dropTable('Coupons');
	},
};
