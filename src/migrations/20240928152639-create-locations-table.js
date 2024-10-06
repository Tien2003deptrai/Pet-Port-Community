// migrations/XXXXXX-create-locations-table.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Locations', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			type: {
				type: Sequelize.ENUM(
					'City',
					'District',
					'Commune'
				),
				allowNull: false,
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
		await queryInterface.dropTable('Locations');
	},
};
