'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Wishlists',
      [
        {
          user_id: 1, // Assuming user with ID 1
          product_id: 1, // Assuming product with ID 1
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Wishlists', null, {});
  },
};
