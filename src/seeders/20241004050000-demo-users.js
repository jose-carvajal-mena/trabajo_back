'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      { username: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user2', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user3', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user4', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user5', createdAt: new Date(), updatedAt: new Date() },
    ];

    for (const user of users) {
      const existingUser = await queryInterface.rawSelect('users', {
        where: { username: user.username }
      }, ['username']);
      
      if (!existingUser) {
        await queryInterface.bulkInsert('users', [user], {});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
