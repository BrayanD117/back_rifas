'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Authorities', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('AwardPrizes', 'customerId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('AwardPrizes', 'prizeId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('AwardPrizes', 'deliveryDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    await queryInterface.changeColumn('Categories', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Cities', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Coverages', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'userId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'documentNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'birthday', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Departments', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('DrawTypes', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Drawings', 'raffleId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Drawings', 'drawTypeId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Drawings', 'drawDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('EventTypes', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('NumberStatuses', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Prizes', 'drawingId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Prizes', 'name', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'coverageId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'authorityId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'baseValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'ivaValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'totalValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'numberDigits', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'numberSeries', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'bearerCheck', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });

    await queryInterface.changeColumn('Raffles', 'gameDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'closeDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'expirationDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Raffles', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });

    await queryInterface.changeColumn('Raffles', 'dateTimePublication', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Roles', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Sales', 'transactionId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Sales', 'invoiceNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Sales', 'baseValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('Sales', 'ivaValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('Sales', 'totalValue', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    });

    await queryInterface.changeColumn('TransactionStatuses', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'customerId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'raffleId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'orderNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'transactionStatusId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'purchasePlace', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'reservationDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Transactions', 'purchaseDate', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'roleId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.changeColumn('Authorities', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('AwardPrizes', 'customerId', {
      type: Sequelize.UUID,
      allowNull: true
    });
  }
};