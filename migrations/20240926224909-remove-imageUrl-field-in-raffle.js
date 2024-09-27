'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Raffles', 'imageUrl');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Raffles', 'imageUrl');
  }
};