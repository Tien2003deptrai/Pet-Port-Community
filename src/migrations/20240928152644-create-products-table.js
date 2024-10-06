// migrations/XXXXXX-create-products-table.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			sales_center_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			category_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Categories',
					key: 'id',
				},
				onDelete: 'SET NULL',
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			stock_quantity: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			sku: {
				type: Sequelize.STRING(50),
				unique: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			images: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable('Products');
	},
};
