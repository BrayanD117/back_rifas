'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Raffles', 'authorizationResolution', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '1234'
    });

    await queryInterface.addColumn('Raffles', 'salesPercentage', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Raffles', 'authorizationResolution');
    await queryInterface.removeColumn('Raffles', 'salesPercentage');
  }
};