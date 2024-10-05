'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        chatId: 1, // Asegúrate de que este ID corresponda con un chat existente
        username: 'user1',
        content: 'Hello User 2!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 1,
        username: 'user2',
        content: 'Hi User 1!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        chatId: 2,
        username: 'user3',
        content: 'Hey User 4!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Agrega más mensajes según sea necesario
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
