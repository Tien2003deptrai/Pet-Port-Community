// seeders/XXXXXX-demo-coupons.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Coupons',
			[
				{
					code: 'DOGLOVER',
					description:
						'20% off on all dog products!',
					discount_type: 'Percentage',
					discount_value: 20.0,
					start_date: '2024-09-20',
					end_date: '2024-11-20',
					is_active: true,
					product_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					code: 'CATFAN',
					description:
						'15% off on all cat products!',
					discount_type: 'Percentage',
					discount_value: 15.0,
					start_date: '2024-09-25',
					end_date: '2024-10-25',
					is_active: true,
					product_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Coupons',
			null,
			{}
		);
	},
};
