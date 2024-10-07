'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Raffles', 'commercialValuation', 'prizeCommercialValuation');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Raffles', 'prizeCommercialValuation', 'commercialValuation');
  }
};