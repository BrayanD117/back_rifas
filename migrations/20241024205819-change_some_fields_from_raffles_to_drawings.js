'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Drawings', 'gameDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('Drawings', 'closeDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('Drawings', 'expirationDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.removeColumn('Raffles', 'gameDate');
    await queryInterface.removeColumn('Raffles', 'closeDate');
    await queryInterface.removeColumn('Raffles', 'expirationDate');
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.removeColumn('Drawings', 'gameDate');
    await queryInterface.removeColumn('Drawings', 'closeDate');
    await queryInterface.removeColumn('Drawings', 'expirationDate');

    await queryInterface.addColumn('Raffles', 'gameDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'closeDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'expirationDate', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
