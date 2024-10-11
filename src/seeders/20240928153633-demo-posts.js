'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          user_id: 1, // Assuming user with ID 1
          title: 'My First Pet',
          content: 'I just adopted a puppy!',
          image_url: 'http://example.com/image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
