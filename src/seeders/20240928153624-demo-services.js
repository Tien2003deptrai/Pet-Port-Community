'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          doctor_id: 2, // Assuming doctor with ID 2
          category_id: 1, // Assuming Dog category ID 1
          name: 'Dog Grooming',
          description: 'Professional grooming services for dogs.',
          price: 50.0,
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
