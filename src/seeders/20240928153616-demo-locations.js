// seeders/XXXXXX-demo-locations.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Locations',
			[
				{
					name: 'New York',
					type: 'City',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Manhattan',
					type: 'District',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Locations',
			null,
			{}
		);
	},
};
