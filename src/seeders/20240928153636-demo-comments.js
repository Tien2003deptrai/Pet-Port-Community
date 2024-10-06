// seeders/XXXXXX-demo-comments.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Comments',
			[
				{
					post_id: 1, // Assuming post with ID 1
					user_id: 2, // Assuming user with ID 2
					content: 'Congrats on your new puppy!',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Comments',
			null,
			{}
		);
	},
};
