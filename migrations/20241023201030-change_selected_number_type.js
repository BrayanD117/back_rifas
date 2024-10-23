'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('SelectedNumbers', 'number', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('SelectedNumbers', 'transactionId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('SelectedNumbers', 'numberStatusId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'NumberStatuses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.changeColumn('SelectedNumbers', 'number', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('SelectedNumbers', 'transactionId', {
      type: Sequelize.UUID,
      allowNull: true
    });

    await queryInterface.changeColumn('SelectedNumbers', 'numberStatusId', {
      type: Sequelize.UUID,
      allowNull: true
    });
  }
};
