'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Payments',
      [
        {
          order_id: 1, // Assuming order with ID 1
          amount: 50.0,
          payment_method: 'Credit Card',
          status: 'Completed',
          transaction_id: 'TRANS12345',
          payment_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  },
};
