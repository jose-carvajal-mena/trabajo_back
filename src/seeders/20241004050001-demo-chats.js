'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chats', [ // Asegúrate de que 'chats' está en minúsculas
      {
        username1: 'user1',
        username2: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username1: 'user3',
        username2: 'user4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username1: 'user5',
        username2: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chats', null, {});
  }
};
