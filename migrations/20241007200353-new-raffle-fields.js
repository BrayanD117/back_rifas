'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Raffles', 'slogan', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'commercialValuation', {
      type:  Sequelize.DECIMAL(12,2),
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'prizeSpecifications', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'dateTimeSale', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'managerName', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'managerContact', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Raffles', 'managerAddress', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Raffles', 'slogan');
    await queryInterface.removeColumn('Raffles', 'commercialValuation');
    await queryInterface.removeColumn('Raffles', 'prizeSpecifications');
    await queryInterface.removeColumn('Raffles', 'dateTimeSale');
    await queryInterface.removeColumn('Raffles', 'managerName');
    await queryInterface.removeColumn('Raffles', 'managerContact');
    await queryInterface.removeColumn('Raffles', 'managerAddress');
  }
};
