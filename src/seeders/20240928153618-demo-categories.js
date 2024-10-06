// seeders/XXXXXX-demo-categories.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'Dog',
					type: 'Pet',
					is_active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Cat',
					type: 'Pet',
					is_active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Categories',
			null,
			{}
		);
	},
};
