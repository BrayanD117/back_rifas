'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Raffles', 'imagesUrls', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Raffles', 'imagesUrls');
  }
};