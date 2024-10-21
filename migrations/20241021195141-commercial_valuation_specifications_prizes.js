'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Prizes', 'commercialValuation', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.renameColumn('Prizes', 'description', 'specifications');

    await queryInterface.changeColumn('Prizes', 'specifications', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('Prizes', 'name', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.removeColumn('Raffles', 'prize');
    await queryInterface.removeColumn('Raffles', 'prizeCommercialValuation');
    await queryInterface.removeColumn('Raffles', 'prizeSpecifications');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Prizes', 'specifications', 'description');
    
    await queryInterface.changeColumn('Prizes', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Raffles', 'prize');
    await queryInterface.addColumn('Raffles', 'prizeCommercialValuation');
    await queryInterface.addColumn('Raffles', 'prizeSpecifications');
  }
};
