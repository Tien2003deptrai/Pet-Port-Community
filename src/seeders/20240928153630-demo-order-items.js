'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'OrderItems',
      [
        {
          order_id: 1, // Assuming order with ID 1
          product_id: 1, // Assuming product with ID 1
          quantity: 2,
          unit_price: 25.99,
          subtotal: 51.98,
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};
