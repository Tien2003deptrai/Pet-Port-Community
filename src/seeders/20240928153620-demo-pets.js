// seeders/XXXXXX-demo-pets.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Pets',
      [
        {
          owner_id: 1, // Assuming owner with ID 1
          category_id: 1, // Assuming Dog category ID 1
          name: 'Buddy',
          breed: 'Golden Retriever',
          age: 5,
          gender: 'Male',
          description: 'Friendly and energetic',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pets', null, {});
  },
};
