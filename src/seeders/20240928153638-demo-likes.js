// seeders/XXXXXX-demo-likes.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Likes',
      [
        {
          user_id: 1, // Assuming user with ID 1
          post_id: 1, // Assuming post with ID 1
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
