'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'transactionStatusId', {
      type: Sequelize.UUID,
      references: {
        model: 'TransactionStatuses', // Nombre de la tabla a la que hace referencia
        key: 'id'
      },
      onUpdate: 'CASCADE',  // Ajusta según tu necesidad
      onDelete: 'SET NULL'  // O CASCADE, según lo que necesites
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'transactionStatusId');
  }
};
