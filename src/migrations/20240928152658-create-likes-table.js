// migrations/XXXXXX-create-likes-table.js
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Likes', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			post_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			comment_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Comments',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('Likes');
	},
};
