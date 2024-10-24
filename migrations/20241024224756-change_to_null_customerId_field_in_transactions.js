'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Transactions', 'customerId', {
      type: Sequelize.UUID,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.changeColumn('Transactions', 'customerId', {
      type: Sequelize.UUID,
      allowNull: false
    });
  }
};