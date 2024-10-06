// seeders/XXXXXX-demo-reviews.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Reviews',
			[
				{
					reviewer_id: 1, // Assuming reviewer with ID 1
					product_id: 1, // Assuming product with ID 1
					rating: 5,
					title: 'Great product!',
					comment: 'This dog food is amazing!',
					is_verified_purchase: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Reviews',
			null,
			{}
		);
	},
};
