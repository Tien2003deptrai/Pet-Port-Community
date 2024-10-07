// seeders/XXXXXX-demo-products.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          sales_center_id: 2, // Assuming sales center with ID 2
          category_id: 1, // Assuming Dog category ID 1
          name: 'Dog Food',
          description: 'High-quality dog food.',
          price: 25.99,
          stock_quantity: 100,
          sku: 'DOGFOOD123',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
