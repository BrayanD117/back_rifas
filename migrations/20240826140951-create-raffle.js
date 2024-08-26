'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Raffles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      coverageId: {
        type: Sequelize.UUID,
        references: {
          model: 'Coverages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      authorityId: {
        type: Sequelize.UUID,
        references: {
          model: 'Authorities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      prize: {
        type: Sequelize.TEXT
      },
      baseValue: {
        type: Sequelize.DECIMAL(12,2)
      },
      ivaValue: {
        type: Sequelize.DECIMAL(12,2)
      },
      totalValue: {
        type: Sequelize.DECIMAL(12,2)
      },
      lottery: {
        type: Sequelize.STRING
      },
      numberDigits: {
        type: Sequelize.INTEGER
      },
      numberSeries: {
        type: Sequelize.INTEGER
      },
      bearerCheck: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      gameDate: {
        type: Sequelize.DATE
      },
      closeDate: {
        type: Sequelize.DATE
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Raffles');
  }
};