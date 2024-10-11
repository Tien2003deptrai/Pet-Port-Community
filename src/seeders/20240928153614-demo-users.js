'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'john_doe',
          password: await bcrypt.hash('password123', 10), // Hash the password
          email: 'john@example.com',
          phone: '1234567890',
          role: 'PetOwner',
          full_name: 'John Doe',
          date_of_birth: '1990-01-01',
          address: '123 Main St, Anytown',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'jane_smith',
          password: await bcrypt.hash('password456', 10),
          email: 'jane@example.com',
          phone: '0987654321',
          role: 'Doctor',
          full_name: 'Jane Smith',
          date_of_birth: '1985-05-15',
          address: '456 Elm St, Othertown',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
