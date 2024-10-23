'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Drawings', 'lottery', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.removeColumn('Raffles', 'lottery');
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.removeColumn('Drawings', 'lottery');

    await queryInterface.addColumn('Raffles', 'lottery', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
