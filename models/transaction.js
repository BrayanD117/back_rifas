'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Transaction.belongsTo(models.Raffle, { foreignKey: 'raffleId' });
      Transaction.belongsTo(models.TransactionStatus, { foreignKey: 'transactionStatusId' });

      Transaction.hasMany(models.SelectedNumber, { foreignKey: 'transactionId' });

      Transaction.hasOne(models.Sale, { foreignKey: 'transactionId' });
    }
  }
  Transaction.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    raffleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionStatusId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    purchasePlace: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};