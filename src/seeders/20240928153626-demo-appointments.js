// seeders/XXXXXX-demo-appointments.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Appointments',
      [
        {
          pet_owner_id: 1, // Assuming pet owner with ID 1
          pet_id: 1, // Assuming pet with ID 1
          doctor_id: 2, // Assuming doctor with ID 2
          service_id: 1, // Assuming service with ID 1
          appointment_date: new Date(),
          status: 'Scheduled',
          notes: 'First check-up',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Appointments', null, {});
  },
};
