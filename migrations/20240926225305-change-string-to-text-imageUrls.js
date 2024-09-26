'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Raffles', 'imagesUrls', {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Raffles', 'imagesUrls', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    });
  }
};
